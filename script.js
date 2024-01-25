const data = [
  {
  question:'What does HTML stand for?  ',
  options: ['Hyper Text Markup Language','Home Tool Markup Language','Hyperlinks and Text Markup Language',],
  answer:'Hyper Text Markup Language'
  },
  {
  question:'  In what situation should you use the < small > tag?  ',
  options: ['When you want to create subheading after a < h1 > element','When you want to add copyright information inside a < footer >  ','Both situations'],
  answer:'When you want to add copyright information inside a < footer > '
},
{
 question:' Which technology is primarily responsible for the styling of web pages?',
  options: ['JavaScript','HTML','CSS','Python'],
  answer:'CSS'
  },
{
  question:'What does CSS stand for?',
  options: [' Creative Style Sheets','Cascading Style Sheets','Computer Style Sheets','Custom Style Sheets'],
  answer:'Cascading Style Sheets'
},
{
  question:'Which part of web development is responsible for handling data storage and retrieval?',
  options: [' Front-end development',' Back-end development','Full-stack development','Middleware development'],
  answer:'Back-end development'
},
{
  question:'What is the purpose of the script tag in HTML?',
  options: ['To define the page’s structure','To include external CSS styles','To include external JavaScript code','To create hyperlinks'],
  answer:'To include external JavaScript code'
},

];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton= document.getElementById('showAnswer');
const timerElement = document.getElementById('timerValue');
let currentQuestion = 0;
let incorrectAnswer = [];
let score=0;
let timer;
let timerDuration=60;

function startTimer(){
  timer = setInterval(() =>{
    timerDuration --<= 0 ? (clearInterval(timer), displayResult()) : updateTimerDisplay();
}, 1000);
}

function updateTimerDisplay(){
  const minutes = Math.floor(timerDuration / 60);
  const seconds = timerDuration % 60;
  timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function stopTimer(){
  clearInterval(timer);
}

function displayQuestion(){
  const questionData = data[currentQuestion];
  const questionElement = createDivElement('question', questionData.question);
  const optionsElement = createOptionsElement(questionData.options);
  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
  startTimer();
}

function createDivElement(className , innerHTML){
  const divElement = document.createElement('div');
  divElement.className = className;
  divElement.innerHTML = innerHTML;
  return divElement;
}

function createOptionsElement(options){
  const optionsElement = createDivElement('options', '');
  const shuffledOptions = [...options];
  shuffleArray=(shuffledOptions);
  
  for ( let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);
    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);

  }
  return optionsElement;
} 

function checkAnswer(){
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer == data[currentQuestion].answer) {
      score++;
    } else{
      incorrectAnswer.push({
        question: data[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: data[currentQuestion].answer,
});
}
currentQuestion++;
selectedOption.checked = false;
if (currentQuestion < data.length) {
  displayQuestion();
}else{
  displayResult();
}
  }
  stopTimer();
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${data.lenght}!`;

}
function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswer = [];
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = ``;
  timerDuration = 60;
  updateTimerDisplay();
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswer.length; i++){
        incorrectAnswersHtml += `
        <p>
        <strong>Question:</strong> ${incorrectAnswer[i].question}<br>
       <strong>YourAnswer:</strong> ${incorrectAnswer[i].incorrectAnswer}<br>
       <strong>correctAnswer:</strong> ${incorrectAnswer[i].correctAnswer}
       </p>
        `;
  }
  resultContainer.innerHTML = `
  <p>You scored ${score} out of ${data.length}!</p>
  <p>incorrect Answer: </p>
  ${incorrectAnswersHtml}
  `;
}


submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

updateTimerDisplay();
displayQuestion();

function ShuffleArray(array){
  for ( let i= array.lenght - 1; i>0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]]= [array[j], array[i]];
  }
}