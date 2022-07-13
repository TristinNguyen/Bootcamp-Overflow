async function upVoteHandler(event) {
    // console.log('upVote button clicked');
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch('/dashboard/questions/:id/vote', {
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
        // alert(response.statusText);
        alert(response.status+'\nOnly one vote per person allowed!');
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

document.querySelector('.upvote-btn').addEventListener('click', upVoteHandler);
