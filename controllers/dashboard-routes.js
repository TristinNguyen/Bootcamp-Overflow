const router = require("express").Router();
const sequelize = require("../config/connection");
// this requires user to be logged in
const withAuth = require("../utils/auth");
const { Post, User, Comment } = require("../models");

//this GETS dashboard page
router.get("/", withAuth, (req, res) => {
  Post.findAll({
    where: {
      // now only show posts on user dashboard that have been created by the user
      // and use the ID from the session
      user_id: req.session.user_id,
    },
    attributes: [
      "id",
      "question",
      "title",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE question.id = vote.question)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "answer_text", "question", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((data) => {
      // serialize data before passing to template
      const posts = data.map((post) => post.get({ plain: true }));
      res.render("dashboard", { posts, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
  Post.findByPk(req.params.id, {
    attributes: [
      "id",
      "question",
      "title",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE question.id = vote.question)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "answer_text", "question", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((data) => {
      if (data) {
        const post = data.get({ plain: true });

        res.render("edit-question", {
          post,
          loggedIn: true,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
