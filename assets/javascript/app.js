$(document).ready(function () {
    var questions = [{ question: "How many differently shaped Tetris pieces are there?", correct: "7", incorrect: ["5", "6", "8"], image: "./assets/images/tetris.jpg" },
    {
        question: "In Minecraft, which two items must be combined to craft a torch?", correct: "Stick and Coal", incorrect: ["Stick and Fire",
            "Wood and Coal",
            "Wood and Fire"],
        image: "./assets/images/minecraft.gif"
    },
    {
        question: "League of Legends, DOTA 2, Smite and Heroes of the Storm are all part of which game genre?", correct: "Multiplayer Online Battle Arena (MOBA)", incorrect: ["Real Time Strategy (RTS)",
            "First Person Shooter (FPS)",
            "Role Playing Game (RPG)"], image: "./assets/images/heroes.jpg"
    },
    {
        question: "Which of these characters is the mascot of the video game company SEGA?", correct: "Sonic the Hedgehog", incorrect: ["Dynamite Headdy",
            "Alex Kidd",
            "Opa-Opa"], image: "./assets/images/sonic.png"
    },
    {
        question: "What is the default alias that Princess Garnet goes by in Final Fantasy IX?", correct: "Dagger", incorrect: ["Dirk",
            "Garnet",
            "Quina"], image: "./assets/images/garnet.jpg"
    },
    {
        question: "What is the name of the main healing item in Dark Souls?", correct: "Estus Flask", incorrect: ["Health Potion",
            "Orange Juice",
            "Ashen Flask"], image: "./assets/images/estus-flask.png"
    },
    {
        question: "In the video game Overwatch, which playable character is infamous for saying 'It's high noon.'?", correct: "McCree", incorrect: ["Hanzo",
            "Pharah",
            "Soldier: 76"], image: "./assets/images/mccree.png"
    },
    {
        question: "The Khajiit are a race of cat-like creatures from which epic series of role-playing games, set across the land of Tamriel?", correct: "The Elder Scrolls", incorrect: ["Lord of the Rings",
            "The Witcher",
            "Neverwinter Nights"], image: "./assets/images/khajiit.jpg"
    },
    {
        question: "What year was the game Dishonored released?", correct: "2012", incorrect: ["2011",
            "2008",
            "2013"], image: "./assets/images/dishonored.jpg"
    },
    {
        question: "In the game 'Hearthstone', what is the best rank possible?", correct: "Rank 1 Legend", incorrect: ["Rank 1 Elite",
            "Rank 1 Master",
            "Rank 1 Supreme"], image: "./assets/images/legend.png"
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
    var $restart = $("<button>").addClass("btn btn-outline-warning btn-block m-2").text("Start Again!");
    var questionTimer;
    var timerInterval;
    var time = 12;

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
        $answerImage.attr("src", questions[index].image).removeClass("mx-auto d-block");
        $answerImage.hide();
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
        time = 12;
    }
    function hideButtons() {
        $firstAnswer.hide();
        $secondAnswer.hide();
        $thirdAnswer.hide();
        $fourthAnswer.hide();
    }

    function newRound() {
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
                rank = "Veteran!";
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
        $timerHolder.empty();
        $restart.show();
        $questionHolder.hide();
        $answerImage.removeClass("mx-auto d-block").hide();
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
        }
    }

    function displayResult(userAnswer) {
        hideButtons();
        $answerImage.addClass("mx-auto d-block").show();
        if (userAnswer) {
            $questionHolder.text("You're correct! " + correctAnswer + " is the right answer!")
        }
        else {
            $questionHolder.text("Not quite! " + correctAnswer + " is the right answer!")
        }
        setTimeout(nextQuestion, 3000);
    }

    function checkAnswer(numAnswer) {
        clearInterval(timerInterval);
        time = 12;
        if (answers[numAnswer] == correctAnswer) {
            numCorrect++;
            userAnswer = true;
        } else {
            numIncorrect++;
            userAnswer = false;
        }
        $timerHolder.empty();
        displayResult(userAnswer);
        
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