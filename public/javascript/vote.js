async function upVoteHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/') [
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch('/api/questions/vote????', {
        method: 'PUT',
        body: JSON.stringify({
            question_id: id
        }),
        headers: {}
    });

    if(response.ok) {
        document.location.reload();
    }
    else {
        alert(response.statusText);
    }
}

async function downVoteHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/') [
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch('/api/questions/vote???', {
        method: 'PUT',
        body: JSON.stringify({
            question_id: id
        }),
        headers: {}
    });

    if(response.ok) {
        document.location.reload();
    }
    else {
        alert(response.statusText);
    }
}

// document.querySelector('#up-vote-btn').addEventListener('click', upVoteHandler);
// document.querySelector('#down-vote-btn').addEventListener('click', downVoteHandler); 