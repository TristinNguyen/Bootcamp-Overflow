async function commentFormHandler(event) {
    event.preventDefault();

    const comment_text = document.querySelector('textarea[name="answer-body"]').value.trim();

    const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    if(comment_text) {
        const response = await fetch('/api/answers', {
            method: 'POST',
            body: JSON.stringify({
                comment_text,
                post_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(response.ok) {
            document.location.reload();
        }
        else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.answer-form').addEventListener('submit', commentFormHandler);