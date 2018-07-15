$(document).ready(function () {
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
    {
        question: "Which of these characters is the mascot of the video game company SEGA?", correct: "Sonic the Hedgehog", incorrect: ["Dynamite Headdy",
            "Alex Kidd",
            "Opa-Opa"]
    },
    {
        question: "What is the default alias that Princess Garnet goes by in Final Fantasy IX?", correct: "Dagger", incorrect: ["Dirk",
            "Garnet",
            "Quina"]
    },
    {
        question: "What is the name of the main healing item in Dark Souls?", correct: "Estus Flask", incorrect: ["Health Potion",
            "Orange Juice",
            "Ashen Flask"]
    },
    {
        question: "In the video game Overwatch, which playable character is infamous for saying &quot;It&#039;s high noon.&quot;?", correct: "McCree", incorrect: ["Hanzo",
            "Pharah",
            "Soldier: 76"]
    },
    {
        question: "In Portal 2, how did CEO of Aperture Science, Cave Johnson, presumably die?", correct: "Moon Rock Poisoning", incorrect: ["Accidentally sending a portal to the Moon",
            "Slipped in the shower",
            "Asbestos Poisoning"]
    },
    {
        question: "What year was the game Dishonored released?", correct: "2012", incorrect: ["2011",
            "2008",
            "2013"]
    },
    {
        question: "In the game &quot;Hearthstone&quot;, what is the best rank possible?", correct: "Rank 1 Legend", incorrect: ["Rank 1 Elite",
            "Rank 1 Master",
            "Rank 1 Supreme"]
    },
    ];
    var $answerImage = $("img.answerImage");
    var userAnswer;
    var correctAnswer;
    var currentQuestion;
    var numCorrect = 0;
    var numIncorrect = 0;
    var answers = [];
    var $timerHolder = $(".timer-holder");
    var $questionHolder = $(".question-holder");
    var $firstAnswer = $(".firstAnswer");
    var $secondAnswer = $(".secondAnswer");
    var $thirdAnswer = $(".thirdAnswer");
    var $fourthAnswer = $(".fourthAnswer");
    var $scoreHolder = $(".score-holder");
    var $restart = $("<button>").addClass("btn btn-outline-warning btn-lg btn-block").text("Start Again!");
    var questionTimer;
    var timerInterval;
    var time = 8;

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

    function countdownTimer() {
        $timerHolder.text("Time Remaining: " + time);
        clearInterval(timerInterval);
        timerInterval = setInterval(decrement, 1000);
    }

    function decrement() {
        time--;
        $timerHolder.text("Time Remaining: " + time);
        if (time === 0) {
            timesUp();
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
        $firstAnswer.text(answers[0]).attr("data-answer", answers[0]).show();
        $secondAnswer.text(answers[1]).attr("data-answer", answers[1]).show();
        $thirdAnswer.text(answers[2]).attr("data-answer", answers[2]).show();
        $fourthAnswer.text(answers[3]).attr("data-answer", answers[3]).show();
    }

    function setupQuestion(index) {
        $questionHolder.text(questions[index].question);
    }

    function timesUp() {
        clearInterval(timerInterval);
        numIncorrect++;
        userAnswer = false;
        hideButtons();
        $timerHolder.text("Time's Up!");
        displayResult(userAnswer);
        time = 8;
    }
    function hideButtons() {
        $firstAnswer.hide();
        $secondAnswer.hide();
        $thirdAnswer.hide();
        $fourthAnswer.hide();
    }

    function newRound() {
        $answerImage.hide();
        $restart.hide();
        $scoreHolder.empty().hide();
        $questionHolder.show();
        numCorrect = 0;
        numIncorrect = 0;
        setupAnswers(0);
        setupQuestion(0);
        countdownTimer();
        currentQuestion = 0;
    }

    function endRound() {
        clearTimeout(questionTimer);
        hideButtons();
        var rank = "";
        switch (numCorrect) {
            case 10:
                rank = "Supreme Master!";
                break;
            case 9:
            case 8:
            case 7:
                rank = "Master!";
                break;
            case 6:
            case 5:
            case 4:
                rank = "Intermediate!";
                break;
            case 3:
            case 2:
            case 1:
                rank = "Novice!";
                break;
            case 0:
                rank = "...oh dear. Umm, maybe try a little harder?"
                break;
        }
        $scoreHolder.show();
        $restart.show();
        $questionHolder.hide();
        $scoreHolder.text("You got " + numCorrect + " correct and " + numIncorrect + " wrong! Your knowledege level is that of a " + rank);
        $scoreHolder.append($restart);

    }

    function nextQuestion() {

        currentQuestion++;
        if (questions[currentQuestion]) {
            setupAnswers(currentQuestion);
            setupQuestion(currentQuestion);
            countdownTimer();
        }
        else {
            endRound();
            console.log("Got to endRound in nextQuestion!")
        }
    }

    function displayResult(userAnswer) {
        hideButtons();
        if (userAnswer) {
            $questionHolder.text("You're correct! " + correctAnswer + " is the right answer!")
        }
        else {
            $questionHolder.text("Not quite! " + correctAnswer + " is the right answer!")
        }
        setTimeout(nextQuestion, 3000);
    }

    function checkAnswer(numAnswer) {
        if (answers[numAnswer] == correctAnswer) {
            numCorrect++;
            userAnswer = true;
        } else {
            numIncorrect++;
            userAnswer = false;
        }
        displayResult(userAnswer);
        clearInterval(timerInterval);
    }

    $(".firstAnswer").on("click", function () {
        checkAnswer(0);
    });

    $(".secondAnswer").on("click", function () {
        checkAnswer(1);
    });

    $(".thirdAnswer").on("click", function () {
        checkAnswer(2);
    });

    $(".fourthAnswer").on("click", function () {
        checkAnswer(3);
    });

    $restart.on("click", newRound);

    newRound();
    //DO NOT CODE BENEATH THIS LINE
});