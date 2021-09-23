let timer = document.querySelector('#timer');

let questions = [
    {question: 'Commonly used data types DO NOT include:',
    choices: {1:'strings', 2:'booleans', 3:'alerts', 4:'numbers'},
    answer: '3'},
    {question: 'Commonly used data types DO NOT include:',
    choices: {1:'strings', 2:'booleans', 3:'alerts', 4:'numbers'},
    answer: '3'},
    {question: 'Commonly used data types DO NOT include:',
    choices: {1:'strings', 2:'booleans', 3:'alerts', 4:'numbers'},
    answer: '3'},
    {question: 'Commonly used data types DO NOT include:',
    choices: {1:'strings', 2:'booleans', 3:'alerts', 4:'numbers'},
    answer: '3'},
    {question: 'Commonly used data types DO NOT include:',
    choices: {1:'strings', 2:'booleans', 3:'alerts', 4:'numbers'},
    answer: '3'}
];

function welcomePage() {
    let h1El = document.createElement('h1');
    h1El.textContent = 'Coding Quiz Challenge';
    main.appendChild(h1El);
    let paraEl = document.createElement('p');
    paraEl.textContent = 'Try to answer the following code related questions.';
    main.appendChild(paraEl);
    let startBtn = document.createElement('button');
    startBtn.innerHTML = 'Start Quiz';
    main.appendChild(startBtn);
    startBtn.addEventListener('click', startTimer);
}
welcomePage();

function startTimer() {
    let timeLeft = 5;
    let timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timer.textContent = timeLeft + ' seconds remaining';
            timeLeft--;
        } else {
            timer.textContent = '';
            clearInterval(timeInterval);
            // displayScore();
        }
    }, 1000);
    question();
}

function question() {
    let currentQuestion = 0;
    let {question, choices, answer} = questions[currentQuestion];
    let answers = [];
    for (choice in choices) {
        answers.push(`<button name='quuestions${currentQuestion}' onclick='validateAnswer(${choice})'>${choice}${choices[choice]}</button>`)
    }
    let output = `<div id='questionTitle'>${questions}</div><div>${answers.join('')}</div>`
    main.innerHTML = output;
}
