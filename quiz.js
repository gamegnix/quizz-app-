const levelScreen = document.querySelector("#level-screen");
const quizScreen = document.querySelector("#quiz-screen");
const scoreScreen = document.querySelector("#score-screen");
const timerEl = document.querySelector("#timer");
const questionEl = document.querySelector("#question");
const answersEl = document.querySelector("#answers");
const nextBtn = document.querySelector("#next-btn");
const scoreText = document.querySelector("#score-text");
const restartBtn = document.querySelector("#restart-btn");
const levelBtns = document.querySelectorAll(".btn-clr");

let currentQuestion = 0;
let score = 0;
let timerLeft = 30;
let timer;
let questions = [];

const easyQuestion = [
  {
    question: "what is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
  {
    question: "what is 4 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "6",
  },
  {
    question: "what is 3 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "5",
  },
  {
    question: "what is 5 + 2?",
    options: ["3", "4", "5", "7"],
    answer: "7",
  },
  {
    question: "what is 10 + 2?",
    options: ["3", "4", "12", "6"],
    answer: "12",
  },
];

const mediumQuestion = [
  {
    question: "what is 3 * 2?",
    options: ["3", "4", "5", "6"],
    answer: "6",
  },
  {
    question: "what is 5 * 2?",
    options: ["3", "4", "10", "6"],
    answer: "10",
  },
  {
    question: "what is 7 * 2?",
    options: ["3", "4", "5", "14"],
    answer: "14",
  },
  {
    question: "what is 10 / 2?",
    options: ["3", "4", "5", "5"],
    answer: "5",
  },
  {
    question: "what is 5 * 2?",
    options: ["3", "4", "10", "6"],
    answer: "10",
  },

  {
    question: "what is 3 * 7?",
    options: ["21", "12", "22", "32"],
    answer: "21",
  },
];

const hardQuestion = [
  {
    question: "what is 144 / 12?",
    options: ["21", "12", "22", "32"],
    answer: "12",
  },
  {
    question: "what is 25 * 4?",
    options: ["100", "125", "210", "320"],
    answer: "100",
  },
  {
    question: "what is 17 * 8?",
    options: ["458", "136", "224", "432"],
    answer: "136",
  },
  {
    question: "what is 256 / 16?",
    options: ["451", "16", "22", "32"],
    answer: "16",
  },
  {
    question: "what is 45 * 12?",
    options: ["214", "540", "220", "432"],
    answer: "540",
  },
  {
    question: "what is 338 / 26?",
    options: ["219", "125", "13", "832"],
    answer: "13",
  },
];

levelBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let level = btn.dataset.level;

    if (level === "easy") {
      questions = easyQuestion;
    } else if (level === "medium") {
      questions = mediumQuestion;
    } else {
      questions = hardQuestion;
    }

    levelScreen.style.display = "none";
    quizScreen.style.display = "block";
    showQuestion();
    startTimer();
  });
});

function showQuestion() {
  let current = questions[currentQuestion];
  questionEl.textContent = current.question;
  answersEl.innerHTML = "";

  current.options.forEach((option) => {
    let btn = document.createElement("button");
    btn.textContent = option;
    answersEl.appendChild(btn);

    btn.addEventListener("click", () => {
      if (option === questions[currentQuestion].answer) {
        score++;
        btn.style.backgroundColor = "green";
      } else {
        btn.style.backgroundColor = "red";
      }
      nextBtn.style.display = "block";
    });
  });
}
nextBtn.addEventListener("click", () => {
  clearInterval(timer);
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
    startTimer();
  } else {
    quizScreen.style.display = "none";
    scoreScreen.style.display = "block";
    scoreText.textContent = `You scored ${score} out of ${questions.length}`;
  }
});

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  questions = [];
  scoreScreen.style.display = "none";
  levelScreen.style.display = "block";
});

function startTimer() {
  timerLeft = 30;
  timerEl.textContent = `Time: ${timerLeft}`;

  timer = setInterval(() => {
    timerLeft--;
    timerEl.textContent = `Time: ${timerLeft}`;

    if (timerLeft === 0) {
      clearInterval(timer);
      nextBtn.style.display = "block";
    }
  }, 1000);
}
