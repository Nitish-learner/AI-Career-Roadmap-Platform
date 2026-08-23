document.addEventListener("DOMContentLoaded", function () {

    // 1. Selected domain pehle nikalo
    const selectedDomain =
        localStorage.getItem("selectedDomain") || "java";

    console.log("Selected Domain:", selectedDomain);
    console.log("Career Data:", careerRequirements);

    // 2. Career data
    const career =
        careerRequirements[selectedDomain] || careerRequirements.java;

    // 3. Career name show karo
    document.getElementById("careerName").textContent = career.name;

    // 4. Skills container
    const skillsContainer =
        document.getElementById("skillsContainer");

    // 5. Skills show karo
    career.skills.forEach((skill) => {

        const skillHTML = `
            <div class="skill-card">

                <div class="skill-info">
                    <h3>${skill.name}</h3>
                    <p>Required Level: ${skill.requiredLevel}</p>
                </div>

                <div class="skill-level">

                    <select class="skillSelect"
                            data-skill="${skill.name}">

                        <option value="0">Not Started</option>
                        <option value="1">Beginner</option>
                        <option value="2">Intermediate</option>
                        <option value="3">Advanced</option>

                    </select>

                </div>

            </div>
        `;

        skillsContainer.innerHTML += skillHTML;
    });


    // 6. Start Learning button
    document.getElementById("startLearningBtn")
        .addEventListener("click", function () {

            localStorage.setItem(
                "selectedDomain",
                selectedDomain
            );

            window.location.href = "learning.html";
        });


    // 7. Analyze button
    document.getElementById("analyzeBtn")
        .addEventListener("click", function () {

            let totalScore = 0;
            let totalWeight = 0;

            const results = [];

            document.querySelectorAll(".skillSelect")
                .forEach((select) => {

                    const skillName = select.dataset.skill;
                    const userLevel = Number(select.value);

                    const skillData = career.skills.find(
                        skill => skill.name === skillName
                    );

                    totalWeight += skillData.weight;

                    let requiredLevelNumber;

                    if (skillData.requiredLevel === "Beginner") {
                        requiredLevelNumber = 1;
                    } else if (
                        skillData.requiredLevel === "Intermediate"
                    ) {
                        requiredLevelNumber = 2;
                    } else {
                        requiredLevelNumber = 3;
                    }

                    const skillScore =
                        Math.min(
                            userLevel / requiredLevelNumber,
                            1
                        ) * skillData.weight;

                    totalScore += skillScore;

                    results.push({
                        name: skillName,
                        userLevel: userLevel,
                        requiredLevel: requiredLevelNumber,
                        score:
                            (userLevel / requiredLevelNumber) * 100
                    });

                });


            // 8. Final readiness score
            const readinessScore = Math.round(
                (totalScore / totalWeight) * 100
            );


            // 9. Missing skills
            const missingSkills = results
                .filter(
                    skill =>
                        skill.userLevel < skill.requiredLevel
                )
                .map(skill => skill.name);


            // 10. LocalStorage
            localStorage.setItem(
                "missingSkills",
                JSON.stringify(missingSkills)
            );

            localStorage.setItem(
                "careerReadinessScore",
                readinessScore
            );


            console.log(
                "Career Readiness Score:",
                readinessScore
            );

            console.log(
                "Skill Results:",
                results
            );


            // 11. Result section
            const resultSection =
                document.getElementById("resultSection");

            const readinessScoreElement =
                document.getElementById("readinessScore");

            const scoreMessage =
                document.getElementById("scoreMessage");


            readinessScoreElement.textContent =
                readinessScore + "%";


            if (readinessScore >= 80) {

                scoreMessage.textContent =
                    "Excellent! You are almost job-ready 🚀";

            } else if (readinessScore >= 60) {

                scoreMessage.textContent =
                    "Good progress! Keep improving your skills 💪";

            } else if (readinessScore >= 40) {

                scoreMessage.textContent =
                    "You are making progress. Focus on your skill gaps 📚";

            } else {

                scoreMessage.textContent =
                    "Start learning and build your skills step by step 🌱";
            }


            resultSection.style.display = "block";


            // 12. Skill results
            const skillResultsContainer =
                document.getElementById("skillResults");

            skillResultsContainer.innerHTML = "";


            results.forEach((skill) => {

                let status = "";
                let message = "";

                if (
                    skill.userLevel >=
                    skill.requiredLevel
                ) {

                    status = "🟢 Strong";
                    message = "Good";

                } else if (skill.userLevel > 0) {

                    status = "🟡 Needs Improvement";
                    message = "Improve this skill";

                } else {

                    status = "🔴 Skill Gap";
                    message = "Start learning";
                }


                const skillHTML = `
                    <div class="skill-result-card">

                        <div>
                            <h3>${skill.name}</h3>
                            <p>
                                Required Level:
                                ${skill.requiredLevel}
                            </p>
                            <p>
                                Your Level:
                                ${skill.userLevel}
                            </p>
                        </div>

                        <div>
                            <strong>${status}</strong>
                            <p>${message}</p>
                        </div>

                    </div>
                `;

                skillResultsContainer.innerHTML += skillHTML;
            });

        });

});