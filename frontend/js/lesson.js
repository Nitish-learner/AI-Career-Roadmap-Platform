/* =========================================================
   CAREERAI - LESSON SYSTEM
/* ================= GET URL DATA ================= */

const params = new URLSearchParams(window.location.search);

const domain = params.get("domain");
const lessonId = params.get("lesson");

console.log("Domain:", domain);
console.log("Lesson:", lessonId);

/* ================= DOM ELEMENTS ================= */

const titleElement =
    document.getElementById("lessonTitle");

const descriptionElement =
    document.getElementById("lessonDescription");

const typeElement =
    document.getElementById("lessonType");

const codeElement =
    document.getElementById("codeExample");

const questionElement =
    document.getElementById("question");

const optionsContainer =
    document.getElementById("options");

const quizResult =
    document.getElementById("quizResult");

const completeButton =
    document.getElementById("completeLesson");

const previousLesson =
    document.getElementById("previousLesson");

const nextLesson =
    document.getElementById("nextLesson");

    
const progressNumber =
    document.querySelector(".lesson-progress strong");

const progressBar =
    document.querySelector(
        ".lesson-progress .progress > div"
    );

const sideProgressNumber =
    document.querySelector(".side-progress strong");

const sideProgressBar =
    document.querySelector(
        ".side-progress .progress > div"
    );
    const exampleLanguageElement =
    document.getElementById("exampleLanguage");

/* ================= FIND LESSON ================= */

function findLesson(data, id) {

    if (!data || typeof data !== "object") {
        return null;
    }

    for (const key in data) {

        const item = data[key];

        if (!item || typeof item !== "object") {
            continue;
        }

        /* Actual lesson */

        if (key === id && item.title) {
            return item;
        }

        /* Search nested object */

        const result =
            findLesson(item, id);

        if (result) {
            return result;
        }
    }

    return null;
}


/* ================= CURRENT LESSON ================= */

const lesson =
    domain &&
    lessonId &&
    lessonData[domain]
        ? findLesson(
            lessonData[domain],
            lessonId
        )
        : null;


/* ================= GET ALL LESSONS ================= */

function getAllLessons(data) {

    const lessons = [];

    if (!data || typeof data !== "object") {
        return lessons;
    }

    for (const key in data) {

        const item = data[key];

        if (!item || typeof item !== "object") {
            continue;
        }

        /* Actual lesson */

        if (item.title) {

            lessons.push({
                id: key,
                data: item
            });

        } else {

            /* Category */

            lessons.push(
                ...getAllLessons(item)
            );
        }
    }

    return lessons;
}


/* ================= LOAD LESSON ================= */

function loadLesson() {

    if (!lesson) {

        console.error(
            "Lesson not found"
        );

        console.log("Domain:", domain);
        console.log("Lesson:", lessonId);

        return;
    }


    /* ---------- TITLE ---------- */

    if (titleElement) {

        titleElement.textContent =
            lesson.title;
    }


    /* ---------- DESCRIPTION ---------- */

    if (descriptionElement) {

        descriptionElement.textContent =
            lesson.description;
    }


    /* ---------- TYPE ---------- */

    if (typeElement) {

        typeElement.textContent =
            lesson.type || "LESSON";
    }


    /* ---------- CODE ---------- */

    if (codeElement) {

        codeElement.textContent =
            lesson.code || "";
    }
    /* ---------- EXAMPLE LANGUAGE ---------- */

if (exampleLanguageElement) {

    exampleLanguageElement.textContent =
        lesson.exampleLanguage || "Code";
}

    /* ---------- CODE LANGUAGE ---------- */

const exampleLanguage =
    document.getElementById("exampleLanguage");

if (exampleLanguage) {

    exampleLanguage.textContent =
        lesson.exampleLanguage || "Code";
}


    /* ---------- EXPLANATION ---------- */

    const explanation =
        document.getElementById("explanation");

    if (explanation) {

        explanation.textContent =
            lesson.explanation || "";
    }


    /* ---------- TOPICS ---------- */

    const topics =
        document.getElementById("topics");

    if (topics && lesson.topics) {

        topics.innerHTML = "";

        lesson.topics.forEach(topic => {

            const li =
                document.createElement("li");

            li.textContent = topic;

            topics.appendChild(li);
        });
    }


    /* ---------- QUIZ ---------- */

    loadQuiz();


    /* ---------- PROGRESS ---------- */

    updateProgress();


    /* ---------- COURSE PROGRESS ---------- */

    updateCourseProgress();


    /* ---------- NAVIGATION ---------- */

    setupLessonNavigation();
}




/* ================= LOAD QUIZ ================= */

function loadQuiz() {

    if (!lesson) {
        return;
    }


    if (questionElement) {

        questionElement.textContent =
            lesson.question || "";
    }


    if (!optionsContainer) {
        return;
    }


    optionsContainer.innerHTML = "";


    if (!lesson.options) {
        return;
    }


    lesson.options.forEach(option => {

        const button =
            document.createElement("button");

        button.type = "button";

        button.textContent =
            option;


        button.addEventListener(
            "click",
            function () {

                const correct =
                    option === lesson.answer;

                checkAnswer(
                    button,
                    correct
                );
            }
        );


        optionsContainer.appendChild(
            button
        );
    });
}


/* ================= COPY CODE ================= */

function copyCode() {

    if (!codeElement) {
        return;
    }


    navigator.clipboard
        .writeText(codeElement.innerText)
        .then(() => {

            alert(
                "Code copied successfully!"
            );

        })
        .catch(() => {

            alert(
                "Unable to copy code."
            );
        });
}


/* ================= QUIZ ANSWER ================= */

function checkAnswer(button, correct) {

    if (!button) {
        return;
    }


    /* Only disable buttons of current dynamic quiz */

    if (optionsContainer) {

        const buttons =
            optionsContainer.querySelectorAll(
                "button"
            );

        buttons.forEach(option => {

            option.disabled = true;

        });
    }


    if (correct) {

        button.classList.add("correct");


        if (quizResult) {

            quizResult.textContent =
                "Correct! Well done.";

            quizResult.style.color =
                "#198754";
        }


        unlockCompleteButton();


    } else {

        button.classList.add("wrong");


        if (quizResult) {

            quizResult.textContent =
                "Incorrect. Try reviewing the lesson.";

            quizResult.style.color =
                "#dc3545";
        }


        lockCompleteButton();
    }
}


/* ================= LOCK COMPLETE ================= */

function lockCompleteButton() {

    if (!completeButton) {
        return;
    }


    completeButton.disabled = true;

    completeButton.style.opacity = "0.5";

    completeButton.style.cursor =
        "not-allowed";
}


/* ================= UNLOCK COMPLETE ================= */

function unlockCompleteButton() {

    if (!completeButton) {
        return;
    }


    completeButton.disabled = false;

    completeButton.style.opacity = "1";

    completeButton.style.cursor =
        "pointer";
}


/* ================= COMPLETE LESSON ================= */

function setupCompleteButton() {

    if (!completeButton) {
        return;
    }

    const completed =
        localStorage.getItem(
            `lesson_${domain}_${lessonId}_completed`
        );

    const practiceScore =
        localStorage.getItem(
            `practice_${domain}_${lessonId}_score`
        );

    if (completed === "true") {

        markCompletedUI();

    } else if (practiceScore !== null) {

        unlockCompleteButton();

    } else {

        lockCompleteButton();
    }

 completeButton.addEventListener(
    "click",
    function () {

        if (!domain || !lessonId) {
            return;
        }

        localStorage.setItem(
            `lesson_${domain}_${lessonId}_completed`,
            "true"
        );

        markCompletedUI();

        updateProgress();

        updateCourseProgress();

        setupLessonNavigation();

        alert(
            "Lesson completed! 🎉"
        );
    }
);
}


/* ================= COMPLETED UI ================= */

function markCompletedUI() {

    if (!completeButton) {
        return;
    }


    completeButton.textContent =
        "✓ Lesson Completed";


    completeButton.disabled = true;

    completeButton.style.opacity = "1";

    completeButton.style.cursor =
        "default";

    completeButton.style.background =
        "#198754";
}


/* ================= LESSON PROGRESS ================= */

function updateProgress() {

    if (
        !domain ||
        !lessonId
    ) {
        return;
    }


    const completed =
        localStorage.getItem(
            `lesson_${domain}_${lessonId}_completed`
        );


    if (completed === "true") {

        if (progressNumber) {

            progressNumber.textContent =
                "100%";
        }


        if (progressBar) {

            progressBar.style.width =
                "100%";
        }


        markCompletedUI();

    } else {

        if (progressNumber) {

            progressNumber.textContent =
                "0%";
        }


        if (progressBar) {

            progressBar.style.width =
                "0%";
        }
    }
}


/* ================= COURSE PROGRESS ================= */

function updateCourseProgress() {

    if (!domain) {
        return;
    }


    const domainData =
        lessonData[domain];


    if (!domainData) {
        return;
    }


    const allLessons =
        getAllLessons(domainData);


    if (allLessons.length === 0) {
        return;
    }


    let completedLessons = 0;


    allLessons.forEach(item => {

        const completed =
            localStorage.getItem(
                `lesson_${domain}_${item.id}_completed`
            );


        if (completed === "true") {

            completedLessons++;
        }
    });


    const percentage =
        Math.round(
            (
                completedLessons /
                allLessons.length
            ) * 100
        );


    if (sideProgressNumber) {

        sideProgressNumber.textContent =
            percentage + "%";
    }


    if (sideProgressBar) {

        sideProgressBar.style.width =
            percentage + "%";
    }


    console.log(
        "Course Progress:",
        completedLessons +
        "/" +
        allLessons.length,
        percentage + "%"
    );
}


/* ================= NAVIGATION ================= */

/* ================= NAVIGATION ================= */

function setupLessonNavigation() {

    if (!domain || !lessonId) {
        return;
    }

    const domainData =
        lessonData[domain];

    if (!domainData) {
        return;
    }

    const allLessons =
        getAllLessons(domainData);

    const currentIndex =
        allLessons.findIndex(
            item => item.id === lessonId
        );

    const currentCompleted =
        localStorage.getItem(
            `lesson_${domain}_${lessonId}_completed`
        ) === "true";


    /* ================= PREVIOUS ================= */

    if (previousLesson) {

        if (currentIndex <= 0) {

            previousLesson.disabled = true;
            previousLesson.style.opacity = "0.5";
            previousLesson.style.cursor = "not-allowed";

        } else {

            previousLesson.disabled = false;
            previousLesson.style.opacity = "1";
            previousLesson.style.cursor = "pointer";

            previousLesson.onclick = function () {

                const previousId =
                    allLessons[currentIndex - 1].id;

                openLesson(previousId);
            };
        }
    }


    /* ================= NEXT ================= */

    if (nextLesson) {

        /* No next lesson */

        if (
            currentIndex === -1 ||
            currentIndex >= allLessons.length - 1
        ) {

            nextLesson.disabled = true;
            nextLesson.style.opacity = "0.5";
            nextLesson.style.cursor = "not-allowed";

            return;
        }


        /* Current lesson not completed */

        if (!currentCompleted) {

            nextLesson.disabled = true;
            nextLesson.style.opacity = "0.5";
            nextLesson.style.cursor = "not-allowed";
            nextLesson.textContent =
                "Complete Lesson First →";

            return;
        }


        /* Current lesson completed */

        nextLesson.disabled = false;
        nextLesson.style.opacity = "1";
        nextLesson.style.cursor = "pointer";
        nextLesson.textContent =
            "Next Lesson →";


        nextLesson.onclick = function () {

            const nextId =
                allLessons[currentIndex + 1].id;

            openLesson(nextId);
        };
    }
}

/* ================= OPEN LESSON ================= */

function openLesson(id) {

    window.location.href =
        "lesson.html?domain=" +
        encodeURIComponent(domain) +
        "&lesson=" +
        encodeURIComponent(id);
}


/* ================= START ================= */

loadLesson();

setupCompleteButton();

updateProgress();

updateCourseProgress();

setupLessonNavigation();
/* ================= PRACTICE LESSON ================= */

const practiceLessonButton =
    document.getElementById("practiceLesson");

if (practiceLessonButton) {

    practiceLessonButton.addEventListener(
        "click",
        function () {

            if (!domain || !lessonId) {
                return;
            }

            window.location.href =
                "practice.html?domain=" +
                encodeURIComponent(domain) +
                "&lesson=" +
                encodeURIComponent(lessonId);
        }
    );
}