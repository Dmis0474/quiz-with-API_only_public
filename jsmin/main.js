let dataArr;

const loader = document.querySelector(".preloader");

function displayLoading() {
  loader.classList.add("display");
}

function hideLoading() {
  loader.classList.remove("display");
}

const requestURL = `https://the-trivia-api.com/api/questions`;
displayLoading();
fetch(requestURL)
  .then((response) => response.json())
  .then((response) => {
    dataArr = response;
    showInfo(dataArr);
    hideLoading();
  });

let allCorrectAnswers = [];
function showInfo(data) {
  let spanCat = document.createElement("p");
  spanCat.innerHTML = `Your category:<br> ${data[0].category}`;
  document.querySelector("#question__section").appendChild(spanCat);
  let spanQuest = document.createElement("p");
  spanQuest.innerHTML = `Your question:<br> ${data[0].question}`;
  document.querySelector("#question__section").appendChild(spanQuest);
  let containerAllAnswers = [...data[0].incorrectAnswers];
  containerAllAnswers.push(data[0].correctAnswer);
  containerAllAnswers = containerAllAnswers.sort();
  console.log(containerAllAnswers);
  let buttonsDiv = document.createElement("div");
  buttonsDiv.className = "question__items";
  buttonsDiv.inner = containerAllAnswers.map((item, index) => {
    let optionsBox = document.createElement("div")
    optionsBox.className = 'question__item'
    buttonsDiv.appendChild(optionsBox);
    let input = document.createElement("input");
    let label = document.createElement("label");
    input.className = "btn";
    input.onchange = addAnswer;
    input.addEventListener("onchange", addAnswer, false);
    input.type = "radio";
    input.id = `${item}id`;
    input.value = `${item}`;
    input.name = "inputOption";
    optionsBox.appendChild(input);
    label.innerHTML = `${item}`;
    label.setAttribute('for', `${item}id`)
    label.className = "options";
    optionsBox.appendChild(label);
    
  });
  document.querySelector("#question__section").appendChild(buttonsDiv);
  let arrCorrectAnswer = [];
  data.map((item) => arrCorrectAnswer.push(item.correctAnswer));
  console.log(arrCorrectAnswer);
  allCorrectAnswers = [...arrCorrectAnswer];
}
let indexQuestion = 0;

let arrAnswer = [];

function addAnswer(event) {
  let a = event.target.value;
  arrAnswer.push(a);
}

console.log(arrAnswer);

document.querySelector("#next").addEventListener("click", nextQuestion, false);
document
  .querySelector("#prev")
  .addEventListener("click", previousQuestion, false);

function nextQuestion() {
  if (indexQuestion >= dataArr.length) {
    checkAnswer();
  }

  let elementInfo = document.getElementById("question__section");
  while (elementInfo.firstChild) {
    elementInfo.removeChild(elementInfo.firstChild);
  }

  ++indexQuestion;

  let spanCat = document.createElement("p");
  spanCat.innerHTML = `Your category:<br> ${dataArr[indexQuestion].category}`;
  document.querySelector("#question__section").appendChild(spanCat);
  let spanQuest = document.createElement("p");
  spanQuest.innerHTML = `Your question:<br> ${dataArr[indexQuestion].question}`;
  document.querySelector("#question__section").appendChild(spanQuest);
  let containerAllAnswers = [...dataArr[indexQuestion].incorrectAnswers];
  containerAllAnswers.push(dataArr[indexQuestion].correctAnswer);
  containerAllAnswers = containerAllAnswers.sort();
  console.log(containerAllAnswers);
  let buttonsDiv = document.createElement("div");
  buttonsDiv.className = "question__items";
  buttonsDiv.inner = containerAllAnswers.map((item, index) => {
    let optionsBox = document.createElement("div")
    optionsBox.className = 'question__item'
    buttonsDiv.appendChild(optionsBox);
    let input = document.createElement("input");
    let label = document.createElement("label");
    input.className = "btn";
    input.onchange = addAnswer;
    input.addEventListener("onchange", addAnswer, false);
    input.type = "radio";
    input.id = `${item}id`;
    let connect = input.id
    input.value = `${item}`;
    input.name = "inputOption";
    optionsBox.appendChild(input);
    label.innerHTML = `${item}`;
    label.setAttribute('for', `${item}id`)
    label.className = "options";
    optionsBox.appendChild(label);
    document.querySelector("#question__section").appendChild(buttonsDiv);
  });
}

function previousQuestion() {
  if (indexQuestion >= dataArr.length) {
    checkAnswer();
  }

  let elementInfo = document.getElementById("question__section");
  while (elementInfo.firstChild) {
    elementInfo.removeChild(elementInfo.firstChild);
  }

  --indexQuestion;

  let spanCat = document.createElement("p");
  spanCat.innerHTML = `Your category:<br> ${dataArr[indexQuestion].category}`;
  document.querySelector("#question__section").appendChild(spanCat);
  let spanQuest = document.createElement("p");
  spanQuest.innerHTML = `Your question:<br> ${dataArr[indexQuestion].question}`;
  document.querySelector("#question__section").appendChild(spanQuest);
  let containerAllAnswers = [...dataArr[indexQuestion].incorrectAnswers];
  containerAllAnswers.push(dataArr[indexQuestion].correctAnswer);
  containerAllAnswers = containerAllAnswers.sort();
  console.log(containerAllAnswers);
  let buttonsDiv = document.createElement("div");
  buttonsDiv.className = "question__items";
  buttonsDiv.inner = containerAllAnswers.map((item, index) => {
    let optionsBox = document.createElement("div")
    optionsBox.className = 'question--item'
    buttonsDiv.appendChild(optionsBox);
    let input = document.createElement("input");
    let label = document.createElement("label");
    input.className = "btn";
    input.onchange = addAnswer;
    input.addEventListener("onchange", addAnswer, false);
    input.type = "radio";
    input.id = `${item}id`;
    let connect = input.id
    input.value = `${item}`;
    input.name = "inputOption";
    optionsBox.appendChild(input);
    label.innerHTML = `${item}`;
    label.setAttribute('for', `${item}id`)
    label.className = "options";
    optionsBox.appendChild(label);
    document.querySelector("#question__section").appendChild(buttonsDiv);
  });
}

document.querySelector("#get").addEventListener("click", checkAnswer, false);

function checkAnswer() {
  let counter = 0;
  arrAnswer.map((item) => {
    if (allCorrectAnswers.indexOf(item) >= 0) {
      counter++;
    }
  });
  let resultText = document.createElement("div");
  resultText.className = "question__section--result";
  resultText.innerHTML = `<p className = "">Cool! Correct Answers: ${counter}!</p> `;
  const section = document.querySelector("#question__section");
  while (section.firstChild) {
    section.removeChild(section.lastChild);
  }
  document.querySelector("#question__section").appendChild(resultText);
}

// console.log(arrAnswer);
// console.log(allQuestions);
