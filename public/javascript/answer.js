const session = require("express-session");

async function answerFormHandler(event) {
    console.log('fetch: POST to the dashboard/answer route')
    event.preventDefault();

    const user_id = session.user_id;

    const answer_text = document.querySelector('textarea[name="answer-body"]').value.trim();

    const question_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    if (answer_text) {
        const response = await fetch('/dashboard/answers', {
            method: 'POST',
            body: JSON.stringify({
                answer_text,
                question_id,
                user_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.add-answer').addEventListener('submit', answerFormHandler);

// document.querySelector('.add-answer').addEventListener('submit', answerFormHandler);
// document.querySelector('.answer-form').addEventListener('submit', answerFormHandler);