/* =========================================================
CAREERAI - ASSESSMENT SYSTEM
========================================================= */

/* ================= URL / DOMAIN ================= */

const params =
new URLSearchParams(
window.location.search
);

const selectedDomain =
params.get("domain") ||
localStorage.getItem("selectedDomain") ||
"java";

/* ================= DOM ELEMENTS ================= */

const assessmentTitle =
document.getElementById("assessmentTitle");

const assessmentDescription =
document.getElementById(
"assessmentDescription"
);

const questionCount =
document.getElementById("questionCount");

const startCard =
document.getElementById("startCard");

const startAssessmentButton =
document.getElementById(
"startAssessment"
);

const questionCard =
document.getElementById("questionCard");

const questionNumber =
document.getElementById("questionNumber");

const progressText =
document.getElementById("progressText");

const progressBar =
document.getElementById("progressBar");

const questionElement =
document.getElementById("question");

const optionsContainer =
document.getElementById("options");

const resultElement =
document.getElementById("result");

const nextQuestionButton =
document.getElementById("nextQuestion");

const scoreCard =
document.getElementById("resultCard");

const finalScore =
document.getElementById("finalScore");

const resultMessage =
document.getElementById("resultMessage");

const retryAssessment =
document.getElementById("retryAssessment");

const backToLearning =
document.getElementById("backToLearning");

/* ================= ASSESSMENT VARIABLES ================= */

let questions = [];

let currentQuestion = 0;

let score = 0;

let answered = false;

/* ================= LOAD ASSESSMENT ================= */

function loadAssessment() {

if (
    typeof assessmentData === "undefined"
) {

    console.error(
        "assessmentData not found."
    );

    return;
}


const assessment =
    assessmentData[selectedDomain];


if (!assessment) {

    console.error(
        "Assessment not found for domain:",
        selectedDomain
    );

    return;
}


questions =
    assessment.questions || [];


/* Title */

if (assessmentTitle) {

    assessmentTitle.textContent =
        assessment.title;
}


/* Description */

if (assessmentDescription) {

    assessmentDescription.textContent =
        assessment.description;
}


/* Question Count */

if (questionCount) {

    questionCount.textContent =
        questions.length +
        " Questions";
}


}

/* ================= START ASSESSMENT ================= */

if (startAssessmentButton) {


startAssessmentButton.addEventListener(
    "click",
    function () {

        if (questions.length === 0) {

            alert(
                "No assessment questions available."
            );

            return;
        }


        startCard.style.display =
            "none";


        questionCard.style.display =
            "block";


        currentQuestion = 0;

        score = 0;

        showQuestion();

    }
);

}

/* ================= SHOW QUESTION ================= */

function showQuestion() {

answered = false;


const current =
    questions[currentQuestion];


if (!current) {
    return;
}


/* Question Number */

if (questionNumber) {

    questionNumber.textContent =
        "Question " +
        (currentQuestion + 1);
}


/* Progress Text */

if (progressText) {

    progressText.textContent =
        (currentQuestion + 1) +
        " / " +
        questions.length;
}


/* Progress Bar */

if (progressBar) {

    const percentage =
        (
            (currentQuestion + 1) /
            questions.length
        ) * 100;


    progressBar.style.width =
        percentage + "%";
}


/* Question */

if (questionElement) {

    questionElement.textContent =
        current.question;
}


/* Clear Options */

if (optionsContainer) {

    optionsContainer.innerHTML = "";
}


/* Clear Result */

if (resultElement) {

    resultElement.textContent = "";

    resultElement.style.color = "";
}


/* Create Options */

current.options.forEach(
    option => {

        const button =
            document.createElement(
                "button"
            );


        button.type =
            "button";


        button.textContent =
            option;


        button.addEventListener(
            "click",
            function () {

                checkAnswer(
                    button,
                    option
                );
            }
        );


        optionsContainer.appendChild(
            button
        );

    }
);


/* Next Button */

if (nextQuestionButton) {

    nextQuestionButton.disabled =
        true;


    nextQuestionButton.textContent =
        currentQuestion ===
        questions.length - 1
            ? "Finish Assessment →"
            : "Next Question →";
}

}

/* ================= CHECK ANSWER ================= */

function checkAnswer(
button,
selectedAnswer
) {

if (answered) {
    return;
}


answered = true;


const current =
    questions[currentQuestion];


const buttons =
    optionsContainer.querySelectorAll(
        "button"
    );


/* Disable All Options */

buttons.forEach(
    optionButton => {

        optionButton.disabled =
            true;
    }
);


/* Correct Answer */

if (
    selectedAnswer ===
    current.answer
) {

    button.classList.add(
        "correct"
    );


    score++;


    if (resultElement) {

        resultElement.textContent =
            "✓ Correct! Well done.";

        resultElement.style.color =
            "#198754";
    }

}


/* Wrong Answer */

else {

    button.classList.add(
        "wrong"
    );


    buttons.forEach(
        optionButton => {

            if (
                optionButton.textContent ===
                current.answer
            ) {

                optionButton.classList.add(
                    "correct"
                );
            }

        }
    );


    if (resultElement) {

        resultElement.textContent =
            "✗ Incorrect. Correct answer: " +
            current.answer;

        resultElement.style.color =
            "#dc3545";
    }

}


/* Enable Next */

if (nextQuestionButton) {

    nextQuestionButton.disabled =
        false;
}


}

/* ================= NEXT QUESTION ================= */

if (nextQuestionButton) {

nextQuestionButton.addEventListener(
    "click",
    function () {

        if (!answered) {
            return;
        }


        if (
            currentQuestion <
            questions.length - 1
        ) {

            currentQuestion++;

            showQuestion();

        } else {

            finishAssessment();

        }

    }
);

}

/* ================= FINISH ASSESSMENT ================= */

function finishAssessment() {

const percentage =
    Math.round(
        (
            score /
            questions.length
        ) * 100
    );


/* Hide Question Card */

questionCard.style.display =
    "none";


/* Show Result */

scoreCard.style.display =
    "block";


/* Final Score */

if (finalScore) {

    finalScore.textContent =
        percentage + "%";
}


/* Result Message */

if (resultMessage) {

    if (percentage >= 60) {

        resultMessage.textContent =
            "🎉 Congratulations! You passed the assessment.";

    } else {

        resultMessage.textContent =
            "Keep practicing and try again.";
    }

}


/* ================= SAVE RESULT ================= */

localStorage.setItem(
    `assessment_${selectedDomain}_score`,
    percentage
);


localStorage.setItem(
    `assessment_${selectedDomain}_completed`,
    percentage >= 60
        ? "true"
        : "false"
);


console.log(
    "Assessment Score:",
    percentage + "%"
);

}

/* ================= RETRY ================= */

if (retryAssessment) {

retryAssessment.addEventListener(
    "click",
    function () {

        currentQuestion = 0;

        score = 0;

        answered = false;


        scoreCard.style.display =
            "none";


        startCard.style.display =
            "block";

    }
);

}

/* ================= BACK TO LEARNING ================= */

if (backToLearning) {

backToLearning.addEventListener(
    "click",
    function () {

        window.location.href =
            "learning.html";

    }
);

}

/* ================= START ================= */

loadAssessment();
