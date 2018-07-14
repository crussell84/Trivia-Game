$(function () {
    var questions = [{ question: "How many differently shaped Tetris pieces are there?", correct: "7", incorrect: ["5", "6", "8"] },
    { question: "", correct: "", incorrect: ["", "", ""] },
    { question: "", correct: "", incorrect: ["", "", ""] },
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
        answers.push(questions[index].correct)
        answers.push(questions[index].incorrect[0]);
        answers.push(questions[index].incorrect[1]);
        answers.push(questions[index].incorrect[2]);
        shuffle(answers);
        _firstAnswer.text(answers[0]);
        _secondAnswer.text(answers[1]);
        _thirdAnswer.text(answers[2]);
        _fourthAnswer.text(answers[3]);
    }

    function setupQuestion(index) {
        _questionHolder.text(questions[index].question);
    }

    function timesUp() {
        _firstAnswer.hide();
        _secondAnswer.hide();
        _thirdAnswer.hide();
        _fourthAnswer.hide();
        _questionHolder.text("Time's Up!");
    }

    function newRound() {
        answerImage.hide();
        numCorrect = 0;
        numIncorrect = 0;
        setupAnswers(0);
        setupQuestion(0);
        setTimeout(timesUp, 5000);
    }

    newRound();
    //DO NOT CODE BENEATH THIS LINE
})();