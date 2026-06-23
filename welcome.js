document.addEventListener("DOMContentLoaded", function () {

    alert(
        "WELCOME!\n\n" +
        "Welcome to our ePub website.\n\n" +
        "The largest library you will ever need at the click of a button."
    );

    const formHTML = `
    <div id="overlay">
        <div id="popup">

            <h2>Welcome</h2>

            <input type="text" id="name" placeholder="Full Name">
            <input type="text" id="email" placeholder="Email">
            <input type="text" id="phone" placeholder="+2547XXXXXXXX">

            <select id="gender">
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
                <option>Rather Not Say</option>
            </select>

            <button id="submitBtn">Enter Library</button>

            <p id="error"></p>

        </div>
    </div>
    `;

    document.body.insertAdjacentHTML("beforeend", formHTML);

    document.getElementById("submitBtn").addEventListener("click", function () {

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const gender = document.getElementById("gender").value;
        const error = document.getElementById("error");

        error.textContent = "";

        if (name.split(/\s+/).length < 2) {
            error.textContent = "Enter at least two names.";
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$/i;
        if (!emailRegex.test(email)) {
            error.textContent = "Invalid email domain.";
            return;
        }

        const phoneRegex = /^\+2547\d{8}$/;
        if (!phoneRegex.test(phone)) {
            error.textContent = "Invalid Kenyan number format.";
            return;
        }

        if (!["Male", "Female", "Other", "Rather Not Say"].includes(gender)) {
            error.textContent = "Select a valid gender.";
            return;
        }

        alert("Welcome " + name + "!");
        document.getElementById("overlay").remove();
    });
});
