const API_URL = "http://localhost:5000/api/applications";

// Temporary test user
// Baad me isko CareerAI ke actual logged-in user se connect karenge.
const storedUser = localStorage.getItem("careerAIUser");

if (!storedUser) {
    alert("Please login first.");
    window.location.href = "login.html";
}

const user = JSON.parse(storedUser);
const userId = user.id;

let currentApplications = [];

const applicationForm = document.getElementById("applicationForm");
const applicationsList = document.getElementById("applicationsList");

const totalApplications = document.getElementById("totalApplications");
const interviewCount = document.getElementById("interviewCount");
const selectedCount = document.getElementById("selectedCount");

const refreshBtn = document.getElementById("refreshBtn");


// Load applications
async function loadApplications() {
    try {
        applicationsList.innerHTML = `
            <div class="empty-state">
                Loading applications...
            </div>
        `;

        const response = await fetch(`${API_URL}/${userId}`);

        if (!response.ok) {
            throw new Error("Failed to fetch applications");
        }

        const applications = await response.json();
        currentApplications = applications;

        displayApplications(applications);
        updateStats(applications);

    } catch (error) {
        console.error("Error:", error);

        applicationsList.innerHTML = `
            <div class="empty-state">
                ❌ Unable to load applications.
                <br>
                Make sure the CareerAI backend is running.
            </div>
        `;
    }
}


// Display applications
function displayApplications(applications) {

    if (applications.length === 0) {

        applicationsList.innerHTML = `
            <div class="empty-state">
                📋 No applications added yet.
                <br>
                Add your first job application above.
            </div>
        `;

        return;
    }


    applicationsList.innerHTML = applications.map(application => {

        const statusClass =
            "status-" +
            application.status.toLowerCase().replace(/\s+/g, "-");

        return `
            <div class="application-card">

                <div class="application-top">

                    <div>
                        <div class="company-name">
                            ${escapeHTML(application.company_name)}
                        </div>

                        <div class="job-role">
                            ${escapeHTML(application.job_role)}
                        </div>
                    </div>

                    <span class="status ${statusClass}">
                        ${escapeHTML(application.status)}
                    </span>

                </div>


                <div class="application-details">

                    ${
                        application.applied_date
                            ? `<span>📅 ${formatDate(application.applied_date)}</span>`
                            : ""
                    }

                    ${
                        application.job_link
                            ? `
                                <a
                                    href="${escapeAttribute(application.job_link)}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    🔗 View Job
                                </a>
                            `
                            : ""
                    }

                </div>


                ${
                    application.notes
                        ? `
                            <div class="notes">
                                📝 ${escapeHTML(application.notes)}
                            </div>
                        `
                        : ""
                }


                <div class="application-actions">

    <button
        class="edit-btn"
        onclick="editApplication(${application.id})"
    >
        ✏️ Edit
    </button>

    <button
        class="delete-btn"
        onclick="deleteApplication(${application.id})"
    >
        🗑️ Delete
    </button>

</div>

            </div>
        `;

    }).join("");
}


// Add application
applicationForm.addEventListener("submit", async function(event) {

    event.preventDefault();


    const applicationData = {

        user_id: userId,

        company_name:
            document.getElementById("companyName").value.trim(),

        job_role:
            document.getElementById("jobRole").value.trim(),

        job_link:
            document.getElementById("jobLink").value.trim(),

        applied_date:
            document.getElementById("appliedDate").value,

        status:
            document.getElementById("status").value,

        notes:
            document.getElementById("notes").value.trim()
    };


    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(applicationData)
        });


        const result = await response.json();


        if (!response.ok) {
            throw new Error(
                result.message || "Failed to add application"
            );
        }


        alert("✅ Application added successfully!");


        applicationForm.reset();


        loadApplications();


    } catch (error) {

        console.error("Error:", error);

        alert(
            "❌ Failed to add application. " +
            "Please make sure the backend is running."
        );
    }

});


function editApplication(applicationId) {

    const application = currentApplications.find(
        app => app.id === applicationId
    );

    if (!application) {
        alert("Application not found.");
        return;
    }

    document.getElementById("editApplicationId").value =
        application.id;

    document.getElementById("editCompanyName").value =
        application.company_name || "";

    document.getElementById("editJobRole").value =
        application.job_role || "";

    document.getElementById("editJobLink").value =
        application.job_link || "";

    document.getElementById("editAppliedDate").value =
        application.applied_date
            ? application.applied_date.substring(0, 10)
            : "";

    document.getElementById("editStatus").value =
        application.status || "Applied";

    document.getElementById("editNotes").value =
        application.notes || "";

    document.getElementById("editModal")
        .classList.remove("hidden");
}


// Delete application
async function deleteApplication(applicationId) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this application?"
    );


    if (!confirmDelete) {
        return;
    }


    try {

        const response = await fetch(
    `${API_URL}/${applicationId}?user_id=${userId}`,
    {
        method: "DELETE"
    }
);


        const result = await response.json();


        if (!response.ok) {
            throw new Error(
                result.message || "Failed to delete application"
            );
        }


        alert("✅ Application deleted successfully!");


        loadApplications();


    } catch (error) {

        console.error("Error:", error);

        alert("❌ Failed to delete application.");
    }

}


// Update statistics
function updateStats(applications) {

    totalApplications.textContent =
        applications.length;


    interviewCount.textContent =
        applications.filter(
            app => app.status === "Interview"
        ).length;


    selectedCount.textContent =
        applications.filter(
            app => app.status === "Selected"
        ).length;
}


// Format date
function formatDate(dateString) {

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return dateString;
    }

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}


// Basic HTML protection
function escapeHTML(value) {

    if (!value) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// Protect URL attribute
function escapeAttribute(value) {

    if (!value) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}


// Refresh button
refreshBtn.addEventListener("click", loadApplications);


// Load applications when page opens
loadApplications();
const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");

const closeModalBtn =
    document.getElementById("closeModalBtn");

const cancelEditBtn =
    document.getElementById("cancelEditBtn");


function closeEditModal() {
    editModal.classList.add("hidden");
}


closeModalBtn.addEventListener(
    "click",
    closeEditModal
);

cancelEditBtn.addEventListener(
    "click",
    closeEditModal
);


editModal.addEventListener("click", function(event) {

    if (event.target === editModal) {
        closeEditModal();
    }

});


editForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const applicationId =
        document.getElementById("editApplicationId").value;

  const updatedApplication = {

    user_id: userId,

    company_name:
        document.getElementById("editCompanyName").value.trim(),

    job_role:
        document.getElementById("editJobRole").value.trim(),

    job_link:
        document.getElementById("editJobLink").value.trim(),

    applied_date:
        document.getElementById("editAppliedDate").value,

    status:
        document.getElementById("editStatus").value,

    notes:
        document.getElementById("editNotes").value.trim()
};


    try {

        const response = await fetch(
            `${API_URL}/${applicationId}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(updatedApplication)
            }
        );


        const result = await response.json();


        if (!response.ok) {
            throw new Error(
                result.message || "Failed to update application"
            );
        }


        alert("✅ Application updated successfully!");

        closeEditModal();

        loadApplications();


    } catch (error) {

        console.error("Error:", error);

        alert(
            "❌ Failed to update application."
        );

    }

});