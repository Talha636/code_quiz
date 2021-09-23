let scoreBtn = document.querySelector('#highscore');
let timer = document.querySelector('#timer');
let currentQuestion = 0;
let timeLeft = 50;

let questions = [
    {question: 'Commonly used data types DO NOT include:',
    choices: {1:'strings', 2:'booleans', 3:'alerts', 4:'numbers'},
    answer: 3},
    {question: 'The condition in an if/else statement is enclosed with _____.',
    choices: {1:'quotes', 2:'curly brackets', 3:'parenthesis', 4:'square brackets'},
    answer: 2},
    {question: 'Arrays in JavaScript can be used to store _____.',
    choices: {1:'numbers and strings', 2:'other arrays', 3:'booleans', 4:'all of the above'},
    answer: 4},
    {question: 'String values must be enclosed within _____ when being assigned to variables.',
    choices: {1:'commas', 2:'quotes', 3:'curly brackets', 4:'parenthesis'},
    answer: 2},
    {question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
    choices: {1:'JavaScript', 2:'terminal/bash', 3:'for loops', 4:'console.log'},
    answer: 4}
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
    scoreBtn.addEventListener('click', showScore);
}
welcomePage();

function startTimer() {
    let timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timer.textContent = timeLeft + ' seconds remaining';
            timeLeft--;
        } else {
            timer.textContent = '';
            clearInterval(timeInterval);
        }
    }, 1000);
    question();
}

function question() {
    let {question, choices, answer} = questions[currentQuestion];
    let answers = [];
    for (choice in choices) {
        answers.push(`<div><button name='question${currentQuestion}' onclick='checkAnswer(${choice})'>${choice}${choices[choice]}</button></div>`)
    }
    let quiz = `<div id='questionTitle'>${question}</div><div>${answers.join('')}</div>`
    main.innerHTML = quiz;
}

function checkAnswer(answer) {
    let corrAnswer = questions[currentQuestion].answer;
    let nextQuestion = function() {
        currentQuestion += 1;
        if (currentQuestion === questions.length) {
            saveScore();
            clearInterval(timer);
        } else {
            question();
        }
    }
    if (answer == corrAnswer) {
        nextQuestion();
    } else {
        timeLeft -= 10;
        nextQuestion();
    }
}

function saveScore() {
    let scoreScreen = `<h1>Save Score</h1>
                        <div id='highscore-form'>
                            <label for='score'>Total Score: ${timeLeft}</label>
                            <br>
                            <label for='initials'>Initials:</label>
                            <input id='initials' type='text' name='Initials'>
                            <button id='submit'>Submit</button>
                        </div>`
    main.innerHTML = scoreScreen;
    let form = document.getElementById('submit');
    form.addEventListener('click', save());
    function save() {
        let initials = document.getElementById('initials').value;
        let highScore = localStorage.getItem('hiscore');
        let highScoreLocal = highScore ? JSON.parse(highScores) : [];
        highScoreLocal.push({
            score: timeLeft,
            initials
        });
        localStorage.setItem('highscores', JSON.stringify(highScoreLocal));
        showScore();
    }
}

function showScore() {
    let highScore = localStorage.getItem('highscore');
    let savedScore = highscore ? JSON.parse(highScore) : [];
    let score = savedScore.map(highscore => {
        return `<div>Name: ${highScore.initials}
                Score: ${highScore.score}</div>`
    });
    main.innerHTML = `${score.join('')}<div><button id='back'>Back</button></div>`;
    document.getElementById('back').addEventListener('click', () => {
        location.reload();
    })
}