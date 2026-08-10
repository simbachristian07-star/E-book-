// welcome.js - shows the welcome pop-up and checks the sign-in form

window.onload = function () {

    var overlay = document.getElementById("welcome-overlay");
    var closeBtn = document.getElementById("modal-close");
    var form = document.getElementById("signin-form");
    var successMsg = document.getElementById("form-success");

    // show the pop-up when the page loads
    overlay.className = "overlay visible";

    // close button hides the pop-up
    closeBtn.onclick = function () {
        overlay.className = "overlay";
    };

    // check the form when the user clicks "Sign in"
    form.onsubmit = function (event) {
        event.preventDefault();

        var isValid = true;

        var fullname = document.getElementById("fullname").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;

        // full name - just check it is not empty
        if (fullname.trim() === "") {
            document.getElementById("fullname-error").innerHTML = "Please enter your full name.";
            isValid = false;
        } else {
            document.getElementById("fullname-error").innerHTML = "";
        }

        // email - must end in @gmail.com
        var emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (emailPattern.test(email) === false) {
            document.getElementById("email-error").innerHTML = "Please enter a valid email, example: name@gmail.com";
            isValid = false;
        } else {
            document.getElementById("email-error").innerHTML = "";
        }

        // phone - must start with 01 or 07 and have 8 more digits after that
        var phonePattern = /^(01|07)[0-9]{8}$/;
        if (phonePattern.test(phone) === false) {
            document.getElementById("phone-error").innerHTML = "Phone must start with 01 or 07 and have 8 digits after.";
            isValid = false;
        } else {
            document.getElementById("phone-error").innerHTML = "";
        }

        // gender - one option must be picked
        var genderOptions = document.getElementsByName("gender");
        var genderPicked = false;
        for (var i = 0; i < genderOptions.length; i++) {
            if (genderOptions[i].checked === true) {
                genderPicked = true;
            }
        }
        if (genderPicked === false) {
            document.getElementById("gender-error").innerHTML = "Please select an option.";
            isValid = false;
        } else {
            document.getElementById("gender-error").innerHTML = "";
        }

        // if everything is correct, show a success message
        if (isValid === true) {
            successMsg.innerHTML = "Welcome, " + fullname + "! You are signed in.";
            form.reset();
        }
    };

};
