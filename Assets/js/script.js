const timerE1 = document.querySelector("#time");
const startQuizE1 = document.querySelector(".start-quiz");
const startButtonE1 = document.querySelector("#start");
const questionsE1 = document.querySelector(".questions");
const questionDisplayE1 = document.querySelector("#question-display");
const correctIncorrectE1 = document.querySelector(".feedback");
const endScreenE1 = document.querySelector(".endscreen");
const scoresForm = document.querySelector("#score-form");
const scoreE1 = document.querySelector("#score");
const scoreboard = document.querySelector("#scoreboard");
const initialsInput = document.querySelector("#intials");
const highScores = document.querySelector(".highscores");
const scoresList = document.querySelector("#scores");
const returnStart = document.querySelector("#return");
const resetScores = document.querySelector("#reset");
const answerButtons = document.querySelector(".answer-buttons");
const checkScoresE1 = document.querySelector("#check-scores");
const startButton = document.querySelector("#start-quiz");
const choicepile = ["#answerA", "#answerB", "#answerC", "#answerD"];

let questionIdx = 0;
let secondsLeft = 100;
let score = 0;
let timerInterval;
let flashTimeout;

const questionOptions = [
  {
    question:
      "How can you get the total number of arguments passed to a function?",
    answeropt: [
      "A - Using args.length property",
      "B - Using arguments.length property",
      "C - Both of the above.",
      "D - None of the above.",
    ],
    answer: "A - Using args.length property",
  },

  {
    question:
      "Which built-in method calls a function for each element in the array?",
    answeropt: [
      "A - while()",
      "B - loop()",
      "C - forEach()",
      "D - None of the above.",
    ],
    answer: "B - loop()",
  },

  {
    question:
      "Which of the following function of String object returns the index within the calling String object of the first occurrence of the specified value?",
    answeropt: [
      "A - substr()",
      "B - search()",
      "C - lastIndexOf()",
      "D - indexOf()",
    ],
    answer: "C - lastIndexOf()",
  },

  {
    question:
      "10 - Which of the following function of Array object reverses the order of the elements of an array?",
    answeropt: [
      "A - reverse()",
      "B - push()",
      "C - reduce()",
      "D - reduceRight()",
    ],
    answer: "C - reduce()",
  },

  {
    question:
      "Which of the following function of String object creates a string to be displayed as bold as if it were in a <b> tag?",
    answeropt: ["A - anchor()", "B - big()", "C - blink()", "D - bold()"],
    answer: "C - blink()",
  },
];

function startQuiz() {
  startQuizE1.classList.add("hide");
  questionsE1.classList.remove("hide");

  displayQuestion();
  startTimer();
}
startButton.addEventListener("click", startQuiz);

function startTimer() {
  timerInterval = setInterval(function () {
    secondsLeft--;
    timerE1.textContent = secondsLeft;
    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

function displayQuestion() {
  let currentQuestion = questionOptions[questionIdx];
  questionDisplayE1.textContent = currentQuestion.question;
  console.log(currentQuestion.question);
  let answerOptions = currentQuestion.answeropt;
  for (let i = 0; i < answerOptions.length; i++) {
    let choices = document.querySelectorAll(`${choicepile[i]}`);
    for (let j = 0; j < choices.length; j++) {
      choices[j].textContent = answerOptions[i];
    }
  }
}

answerButtons.addEventListener("click", function (event) {
  const element = event.target;
  if (element.matches("button")) {
    checkAnswer(element.textContent);
  }
});

function checkAnswer(element) {
  let correctAnswer = questionOptions[questionIdx].answer;

  if (element === correctAnswer) {
    clearTimeout(flashTimeout);
    correctIncorrectE1.textContent = "Correct!";
    correctIncorrectE1.classList.remove("hide");
    flashTimeout = setTimeout(function () {
      correctIncorrectE1.classList.add("hide");
    }, 1000);
    score++;
  } else {
    score--;
    secondsLeft -= 10;
    clearTimeout(flashTimeout);
    correctIncorrectE1.textContent = "Incorrect";
    correctIncorrectE1.classList.remove("hide");
    flashTimeout = setTimeout(function () {
      correctIncorrectE1.classList.add("hide");
    }, 1000);
  }

  questionIdx++;
  console.log(questionIdx);

  if (questionOptions.length > questionIdx) {
    console.log(questionOptions.length, "hey", questionIdx);
    displayQuestion();
  } else {
    setTimeout(function () {
      endQuiz();
    }, 500);
  }
}

function compareScores(a, b) {
  return b.score - a.score;
}

function renderScores() {
  endScreenE1.classList.add("hide");
  highScores.classList.remove("hide");

  scoresList.innerHTML = "";

  let newScores = JSON.parse(window.localStorage.getItem("storedScores")) || [];
  newScores.sort(compareScores);

  for (let i = 0; i < newScores.length; i++) {
    const li = document.createElement("li");
    li.textContent = `${newScores[i].initials} - ${newScores[i].score}`;
    scoresList.appendChild(li);
  }
}

function storeScore() {
  const initials = initialsInput.value.trim();
  const storedScores = JSON.parse(localStorage.getItem("storedScores")) || [];
  const initialsScore = {
    initials: initials,
    score: score,
  };
  storedScores.push(initialsScore);

  localStorage.setItem("storedScores", JSON.stringify(storedScores));
}

function endQuiz() {
  clearInterval(timerInterval);
  timerE1.textContent = 0;
  if (secondsLeft < 0) {
    secondsLeft = 0;
  }

  highScores.textContent = secondsLeft;
  questionsE1.classList.add("hide");
  endScreenE1.classList.remove("hide");
}

resetScores.addEventListener("click", function () {
  localStorage.clear();
  renderScores();
});

returnStart.addEventListener("click", function () {
  clearInterval(timerInterval);
  questionIdx = 0;
  secondsLeft = 100;
  timerE1.textContent = secondsLeft;
  endScreenE1.classList.add("hide");
  startQuizE1.classList.remove("hide");
  highScores.classList.add("hide");
});

scoreboard.addEventListener("submit", function () {
  storeScore();
  initialsInput.value = "";
  renderScores();
});

checkScoresE1.addEventListener("click", function () {
  clearInterval(timerInterval);
  renderScores();
});
