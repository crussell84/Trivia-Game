$( document ).ready(function() {
    var questions = [{ question: "How many differently shaped Tetris pieces are there?", correct: "7", incorrect: ["5", "6", "8"] },
    {
        question: "In Minecraft, which two items must be combined to craft a torch?", correct: "Stick and Coal", incorrect: ["Stick and Fire",
            "Wood and Coal",
            "Wood and Fire"]
    },
    {
        question: "League of Legends, DOTA 2, Smite and Heroes of the Storm are all part of which game genre?", correct: "Multiplayer Online Battle Arena (MOBA)", incorrect: ["Real Time Strategy (RTS)",
            "First Person Shooter (FPS)",
            "Role Playing Game (RPG)"]
    },
    { question: "", correct: "", incorrect: ["", "", ""] },
    { question: "", correct: "", incorrect: ["", "", ""] },
    { question: "", correct: "", incorrect: ["", "", ""] },
    { question: "", correct: "", incorrect: ["", "", ""] },
    { question: "", correct: "", incorrect: ["", "", ""] },
    { question: "", correct: "", incorrect: ["", "", ""] },
    { question: "", correct: "", incorrect: ["", "", ""] },
    ];
    var answerImage = $("img.answerImage");
    var userAnswer;
    var correctAnswer;
    var currentQuestion;
    var numCorrect = 0;
    var numIncorrect = 0;
    var answers = [];
    var _questionHolder = $(".question-holder");
    var _firstAnswer = $(".firstAnswer");
    var _secondAnswer = $(".secondAnswer");
    var _thirdAnswer = $(".thirdAnswer");
    var _fourthAnswer = $(".fourthAnswer");
    var questionTimer;

    function shuffle(array) {
        var i = 0
            , j = 0
            , temp = null

        for (i = array.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1))
            temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
    }

    function setupAnswers(index) {
        correctAnswer = questions[index].correct;
        answers = [];
        answers.push(questions[index].correct)
        answers.push(questions[index].incorrect[0]);
        answers.push(questions[index].incorrect[1]);
        answers.push(questions[index].incorrect[2]);
        shuffle(answers);
        _firstAnswer.text(answers[0]).attr("data-answer", answers[0]).show();
        _secondAnswer.text(answers[1]).attr("data-answer", answers[1]).show();
        _thirdAnswer.text(answers[2]).attr("data-answer", answers[2]).show();
        _fourthAnswer.text(answers[3]).attr("data-answer", answers[3]).show();
    }

    function setupQuestion(index) {
        _questionHolder.text(questions[index].question);
    }

    function timesUp() {
        hideButtons();
        _questionHolder.text("Time's Up!");
        setTimeout(nextQuestion, 5000);
    }
    function hideButtons() {
        _firstAnswer.hide();
        _secondAnswer.hide();
        _thirdAnswer.hide();
        _fourthAnswer.hide();
    }

    function newRound() {
        answerImage.hide();
        numCorrect = 0;
        numIncorrect = 0;
        setupAnswers(0);
        setupQuestion(0);
       questionTimer = setTimeout(timesUp, 5000);
        currentQuestion = 0;
    }

    function nextQuestion(){
        currentQuestion++;
        if (questions[currentQuestion]) {
        setupAnswers(currentQuestion);
        setupQuestion(currentQuestion);
        questionTimer = setTimeout(timesUp, 5000);
        }
        else{
            endRound();
        }
    }

    function displayResult(userAnswer){
        hideButtons();
        if (userAnswer){
            _questionHolder.text("You're correct! " + correctAnswer + " is the right answer!")
        }
        else { 
            _questionHolder.text("Not quite! " + correctAnswer + " is the right answer!")
        }
        setTimeout(nextQuestion, 3000);
    }

    $(".btn").on("click", function(){
        if ( this.value == correctAnswer){
            numCorrect++;
            userAnswer = true;
        } else {
            numIncorrect++;
            userAnswer = false;
        }
        displayResult(userAnswer);
        clearTimeout(questionTimer);
        console.log(this);
    });

    newRound();
    //DO NOT CODE BENEATH THIS LINE
});