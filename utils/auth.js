// we create an authguard for routes
const withAuth = (req, res, next) => {
    // also if there no session exists
    if (!req.session.user_id) {
        // this will then direct user to login
        res.redirect('/login');
    } else {
        // or else call next middleware function
        next();
    }
};

module.exports = withAuth;