
/* =================================
   CAMPUSPULSE AI - MOBILE NAVIGATION
================================= */

const menuButton = document.getElementById("menu-button");
const navLinks = document.getElementById("nav-links");

// Open and close mobile menu

menuButton.addEventListener("click", function () {

    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuButton.setAttribute("aria-expanded", isOpen);

});

// Close menu after clicking a navigation link

const links = document.querySelectorAll("#nav-links a");

links.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");

    });

});


/* =================================
   CAMPUSPULSE AI - COMPLAINT FORM
================================= */

const complaintForm = document.getElementById("complaint-form");
const formMessage = document.getElementById("form-message");

complaintForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    // Get student details

    const name = document.querySelector(
        'input[placeholder="Enter your name"]'
    ).value.trim();

    const email = document.querySelector(
        'input[placeholder="Enter your email"]'
    ).value.trim();

    const category = document.querySelector("select").value;

    const description = document.querySelector("textarea").value.trim();


    // Validate form fields

    if (!name || !email || !description ||
        category === "Select a category") {

        formMessage.textContent = "Please fill in all the fields.";
        formMessage.style.color = "#ff6b6b";

        return;
    }


    // Validate email address

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        formMessage.textContent = "Please enter a valid email address.";
        formMessage.style.color = "#ff6b6b";

        return;
    }


    // Prevent multiple submissions

    const submitButton = complaintForm.querySelector(
        'button[type="submit"]'
    );

    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    formMessage.textContent = "Submitting your complaint...";
    formMessage.style.color = "#00c8ff";


    try {

        // Send complaint details to n8n Webhook

        const response = await fetch(
            "https://saikarthik09.app.n8n.cloud/webhook/campuspulse-complaint",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    name: name,
                    email: email,
                    category: category,
                    description: description

                })
            }
        );


        // Check server response

        if (!response.ok) {

            throw new Error("Submission failed");

        }


        // Display success message

        formMessage.textContent =
            "Complaint submitted successfully! Our AI system has received your complaint.";

        formMessage.style.color = "#00ff9d";

        // Clear form after successful submission

        complaintForm.reset();


    } catch (error) {

        // Display error message

        formMessage.textContent =
            "Unable to submit your complaint. Please try again.";

        formMessage.style.color = "#ff6b6b";

        console.error("Complaint submission error:", error);

    } finally {

        // Enable submit button again

        submitButton.disabled = false;
        submitButton.textContent = "Submit Complaint";

    }

});
