const body = document.body;
const container = document.querySelector(".container");
const headerQuestion = document.querySelector(".question");
let currentQuestion = 0;
const answersDiv = document.querySelector(".answers");
const startButton = document.querySelector(".start-button");
const restartButton = document.querySelector(".restart-button");
const intro = document.querySelector(".intro");

const startQuiz = function () {
  const container = document.querySelector(".container");
  const headerQuestion = document.querySelector(".question");
  let currentQuestion = 0;
  const answersDiv = document.querySelector(".answers");
  fetch("https://opentdb.com/api.php?amount=10&category=18&type=multiple")
    .then((response) => response.json())
    .then((data) => {
      // function to replace bad encoding with quotation marks.
      let question = data.results[currentQuestion].question;
      let res = data.results;

      const setQuestion = function (currentQuestion) {
        let question = data.results[currentQuestion].question;

        for (let i = 0; i < question.length; i++) {
          question = question.replace("&quot;", "'");
          question = question.replace("&#039;", "'");
          question = question.replace("&lt;", "<");
          question = question.replace("&gt;", ">");
        }

        headerQuestion.innerText = question;
      };

      // replace bad encoding with quotation marks.
      setQuestion(0);

      // function to push the correct answer to incorrect answer array for easier manipulation.
      function setAnswers(questionNumber) {
        const randint = Math.floor(Math.random() * 3);
        let answersArray = res[questionNumber].incorrect_answers;
        answersArray.push(res[questionNumber].correct_answer);

        //changing the current index with the index of randint so the index before is removed.
        answersArray[3] = answersArray[randint];
        answersArray[randint] = res[questionNumber].correct_answer;

        return answersArray;
      }

      const answersOne = setAnswers(0);

      //loop over the answers and display them in the container
      function displayAnswers(array) {
        answersDiv.innerHTML = ``;
        for (let i = 0; i < 4; i++) {
          let answers = array[i];
          answersDiv.innerHTML += `<div class="button question-answer"> ${answers} </div>`;
        }
      }

      displayAnswers(answersOne);

      //check if button thats clicked is the correct answer.
      //add an event listener to the div containing all the buttons
      //Use event.target to check whether the button clicked is the right answer
      //if not, change the background colour of the button to red.
      //If they choose the correct answer then change to the next set of questions and answers
      answersDiv.addEventListener("click", (e) => {
        if (currentQuestion >= 9) {
          container.innerHTML = `
          <h1> Thanks for trying out our quiz! </h1>
          <br/>
          <p>If you want to try the quiz again, click the restart quiz button!</p>
          <br/>
          `;
          restartButton.style.display = "block";
        }
        let rightAnswer = res[currentQuestion].correct_answer;

        for (let j = 0; j < question.length; j++) {
          // correct the bad encoding on the api questions.
          rightAnswer = rightAnswer.replace("&quot;", `"`);
          rightAnswer = rightAnswer.replace("&#039;", "'");
          rightAnswer = rightAnswer.replace("&lt;", "<");
          rightAnswer = rightAnswer.replace("&gt;", ">");
        }

        rightAnswer = rightAnswer.trim();

        let choice = e.target.innerText;

        if (choice === rightAnswer) {
          currentQuestion++;
          e.target.style.backgroundColor = 'lightgreen'
          setTimeout(() => {
            setQuestion(currentQuestion);
            const answersTwo = setAnswers(currentQuestion);
            displayAnswers(answersTwo);
          }, 500);
          
        } else if (e.target.classList.contains("question-answer")) {
          e.target.style.backgroundColor = "red";
          setTimeout(() => {
            currentQuestion++;
            setQuestion(currentQuestion);
            const answersTwo = setAnswers(currentQuestion);
            displayAnswers(answersTwo);
          }, 500);
        }
      });
    });
};

startButton.addEventListener("click", () => {
  startButton.style.display = "none";
  intro.style.display = "none";
  startQuiz();
});

restartButton.addEventListener("click", () => {
  container.innerHTML = `
    <h1 class="question"></h1>
    <div class="answers"></div>
  `;
  restartButton.style.display = "none";
  startQuiz();
});
