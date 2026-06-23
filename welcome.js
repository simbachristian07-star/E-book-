document.addEventListener("DOMContentLoaded", function () {

    const popup = document.createElement("div");
    popup.innerHTML = `
        <div id="overlay">
            <div id="popup">
                <h2>Welcome</h2>

                <input type="text" id="name" placeholder="Enter full name"><br><br>

                <input type="text" id="email" placeholder="Enter email"><br><br>

                <input type="text" id="phone" placeholder="+2547XXXXXXXX"><br><br>

                <select id="gender">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select><br><br>

                <button id="submitBtn">Submit</button>

                <p id="error" style="color:red;"></p>
            </div>
        </div>
    `;

    document.body.appendChild(popup);

    const style = document.createElement("style");
    style.textContent = `
        #overlay{
            position:fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
            background:rgba(0,0,0,0.5);
            display:flex;
            justify-content:center;
            align-items:center;
            z-index:9999;
        }

        #popup{
            background:white;
            padding:20px;
            border-radius:10px;
            text-align:center;
            width:300px;
        }

        #popup input,
        #popup select{
            width:90%;
            padding:8px;
        }

        #popup button{
            padding:8px 20px;
            cursor:pointer;
        }
    `;
    document.head.appendChild(style);

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

        const emailPattern =
            /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$/i;

        if (!emailPattern.test(email)) {
            error.textContent =
                "Email must be Gmail, Yahoo or Outlook.";
            return;
        }

        const phonePattern = /^\+2547\d{8}$/;

        if (!phonePattern.test(phone)) {
            error.textContent =
                "Use format: +2547XXXXXXXX";
            return;
        }

        if (!["Male", "Female", "Other"].includes(gender)) {
            error.textContent = "Select a gender.";
            return;
        }

        alert("Welcome " + name + "!");

        document.getElementById("overlay").remove();
    });

});
