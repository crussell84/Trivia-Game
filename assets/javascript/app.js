$(function () {
    var questions = ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"];
    var answerImage = $("img.answerImage");
    var userAnswer;
    var correctAnswer;
    var currentQuestion;
    var questionSet = [];
    var numCorrect = 0;
    var numIncorrect = 0;

    function selectQuestions () {

    }

    function newRound(){
        answerImage.hide();
        numCorrect = 0;
        numIncorrect = 0;
        questionSet = [];
        
    }

    newRound();
    //DO NOT CODE BENEATH THIS LINE
})();