//array of the quiz questions, avaialble choices, and correct answers     
var questions = [{
    title: "Which method extracts the characters from a string, between two specified indices, and returns the new string?",
    choices: ["substring()", "sort( )", "splice( )", "toString( )"],
    answer: "substring()"
},
{
    title: "Which conditional statment specify a new condition to test, if the first condition is false?",
    choices: ["if", "else", "else if", "switch"],
    answer: "else if"
},
{
    title: "Which array method calls a function (a callback function) once for all individual array elements?",
    choices: ["map()", "forEach()", "every()", "None of the above."],
    answer: "forEach()"
},
{
    title: "Which method checks if all array values pass a test?",
    choices: ["toSource( )", "sort( )", "forEach()", "every()"],
    answer: "every()"
},
{
    title: "Which of the following function of String object combines the text of two strings and returns a new string?",
    choices: ["add( )", "concat( )", "merge( )", "append( )"],
    answer: "concat( )"
}
]

//variables
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//starts the countdown timer once user clicks the 'start' button
function start() {

    timeLeft = 75;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        //ends game function when timer is below 0 at any time
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(); 
        }
    }, 1000);

    nextQuestion();
}

//stop the timer to end the game 
function endGame() {
    clearInterval(timer);

    var quizContent = `
    <h2>Game over!</h2>
    <h3>You got a ` + score +  ` /100!</h3>
    <h3>That means you got ` + score / 20 +  ` questions correct!</h3>
    <input type="text" id="name" placeholder="First name"> 
    <button onclick="setScore()">Set score!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//store the scores on local storage
function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName",  document.getElementById('name').value);
    getScore();
}


function getScore() {
    var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 
    
    <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>
    
    `;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//clears the score name and value in the local storage if the user selects 'clear score'
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");

    resetGame();
}

//reset the game 
function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

    var quizContent = `
    <h1>
        JavaScript Quiz!
    </h1>
    <h3>
        Click to start!   
    </h3>
    <button onclick="start()">Start!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//deduct 15seconds from the timer if user chooses an incorrect answer
function incorrect() {
    timeLeft -= 15; 
    nextQuestion();
}

//increases the score by 20points if the user chooses the correct answer
function correct() {
    score += 20;
    nextQuestion();
}

//loops through the questions 
function nextQuestion() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }

    var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }


    document.getElementById("quizBody").innerHTML = quizContent;
}