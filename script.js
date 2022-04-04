const body = document.body;
const container = document.querySelector(".container");
const headerQuestion = document.querySelector(".question");

fetch("https://opentdb.com/api.php?amount=10&category=18&type=multiple")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    let question = data.results[0].question;
    let res = data.results;

    // replace bad encoding with quotation marks.
    for (let i = 0; i < question.length; i++) {
      question = question.replace("&quot;", "'");
      question = question.replace("&#039;", "'");
    }

    headerQuestion.innerText = question;

    //push the correct answer to incorrect answer array for easier manipulation.
    let answersOne = res[0].incorrect_answers;
    answersOne.push(res[0].correct_answer);

    //loop over the answers and display them in the container
    for (let i = 0; i < 4; i++) {
      let answers = answersOne[i];
      container.innerHTML += `<div class="button"> ${answers} </div>`;
    }

    //check if button thats clicked is the correct answer.
    const button = document.querySelectorAll(".button");
    for (let i = 0; i < button.length; i++) {
      button[i].addEventListener("click", () => {
        let rightAnswer = res[0].correct_answer;

        for (let j = 0; j < question.length; j++) {
          rightAnswer = rightAnswer.replace("&quot;", "'");
          rightAnswer = rightAnswer.replace("&#039;", "'");
        }

        button[i].innerText === rightAnswer
          ? (button[i].style.backgroundColor = "green")
          : (button[i].style.backgroundColor = "red");
      });
    }
  });
