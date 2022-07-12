async function upVoteHandler(event) {
    // console.log('upVote button clicked');
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch('/dashboard/vote', {
        method: 'PUT',
        body: JSON.stringify({
            question_id: id
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

async function downVoteHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch('/api/questions/vote???', {
        method: 'PUT',
        body: JSON.stringify({
            question_id: id
        }),
        headers: {}
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#upvote-btn').addEventListener('click', upVoteHandler);
// document.querySelector('#down-vote-btn').addEventListener('click', downVoteHandler);