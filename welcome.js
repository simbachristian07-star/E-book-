document.addEventListener("DOMContentLoaded", function () {

    // Welcome popup
    alert("Welcome!");

    // Create form popup
    const formHTML = `
    <div id="overlay" style="
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.5);
        display:flex;
        justify-content:center;
        align-items:center;
        z-index:9999;">

        <div style="
            background:white;
            padding:20px;
            border-radius:10px;
            width:350px;
            text-align:center;">

            <h2>User Information</h2>

            <input type="text" id="name" placeholder="Full Name">
            <br><br>

            <input type="text" id="email" placeholder="Email">
            <br><br>

            <input type="text" id="phone" placeholder="07XXXXXXXX">
            <br><br>

            <select id="gender">
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
                <option>Rather Not Say</option>
            </select>
            <br><br>

            <button id="submitBtn">Submit</button>

            <p id="error" style="color:red;"></p>

        </div>
    </div>
    `;

    document.body.insertAdjacentHTML("beforeend", formHTML);

    document
        .getElementById("submitBtn")
        .addEventListener("click", function () {

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const gender = document.getElementById("gender").value;
            const error = document.getElementById("error");

            error.textContent = "";

            // Name validation
            if (name.split(/\s+/).length < 2) {
                error.textContent =
                    "Please enter at least two names.";
                return;
            }

            // Email validation
            const emailRegex =
                /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$/i;

            if (!emailRegex.test(email)) {
                error.textContent =
                    "Email must be @gmail.com, @yahoo.com, or @outlook.com";
                return;
            }

            // Phone validation
            const phoneRegex = /^07\d{8}$/;

            if (!phoneRegex.test(phone)) {
                error.textContent =
                    "Phone number must be 07XXXXXXXX";
                return;
            }

            // Gender validation
            if (
                !["Male", "Female", "Other", "Rather Not Say"]
                    .includes(gender)
            ) {
                error.textContent =
                    "Please select a gender.";
                return;
            }

            alert("Welcome, " + name + "!");

            document.getElementById("overlay").remove();
        });
});
