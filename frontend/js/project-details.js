/* =========================================================
   CAREERAI - PROJECT DETAILS SYSTEM
========================================================= */


/* ================= GET SELECTED PROJECT ================= */

const selectedDomain =
    localStorage.getItem("selectedDomain") ||
    "java";


const selectedProjectIndex =
    Number(
        localStorage.getItem("selectedProject") || 0
    );


/* ================= DOM ELEMENTS ================= */

const projectTitle =
    document.getElementById("projectTitle");

const projectDescription =
    document.getElementById("projectDescription");

const projectLevel =
    document.getElementById("projectLevel");

const projectSkills =
    document.getElementById("projectSkills");

const projectSteps =
    document.getElementById("projectSteps");

const completeProjectButton =
    document.getElementById("completeProject");

const backToProjectsButton =
    document.getElementById("backToProjects");


/* ================= LOAD PROJECT ================= */

function loadProjectDetails() {

    if (
        typeof projectsData === "undefined"
    ) {

        console.error(
            "projectsData not found."
        );

        return;
    }


    const domainProjects =
        projectsData[selectedDomain];


    if (
        !domainProjects ||
        !domainProjects[selectedProjectIndex]
    ) {

        console.error(
            "Project not found."
        );

        return;
    }


    const project =
        domainProjects[selectedProjectIndex];


    /* ---------- TITLE ---------- */

    if (projectTitle) {

        projectTitle.textContent =
            project.title;
    }


    /* ---------- DESCRIPTION ---------- */

    if (projectDescription) {

        projectDescription.textContent =
            project.description;
    }


    /* ---------- LEVEL ---------- */

    if (projectLevel) {

        projectLevel.textContent =
            project.level;
    }


    /* ---------- SKILLS ---------- */

    if (projectSkills) {

        projectSkills.textContent =
            project.skills.join(", ");
    }


    /* ---------- PROJECT STEPS ---------- */

    const steps = [

        {
            title: "Plan the Project",
            description:
                "Understand the project requirements and create a development plan."
        },

        {
            title: "Design the Application",
            description:
                "Design the project structure, database and user interface."
        },

        {
            title: "Develop Core Features",
            description:
                "Build the main features using the required technologies."
        },

        {
            title: "Test Your Project",
            description:
                "Test all features and fix errors or bugs."
        },

        {
            title: "Complete and Deploy",
            description:
                "Finalize the project and prepare it for your portfolio."
        }

    ];


    if (projectSteps) {

        projectSteps.innerHTML =
            "";


        steps.forEach(
            (step, index) => {


                const stepItem =
                    document.createElement(
                        "div"
                    );


                stepItem.className =
                    "step-item";


                stepItem.innerHTML = `

                    <div class="step-number">

                        ${index + 1}

                    </div>


                    <div class="step-content">

                        <h3>

                            ${step.title}

                        </h3>

                        <p>

                            ${step.description}

                        </p>

                    </div>

                `;


                projectSteps.appendChild(
                    stepItem
                );

            }
        );

    }


    /* ================= CHECK COMPLETION ================= */

    const completed =
        localStorage.getItem(
            `project_${selectedDomain}_${selectedProjectIndex}_completed`
        );


    if (
        completed === "true" &&
        completeProjectButton
    ) {

        completeProjectButton.textContent =
            "✓ Project Completed";

        completeProjectButton.disabled =
            true;

    }

}


/* ================= COMPLETE PROJECT ================= */

if (completeProjectButton) {

    completeProjectButton.addEventListener(
        "click",
        function () {


            localStorage.setItem(
                `project_${selectedDomain}_${selectedProjectIndex}_completed`,
                "true"
            );


            completeProjectButton.textContent =
                "✓ Project Completed";


            completeProjectButton.disabled =
                true;


            alert(
                "Congratulations! Project marked as completed 🎉"
            );

        }
    );

}


/* ================= BACK TO PROJECTS ================= */

if (backToProjectsButton) {

    backToProjectsButton.addEventListener(
        "click",
        function () {

            window.location.href =
                "projects.html";

        }
    );

}


/* ================= START ================= */

loadProjectDetails();