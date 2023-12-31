// Elements
const startButton = document.getElementById('start-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const timerElement = document.getElementById('timer');
const initialsForm = document.getElementById('initials-form');
const initialsInput = document.getElementById('initials-input');
const submitButton = document.getElementById('submit-button');
const scoreElement = document.getElementById('score');

// Variables
let shuffledQuestions, currentQuestionIndex;
let timer;
let timeLeft;
let score;

// Event listeners
startButton.addEventListener('click', startQuiz);
answerButtonsElement.addEventListener('click', (event) => {
  if (event.target.classList.contains('btn')) {
    selectAnswer(event.target);
  }
});
initialsForm.addEventListener('submit', submitForm);

// Start the quiz
function startQuiz() {
  startButton.classList.add('hide');
  questionContainerElement.classList.remove('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 60;
  setNextQuestion();
  startTimer();
}

// Set the next question
function setNextQuestion() {
  resetState();
  if (currentQuestionIndex < shuffledQuestions.length) {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  } else {
    endQuiz();
  }
}

// Show a question
function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    answerButtonsElement.appendChild(button);
  });
}

// Reset the question state
function resetState() {
  clearStatusClass(document.body);
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

// Select an answer
function selectAnswer(selectedButton) {
  const correct = selectedButton.dataset.correct;
  if (correct) {
    score++;
  } else {
    timeLeft -= 10;
    if (timeLeft < 0) {
      timeLeft = 0;
    }
  }
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  currentQuestionIndex++;
  setTimeout(setNextQuestion, 1000);
}

// Set status class for correct/wrong answers
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

// Clear status class
function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

// Start the timer
function startTimer() {
  timer = setInterval(updateTimer, 1000);
}

// Update the timer
function updateTimer() {
  if (timeLeft > 0) {
    timerElement.innerText = `Time left: ${timeLeft}`;
    timeLeft--;
  } else {
    endQuiz();
  }
}

// End the quiz
function endQuiz() {
  clearInterval(timer);
  questionContainerElement.classList.add('hide');
  initialsForm.classList.remove('hide');
  scoreElement.innerText = `Score: ${score}`;
}

// Submit initials form
function submitForm(event) {
  event.preventDefault();
  const initials = initialsInput.value.trim();
  if (initials !== '') {
    saveScore(initials, score);
    initialsForm.classList.add('hide');
    alert('Score saved!');
  } else {
    alert('Please enter your initials.');
  }
}

// Save score to local storage or other storage mechanism
function saveScore(initials, score) {
  // Implement your code to save the score here
  // Example: localStorage.setItem('score', score);
}

// Quiz questions
const questions = [
  {
    question: 'What is the way you refer to a class in CSS??',
    answers: [
      { text: '.class', correct: true },
      { text: '#class', correct: false },
      { text: '_class', correct: false },
      { text: 'Class', correct: false },
    ],
  },
  {
    question: 'how do you refer to an id in CSS?',
    answers: [
      { text: '.id', correct: false },
      { text: '#id', correct: true },
      { text: '_id', correct: false },
      { text: 'ID', correct: false },
    ],
  },
  {
    question: 'what language controls the layout of a page?',
    answers: [
      { text: 'CSS', correct: false },
      { text: 'HTML', correct: true },
      { text: 'Javascript', correct: false },
      { text: 'Python', correct: false },
    ],
  },
  {
    question: 'Which number is an integer?',
    answers: [
      { text: 'pi', correct: false },
      { text: '4', correct: true },
      { text: '1/2', correct: false },
      { text: '.03', correct: false },
    ],
  },
  {
    question: 'Which of the follow is a string?',
    answers: [
      { text: '4', correct: false },
      { text: '2+2', correct: false },
      { text: '4.0', correct: false },
      { text: 'four', correct: true }
    ],
  },
  {
    question: 'which is an example of a Javascript Method?',
    answers: [
      { text: 'getElementById', correct: true },
      { text: 'function()', correct: false },
      { text: 'true', correct: false },
      { text: 'x > 3', correct: false }
    ],
  },
  {
    question: 'what is the typical name for a CSS stylesheet?',
    answers: [
      { text: 'index.css', correct: false },
      { text: 'style.css', correct: true },
      { text: 'script.css', correct: false },
      { text: 'css.h', correct: false },
    ],
  },
];
