const SUPABASE_URL = "https://fqyckjopcymubjokxwcs.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxeWNram9wY3ltd2Jqb2t4d2NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYzODE5NDQsImV4cCI6MjEwMTk1Nzk0NH0.w46whTG31zt2bKAJ-TZYxcZSiOZ7G8fxLvkXDcRNXq0";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

window.onload = function () {

    const overlay = document.getElementById("welcome-overlay");
    const enterBtn = document.getElementById("modal-enter");
    const form = document.getElementById("signin-form");
    const successMsg = document.getElementById("form-success");

    overlay.className = "overlay visible";

    enterBtn.onclick = function () {
        overlay.className = "overlay";
    };

    form.onsubmit = async function (event) {

        event.preventDefault();

        let isValid = true;

        successMsg.innerHTML = "";

        document.getElementById("fullname-error").innerHTML = "";
        document.getElementById("email-error").innerHTML = "";
        document.getElementById("phone-error").innerHTML = "";
        document.getElementById("gender-error").innerHTML = "";

        const fullname = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();

        const genderOptions = document.getElementsByName("gender");

        let chosenGenderValue = "";

        for (let i = 0; i < genderOptions.length; i++) {
            if (genderOptions[i].checked) {
                chosenGenderValue = genderOptions[i].value;
                break;
            }
        }

        if (fullname === "") {
            document.getElementById("fullname-error").innerHTML =
                "Please enter your full name.";
            isValid = false;
        }

        const emailPattern =
            /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook)\.com$/;

        if (!emailPattern.test(email)) {
            document.getElementById("email-error").innerHTML =
                "Please enter a valid Gmail, Yahoo or Outlook email.";
            isValid = false;
        }

        const phonePattern = /^(01|07)[0-9]{8}$/;

        if (!phonePattern.test(phone)) {
            document.getElementById("phone-error").innerHTML =
                "Phone must start with 01 or 07 and contain 10 digits.";
            isValid = false;
        }

        if (chosenGenderValue === "") {
            document.getElementById("gender-error").innerHTML =
                "Please select an option.";
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        try {

            const { data, error } = await supabaseClient
                .from("loginform")
                .insert([
                    {
                        full_name: fullname,
                        email: email,
                        phone: phone,
                        gender: chosenGenderValue
                    }
                ])
                .select();

            if (error) {
                throw error;
            }

            console.log("Inserted data:", data);

            alert("You are signed in! Your details were saved.");

            successMsg.innerHTML =
                "Account successfully registered!";

            form.reset();

        } catch (error) {

            console.error("Supabase Database Error:", error);

            alert("Database saving issue: " + error.message);
        }
    };
};
