/* =========================================================
   CAREERAI - PROJECTS SYSTEM
========================================================= */


/* ================= GET DOMAIN ================= */

const selectedDomain =
    localStorage.getItem("selectedDomain") ||
    "java";


/* ================= DOM ELEMENTS ================= */

const projectsContainer =
    document.getElementById("projectsGrid");

const projectProgressText =
    document.getElementById("projectProgressText");

const projectProgressBar =
    document.getElementById("projectProgressBar");


/* ================= LOAD PROJECTS ================= */

function loadProjects() {

    if (typeof projectsData === "undefined") {

        console.error(
            "projectsData not found."
        );

        return;

    }


    const projects =
        projectsData[selectedDomain];


    if (!projects) {

        if (projectsContainer) {

            projectsContainer.innerHTML =
                "<p>No projects available.</p>";

        }

        return;

    }


    if (!projectsContainer) {

        console.error(
            "Projects container not found."
        );

        return;

    }


    /* ================= COUNT COMPLETED ================= */

    let completedProjects = 0;


    projects.forEach(
        (project, index) => {

            const completed =
                localStorage.getItem(
                    `project_${selectedDomain}_${index}_completed`
                );


            if (completed === "true") {

                completedProjects++;

            }

        }
    );


    /* ================= UPDATE PROGRESS TEXT ================= */

    if (projectProgressText) {

        projectProgressText.textContent =
            `${completedProjects} / ${projects.length} Completed`;

    }


    /* ================= UPDATE PROGRESS BAR ================= */

    const progressPercentage =
        projects.length === 0
            ? 0
            : Math.round(
                (
                    completedProjects /
                    projects.length
                ) * 100
            );


    if (projectProgressBar) {

        projectProgressBar.style.width =
            progressPercentage + "%";

    }


    /* ================= CLEAR PROJECTS ================= */

    projectsContainer.innerHTML =
        "";


    /* ================= CREATE PROJECT CARDS ================= */

    projects.forEach(
        (project, index) => {


            const completed =
                localStorage.getItem(
                    `project_${selectedDomain}_${index}_completed`
                ) === "true";


            const projectCard =
                document.createElement(
                    "div"
                );


            projectCard.className =
                "project-card";


            projectCard.innerHTML = `

                <div class="project-icon">

                    ${project.icon || "💻"}

                </div>


                <span class="project-level">

                    ${project.level}

                </span>


                <h2>

                    ${project.title}

                </h2>


                <p>

                    ${project.description}

                </p>


                <div class="project-skills">

                    ${project.skills
                        .map(
                            skill =>
                                `<span>${skill}</span>`
                        )
                        .join("")
                    }

                </div>


                <button
                    class="start-project"
                    data-project="${index}"
                >

                    ${
                        completed
                            ? "✓ Completed"
                            : "Start Project →"
                    }

                </button>

            `;


            projectsContainer.appendChild(
                projectCard
            );

        }
    );


    /* ================= SETUP BUTTONS ================= */

    setupProjectButtons();

}


/* ================= PROJECT BUTTONS ================= */

function setupProjectButtons() {

    const buttons =
        document.querySelectorAll(
            ".start-project"
        );


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                function () {


                    const projectIndex =
                        button.dataset.project;


                    localStorage.setItem(
                        "selectedProject",
                        projectIndex
                    );


                    window.location.href =
                        "project-details.html";

                }
            );

        }
    );

}


/* ================= START ================= */

loadProjects();