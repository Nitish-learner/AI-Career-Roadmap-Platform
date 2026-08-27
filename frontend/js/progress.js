/* =========================================================
   CAREERAI - COMMON PROGRESS SYSTEM
========================================================= */


/* ================= MODULE → LESSON MAP ================= */

const moduleLessonMap = {

    /* ================= JAVA ================= */

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


    /* ================= PYTHON ================= */

    python: {

        "Programming Fundamentals": [
            "programming-fundamentals"
        ],

        "Python Programming": [
            "python-programming"
        ],

        "Data Structures": [
            "data-structures"
        ],

        "SQL & Databases": [],

        "Web Development": [],

        "Git & GitHub": [],

        "Real-World Projects": [],

        "Career Preparation": []
    },


    /* ================= WEB DEVELOPMENT ================= */

    web: {

        "HTML": [
            "html"
        ],

        "CSS": [
            "css"
        ],

        "JavaScript": [
            "javascript"
        ],

        "Frontend Framework": [],

        "Backend Development": [],

        "Database": [],

        "Real-World Projects": [],

        "Career Preparation": []
    },


    /* ================= DATA ANALYTICS ================= */

    data: {

        "Excel": [
            "excel"
        ],

        "Statistics": [
            "statistics"
        ],

        "SQL": [
            "sql"
        ],

        "Python for Analytics": [
            "python-for-analytics"
        ],

        "Data Visualization": [],

        "Power BI": [
            "power-bi"
        ],

        "Real-World Projects": [
            "real-world-projects"
        ],

        "Career Preparation": []
    },


    /* ================= AI / ML ================= */

    aiml: {

        "Python Programming": [
            "python"
        ],

        "Mathematics & Statistics": [
            "statistics"
        ],

        "Data Processing": [],

        "Machine Learning": [
            "machine-learning"
        ],

        "Deep Learning": [
            "deep-learning"
        ],

        "Generative AI": [],

        "AI Projects": [],

        "Career Preparation": []
    },


    /* ================= CYBER SECURITY ================= */

    cyber: {

        "Computer Fundamentals": [
            "computer-fundamentals"
        ],

        "Networking": [
            "networking"
        ],

        "Linux": [],

        "Cyber Security Fundamentals": [
            "cyber-security"
        ],

        "Web Security": [],

        "Security Tools": [],

        "Cyber Security Projects": [],

        "Career Preparation": []
    }

};


/* ================= LESSON COMPLETION ================= */

function isLessonCompleted(domainKey, lessonId) {

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

    const domainLessons =
        lessonData[domainKey];

    for (const lessonId in domainLessons) {

        const lesson =
            domainLessons[lessonId];

        if (
            lesson &&
            typeof lesson === "object" &&
            lesson.title
        ) {

            lessons.push({
                id: lessonId,
                data: lesson
            });

        }

    }

    return lessons;
}


/* ================= DOMAIN PROGRESS ================= */

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


/* ================= MODULE LESSONS ================= */

function getModuleLessonIds(
    domainKey,
    moduleTitle
) {

    if (
        !moduleLessonMap[domainKey]
    ) {
        return [];
    }

    const lessonIds =
        moduleLessonMap[domainKey][moduleTitle];

    if (!lessonIds) {
        return [];
    }

    return Array.isArray(lessonIds)
        ? lessonIds
        : [lessonIds];
}


/* ================= MODULE PROGRESS ================= */

function getModuleProgress(
    domainKey,
    moduleTitle
) {

    const lessonIds =
        getModuleLessonIds(
            domainKey,
            moduleTitle
        );

    if (lessonIds.length === 0) {
        return 0;
    }

    let completed = 0;

    lessonIds.forEach(lessonId => {

        if (
            isLessonCompleted(
                domainKey,
                lessonId
            )
        ) {
            completed++;
        }

    });

    return Math.round(
        (completed / lessonIds.length) * 100
    );
}


/* ================= COMPLETED MODULES ================= */

function getCompletedModules(domainKey) {

    if (
        typeof learningData === "undefined" ||
        !learningData[domainKey]
    ) {
        return 0;
    }

    let completedModules = 0;

    learningData[domainKey]
        .modules
        .forEach(module => {

            const progress =
                getModuleProgress(
                    domainKey,
                    module.title
                );

            if (progress === 100) {

                completedModules++;

            }

        });

    return completedModules;
}