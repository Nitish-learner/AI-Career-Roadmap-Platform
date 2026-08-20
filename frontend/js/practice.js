/* =========================================================
   CAREERAI - PRACTICE SYSTEM
========================================================= */


/* ================= GET URL DATA ================= */

const params = new URLSearchParams(window.location.search);

const domain = params.get("domain");
const lessonId = params.get("lesson");

console.log("Practice Domain:", domain);
console.log("Practice Lesson:", lessonId);


/* ================= DOM ELEMENTS ================= */

const questionElement =
    document.getElementById("question");

const optionsContainer =
    document.getElementById("options");

const resultElement =
    document.getElementById("result");

const nextButton =
    document.getElementById("nextQuestion");

const questionCount =
    document.getElementById("questionCount");

const progressBar =
    document.getElementById("progressBar");

const scoreCard =
    document.getElementById("scoreCard");

const finalScore =
    document.getElementById("finalScore");

const backToLesson =
    document.getElementById("backToLesson");

const practiceTitle =
    document.getElementById("practiceTitle");


/* ================= PRACTICE DATA ================= */

let questions = [];

let currentQuestion = 0;

let score = 0;

let answered = false;


/* ================= LOAD QUESTIONS ================= */

function loadPractice() {

    if (
        typeof practiceData === "undefined"
    ) {

        console.error(
            "practiceData not found."
        );

        return;
    }


    if (
        !practiceData[domain] ||
        !practiceData[domain][lessonId]
    ) {

        console.error(
            "Practice questions not found."
        );

        console.log("Domain:", domain);
        console.log("Lesson:", lessonId);

        questionElement.textContent =
            "No practice questions available.";

        return;
    }


    questions =
        practiceData[domain][lessonId];


    if (questions.length === 0) {

        questionElement.textContent =
            "No questions available.";

        return;
    }


    if (practiceTitle) {

        practiceTitle.textContent =
            "Practice: " +
            lessonId
                .replaceAll("-", " ")
                .replace(/\b\w/g, char =>
                    char.toUpperCase()
                );
    }


    showQuestion();
}


/* ================= SHOW QUESTION ================= */

function showQuestion() {

    answered = false;


    const question =
        questions[currentQuestion];


    if (!question) {
        return;
    }


    /* ---------- QUESTION NUMBER ---------- */

    if (questionCount) {

        questionCount.textContent =
            "Question " +
            (currentQuestion + 1) +
            " of " +
            questions.length;
    }


    /* ---------- PROGRESS ---------- */

    if (progressBar) {

        const percentage =
            (
                (currentQuestion + 1) /
                questions.length
            ) * 100;

        progressBar.style.width =
            percentage + "%";
    }


    /* ---------- QUESTION ---------- */

    if (questionElement) {

        questionElement.textContent =
            question.question;
    }


    /* ---------- CLEAR OPTIONS ---------- */

    if (optionsContainer) {

        optionsContainer.innerHTML = "";
    }


    /* ---------- CLEAR RESULT ---------- */

    if (resultElement) {

        resultElement.textContent = "";

        resultElement.style.color = "";
    }


    /* ---------- OPTIONS ---------- */

    question.options.forEach(
        option => {

            const button =
                document.createElement("button");


            button.type = "button";


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


    /* ---------- BUTTON ---------- */

    if (nextButton) {

        nextButton.disabled = true;

        nextButton.style.opacity = "0.5";

        nextButton.textContent =
            currentQuestion ===
            questions.length - 1
                ? "Finish Practice →"
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


    const question =
        questions[currentQuestion];


    const buttons =
        optionsContainer.querySelectorAll(
            "button"
        );


    /* Disable all options */

    buttons.forEach(
        optionButton => {

            optionButton.disabled =
                true;
        }
    );


    /* ================= CORRECT ================= */

    if (
        selectedAnswer ===
        question.answer
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


    /* ================= WRONG ================= */

    else {

        button.classList.add(
            "wrong"
        );


        /* Show correct answer */

        buttons.forEach(
            optionButton => {

                if (
                    optionButton.textContent ===
                    question.answer
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
                question.answer;

            resultElement.style.color =
                "#dc3545";
        }

    }


    /* Enable next */

    if (nextButton) {

        nextButton.disabled =
            false;

        nextButton.style.opacity =
            "1";
    }

}


/* ================= NEXT QUESTION ================= */

if (nextButton) {

    nextButton.addEventListener(
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

                finishPractice();

            }

        }
    );
}


/* ================= FINISH PRACTICE ================= */

function finishPractice() {

    if (!scoreCard) {
        return;
    }


    const percentage =
        Math.round(
            (score / questions.length) *
            100
        );


    /* Hide question */

    const questionCard =
        document.querySelector(
            ".question-card"
        );


    if (questionCard) {

        questionCard.style.display =
            "none";
    }


    /* Show score */

    scoreCard.style.display =
        "block";


    if (finalScore) {

        finalScore.textContent =
            score +
            " / " +
            questions.length +
            " (" +
            percentage +
            "%)";
    }


    console.log(
        "Practice Score:",
        score,
        "/",
        questions.length
    );


    /* ================= SAVE PRACTICE RESULT ================= */

    if (domain && lessonId) {

        localStorage.setItem(
            `practice_${domain}_${lessonId}_score`,
            percentage
        );


        /* ================= COMPLETE LESSON ================= */

        if (percentage >= 60) {

            localStorage.setItem(
                `lesson_${domain}_${lessonId}_completed`,
                "true"
            );

            console.log(
                "Lesson completed:",
                domain,
                lessonId
            );

        } else {

            console.log(
                "Lesson not completed. Score:",
                percentage + "%"
            );
        }
    }

}


/* ================= BACK TO LESSON ================= */

if (backToLesson) {

    backToLesson.addEventListener(
        "click",
        function () {

            window.location.href =
                "lesson.html?domain=" +
                encodeURIComponent(domain) +
                "&lesson=" +
                encodeURIComponent(lessonId);

        }
    );
}


/* ================= START ================= */

loadPractice();