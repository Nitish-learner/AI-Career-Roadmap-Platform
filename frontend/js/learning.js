/* =========================================================
   CAREERAI - LEARNING PAGE
   Clean Learning System
========================================================= */


/* ================= DOM ELEMENTS ================= */

const domainSelector =
    document.getElementById("domainSelector");

const domainName =
    document.getElementById("domainName");

const modulesContainer =
    document.querySelector(".modules-panel");

const progressBox =
    document.querySelector(".progress-box");

const pageTitle =
    document.querySelector(".top-header h1");

const continueButton =
    document.getElementById("continueLearning");


/* ================= MODULE → LESSON ID ================= */

const moduleLessonMap = {

    java: {
        "Programming Fundamentals":
            "programming-fundamentals",

        "Core Java":
            "core-java",

        "SQL & MySQL":
            "sql",

        "HTML, CSS & JavaScript":
            "html-css-js"
    },

    python: {
        "Programming Fundamentals":
            "programming-fundamentals",

        "Python Programming":
            "python-programming",

        "Data Structures":
            "data-structures"
    },

    web: {
        "HTML":
            "html",

        "CSS":
            "css",

        "JavaScript":
            "javascript"
    },

    data: {
    "Excel": "excel",
    "Statistics": "statistics",
    "SQL": "sql",
    "Python for Analytics": "python-for-analytics",
    "Data Visualization": "data-visualization",
    "Power BI": "power-bi",
    "Real-World Projects": "real-world-projects",
    "Career Preparation": "career-preparation"
},

    aiml: {
        "Python Programming":
            "python",

        "Mathematics & Statistics":
            "statistics",

        "Machine Learning":
            "machine-learning"
    },

    cyber: {
        "Computer Fundamentals":
            "computer-fundamentals",

        "Networking":
            "networking",

        "Cyber Security Fundamentals":
            "cyber-security"
    }
};


/* ================= COMPLETION CHECK ================= */

function isLessonCompleted(
    domainKey,
    lessonId
) {

    return localStorage.getItem(
        `lesson_${domainKey}_${lessonId}_completed`
    ) === "true";
}


/* ================= GET DOMAIN LESSONS ================= */

function getDomainLessons(domainKey) {

    if (
        typeof lessonData === "undefined" ||
        !lessonData[domainKey]
    ) {
        return [];
    }

    const lessons = [];

    const data =
        lessonData[domainKey];

    for (const key in data) {

        const item = data[key];

        if (
            item &&
            typeof item === "object" &&
            item.title
        ) {

            lessons.push({
                id: key,
                data: item
            });

        }
    }

    return lessons;
}


/* ================= GET PROGRESS ================= */

function getDomainProgress(domainKey) {

    const lessons =
        getDomainLessons(domainKey);

    if (lessons.length === 0) {
        return 0;
    }

    let completed = 0;

    lessons.forEach(lesson => {

        if (
            isLessonCompleted(
                domainKey,
                lesson.id
            )
        ) {

            completed++;
        }

    });

    return Math.round(
        (completed / lessons.length) * 100
    );
}


/* ================= GET CURRENT LESSON ================= */

function getCurrentLesson(domainKey) {

    const lessons =
        getDomainLessons(domainKey);

    if (lessons.length === 0) {
        return null;
    }

    /* First incomplete lesson */

    const nextLesson =
        lessons.find(
            lesson =>
                !isLessonCompleted(
                    domainKey,
                    lesson.id
                )
        );

    /* If everything is completed,
       return last lesson */

    return (
        nextLesson ||
        lessons[lessons.length - 1]
    );
}


/* ================= OPEN LESSON ================= */

function openLesson(
    domainKey,
    lessonId
) {

    window.location.href =
        "lesson.html?domain=" +
        encodeURIComponent(domainKey) +
        "&lesson=" +
        encodeURIComponent(lessonId);
}


/* ================= LOAD DOMAIN ================= */

function loadDomain(domainKey) {

    const domain =
        learningData[domainKey];

    if (!domain) {
        return;
    }


    /* ================= DOMAIN NAME ================= */

    if (domainName) {

        domainName.textContent =
            domain.name;
    }


    if (pageTitle) {

        pageTitle.textContent =
            domain.name;
    }


    /* ================= PROGRESS ================= */

    const progress =
        getDomainProgress(domainKey);


    const progressText =
        progressBox
            ? progressBox.querySelector("strong")
            : null;


    const progressBar =
        progressBox
            ? progressBox.querySelector(
                ".progress div"
            )
            : null;


    if (progressText) {

        progressText.textContent =
            progress + "%";
    }


    if (progressBar) {

        progressBar.style.width =
            progress + "%";
    }


    /* ================= MODULES ================= */

    renderModules(
        domainKey,
        domain
    );


    /* ================= SAVE DOMAIN ================= */

    localStorage.setItem(
        "selectedDomain",
        domainKey
    );
}


/* ================= RENDER MODULES ================= */

function renderModules(
    domainKey,
    domain
) {

    if (!modulesContainer) {
        return;
    }

    modulesContainer.innerHTML = `

        <div class="panel-header">

            <h2>
                Learning Roadmap
            </h2>

            <span id="moduleCount">
                0 / ${domain.modules.length} completed
            </span>

        </div>

    `;


    let completedModules = 0;


    domain.modules.forEach(
        (module, index) => {

            const lessonId =
                moduleLessonMap[
                    domainKey
                ]?.[
                    module.title
                ];


            /* ================= COMPLETION ================= */

            const completed =
                lessonId
                    ? isLessonCompleted(
                        domainKey,
                        lessonId
                    )
                    : false;


            if (completed) {

                completedModules++;

            }


            /* ================= SEQUENTIAL UNLOCK ================= */

            let unlocked = false;

            if (index === 0) {

                /* First module always unlocked */

                unlocked = true;

            } else {

                const previousModule =
                    domain.modules[index - 1];

                const previousLessonId =
                    moduleLessonMap[
                        domainKey
                    ]?.[
                        previousModule.title
                    ];


                unlocked =
                    previousLessonId
                        ? isLessonCompleted(
                            domainKey,
                            previousLessonId
                        )
                        : false;
            }


            /* ================= STATUS ================= */

            let status = "locked";


            if (completed) {

                status = "completed";

            } else if (
                unlocked &&
                lessonId
            ) {

                status = "current";

            }


            /* ================= MODULE ELEMENT ================= */

            const moduleElement =
                document.createElement("div");


            moduleElement.classList.add(
                "module",
                status
            );


            /* ================= ICON ================= */

            let icon = "🔒";


            if (status === "completed") {

                icon = "✓";

            } else if (status === "current") {

                icon = "→";

            }


            /* ================= HTML ================= */

            moduleElement.innerHTML = `

                <div class="module-number">

                    ${String(index + 1).padStart(2, "0")}

                </div>


                <div class="module-info">

                    <strong>
                        ${module.title}
                    </strong>

                    <small>
                        ${module.subtitle}
                    </small>

                </div>


                <span class="module-status">

                    ${icon}

                </span>

            `;


            /* ================= CLICK ================= */

            if (
                lessonId &&
                unlocked
            ) {

                moduleElement.style.cursor =
                    "pointer";


                moduleElement.addEventListener(
                    "click",
                    function () {

                        openLesson(
                            domainKey,
                            lessonId
                        );

                    }
                );

            } else {

                moduleElement.style.cursor =
                    "not-allowed";
            }


            modulesContainer.appendChild(
                moduleElement
            );

        }
    );


    /* ================= MODULE COUNT ================= */

    const moduleCount =
        document.getElementById(
            "moduleCount"
        );


    if (moduleCount) {

        moduleCount.textContent =
            completedModules +
            " / " +
            domain.modules.length +
            " completed";
    }
}

/* ================= DOMAIN CHANGE ================= */

if (domainSelector) {

    domainSelector.addEventListener(
        "change",
        function () {

            loadDomain(
                this.value
            );

        }
    );
}


/* ================= SAVED DOMAIN ================= */

const savedDomain =
    localStorage.getItem(
        "selectedDomain"
    );


if (
    savedDomain &&
    learningData[savedDomain]
) {

    domainSelector.value =
        savedDomain;

    loadDomain(
        savedDomain
    );

} else {

    loadDomain("java");
}


/* ================= START ================= */
function setupContinueButton() {

    if (!continueButton) {
        return;
    }

    continueButton.addEventListener(
        "click",
        function () {

            const selectedDomain =
                domainSelector
                    ? domainSelector.value
                    : "java";

            const currentLesson =
                getCurrentLesson(selectedDomain);

            if (!currentLesson) {
                alert("No lessons available.");
                return;
            }

            openLesson(
                selectedDomain,
                currentLesson.id
            );
        }
    );
}
setupContinueButton();