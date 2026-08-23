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

    const currentModuleNumber =
    document.getElementById("currentModuleNumber");

const currentLessonTitle =
    document.getElementById("currentLessonTitle");

const currentLessonDescription =
    document.getElementById("currentLessonDescription");

    const skillList =
    document.getElementById("skillList");

const skillProgressText =
    document.getElementById("skillProgressText");

const skillProgressBar =
    document.querySelector(".lesson-action .progress div");

const missingSkillsContainer =
    document.getElementById("missingSkillsContainer");

const gapScore =
    document.getElementById("gapScore");

const gapMessage =
    document.getElementById("gapMessage");

/* ================= MODULE → LESSON ID ================= */

const moduleLessonMap = {

    java: {
    "Programming Fundamentals": [
        "programming-fundamentals"
    ],

    "Core Java": [
        "core-java",
        "classes-objects",
        "constructors",
        "inheritance",
        "polymorphism",
        "encapsulation",
        "abstraction"
    ],

    "SQL & MySQL": [
        "sql"
    ],

    "HTML, CSS & JavaScript": [
        "html-css-js"
    ],

    "Spring Boot": [
        "spring-boot"
    ],

    "Full Stack Integration": [
        "full-stack-integration"
    ],

    "Real-World Projects": [
        "real-world-projects"
    ],

    "Career Preparation": [
        "career-preparation"
    ]
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

function loadSkillGaps() {

    if (!missingSkillsContainer) {
        return;
    }

    const missingSkills =
        JSON.parse(
            localStorage.getItem("missingSkills") || "[]"
        );

    const readinessScore =
        Number(
            localStorage.getItem(
                "careerReadinessScore"
            ) || 0
        );

    if (gapScore) {
        gapScore.textContent =
            readinessScore + "%";
    }

    missingSkillsContainer.innerHTML = "";

    if (missingSkills.length === 0) {

        gapMessage.textContent =
            "🎉 Great! You don't have any major skill gaps.";

        return;
    }

    gapMessage.textContent =
        "Focus on these skills to improve your career readiness:";


    /* ================= SKILL → LESSON MAP ================= */

    const skillLessonMap = {

        "Java": "core-java",

        "Core Java": "core-java",

        "OOP": "classes-objects",

        "SQL": "sql",

        "SQL & MySQL": "sql",

        "MySQL": "sql",

        "HTML": "html-css-js",

        "CSS": "html-css-js",

        "JavaScript": "html-css-js",

        "HTML, CSS & JavaScript":
            "html-css-js",

        "Spring Boot": "spring-boot",

        "Full Stack Integration":
            "full-stack-integration",

        "Real-World Projects":
            "real-world-projects",

        "Career Preparation":
            "career-preparation"

    };


    missingSkills.forEach(skill => {

        const skillElement =
            document.createElement("div");

        skillElement.className =
            "missing-skill";

        skillElement.innerHTML = `
            <span>🔴</span>

            <strong>${skill}</strong>

            <button class="gapLearnButton">
                Learn →
            </button>
        `;


        const learnButton =
            skillElement.querySelector(
                ".gapLearnButton"
            );


        learnButton.addEventListener(
            "click",
            function () {

                const lessonId =
                    skillLessonMap[skill];


                if (!lessonId) {

                    alert(
                        "Learning content for this skill is coming soon."
                    );

                    return;
                }


                const selectedDomain =
                    localStorage.getItem(
                        "selectedDomain"
                    ) || "java";


                openLesson(
                    selectedDomain,
                    lessonId
                );

            }
        );


        missingSkillsContainer.appendChild(
            skillElement
        );

    });
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

loadSkillGaps();


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

    /* ================= CURRENT LESSON SKILLS ================= */

    function updateLessonSkills(domainKey, domain) {

        if (!skillList) {
            return;
        }

        const currentLesson =
            getCurrentLesson(domainKey);

        if (!currentLesson) {
            skillList.innerHTML = "";
            return;
        }

        const topics =
            currentLesson.data.topics || [];

        skillList.innerHTML = "";

        let completedCount = 0;

        topics.forEach((topic, index) => {

            const completed =
                isLessonCompleted(
                    domainKey,
                    currentLesson.id
                );

            if (completed) {
                completedCount++;
            }

            const skill =
                document.createElement("div");

            let statusClass = "locked";
            let number =
                String(index + 1).padStart(2, "0");

            if (completed) {

                statusClass = "completed";
                number = "✓";

            } else if (index === 0) {

                statusClass = "current";

            }

            skill.classList.add(
                "skill",
                statusClass
            );

            skill.innerHTML = `

                <span>
                    ${number}
                </span>

                <div>

                    <strong>
                        ${topic}
                    </strong>

                    <small>
                        ${
                            completed
                                ? "Completed"
                                : index === 0
                                    ? "Current skill"
                                    : "Upcoming skill"
                        }
                    </small>

                </div>

            `;

            skillList.appendChild(skill);

        });

        const total =
            topics.length;

        const percentage =
            total === 0
                ? 0
                : Math.round(
                    (completedCount / total) * 100
                );

        if (skillProgressText) {

            skillProgressText.textContent =
                completedCount +
                " of " +
                total +
                " skills completed";
        }

        if (skillProgressBar) {

            skillProgressBar.style.width =
                percentage + "%";
        }
    }


    /* ================= UPDATE CURRENT LESSON ================= */

    updateLessonSkills(
        domainKey,
        domain
    );

    updateCurrentLesson(
        domainKey,
        domain
    );


    /* ================= MODULE CONTAINER ================= */

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


    /* ================= RENDER EACH MODULE ================= */

    domain.modules.forEach(
        (module, index) => {

            const lessonIds =
                moduleLessonMap[
                    domainKey
                ]?.[
                    module.title
                ] || [];


            /* ================= COMPLETION ================= */

            const completed =
                lessonIds.length > 0 &&
                lessonIds.every(
                    lessonId =>
                        isLessonCompleted(
                            domainKey,
                            lessonId
                        )
                );


            if (completed) {

                completedModules++;

            }


            /* ================= SEQUENTIAL UNLOCK ================= */

            let unlocked = false;


            if (index === 0) {

                unlocked = true;

            } else {

                const previousModule =
                    domain.modules[index - 1];

                const previousLessonIds =
                    moduleLessonMap[
                        domainKey
                    ]?.[
                        previousModule.title
                    ] || [];


                unlocked =
                    previousLessonIds.length > 0 &&
                    previousLessonIds.every(
                        lessonId =>
                            isLessonCompleted(
                                domainKey,
                                lessonId
                            )
                    );
            }


            /* ================= STATUS ================= */

            let status = "locked";


            if (completed) {

                status = "completed";

            } else if (
                unlocked &&
                lessonIds.length > 0
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


            /* ================= MODULE HTML ================= */

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
                lessonIds.length > 0 &&
                unlocked
            ) {

                moduleElement.style.cursor =
                    "pointer";


                moduleElement.addEventListener(
                    "click",
                    function () {

                        const firstIncompleteLesson =
                            lessonIds.find(
                                lessonId =>
                                    !isLessonCompleted(
                                        domainKey,
                                        lessonId
                                    )
                            );


                        const lessonToOpen =
                            firstIncompleteLesson ||
                            lessonIds[
                                lessonIds.length - 1
                            ];


                        openLesson(
                            domainKey,
                            lessonToOpen
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

/* ================= CURRENT LESSON ================= */

function updateCurrentLesson(domainKey, domain) {

    const currentLesson =
        getCurrentLesson(domainKey);

    if (!currentLesson) {
        return;
    }

    const currentModuleIndex =
    domain.modules.findIndex(module => {

        const lessonIds =
            moduleLessonMap[domainKey]?.[
                module.title
            ];

        if (!lessonIds) {
            return false;
        }

        const ids = Array.isArray(lessonIds)
            ? lessonIds
            : [lessonIds];

        return ids.includes(
            currentLesson.id
        );
    });


    /* Module Number */

    if (currentModuleNumber) {

        currentModuleNumber.textContent =
            "MODULE " +
            String(
                currentModuleIndex + 1
            ).padStart(2, "0");
    }


    /* Lesson Title */

    if (currentLessonTitle) {

        currentLessonTitle.textContent =
            currentLesson.data.title;
    }


    /* Description */

    if (currentLessonDescription) {

        currentLessonDescription.textContent =
            currentLesson.data.description;
    }

}


setupContinueButton();