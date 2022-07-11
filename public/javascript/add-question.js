var modal = document.getElementById("newquestion-popout");
var btn = document.getElementById("newquestion");
var cancel = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

cancel.onclick = function() {
  modal.style.display = "none";
}

async function newQuestionHandler(event) {
    event.preventDefault();

   const title = document.querySelector('input[name="question-title"]').value;
   const question_content = document.querySelector('input[name="question-content"]').value;

    const response = await fetch('/api/questions', {
        method: 'POST',
        body: JSON.stringify({
            title,
            question_content,
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    if(response.ok) {
       document.location.replace('/dashboard');
    }
    else {
        alert(response.statusText);
    }
}

document.querySelector('.newquestion').addEventListener('click', btn.onclick);
document.querySelector('.new-question-form').addEventListener('submit', newQuestionHandler);