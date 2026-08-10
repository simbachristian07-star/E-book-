const SUPABASE_URL = "https://fqyckjopcymubjokxwcs.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxeWNram9wY3ltdWJqb2t4d2NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYzODE5NDQsImV4cCI6MjEwMTk1Nzk0NH0.w46whTG31zt2bKAJ-TZYxcZSiOZ7G8fxLvkXDcRNXq0";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.onload = function () {

    var overlay = document.getElementById("welcome-overlay");
    var enterBtn = document.getElementById("modal-enter");
    var form = document.getElementById("signin-form");
    var successMsg = document.getElementById("form-success");

    
    overlay.className = "overlay visible";

   
    enterBtn.onclick = function () {
        overlay.className = "overlay";
    };

   
    form.onsubmit = async function (event) {
       
        event.preventDefault(); 

        var isValid = true;
        successMsg.innerHTML = ""; 

        var fullname = document.getElementById("fullname").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;

       
        if (fullname.trim() === "") {
            document.getElementById("fullname-error").innerHTML = "Please enter your full name.";
            isValid = false;
        } else {
            document.getElementById("fullname-error").innerHTML = "";
        }

        
        var emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (emailPattern.test(email) === false) {
            document.getElementById("email-error").innerHTML = "Please enter a valid email, example: name@gmail.com";
            isValid = false;
        } else {
            document.getElementById("email-error").innerHTML = "";
        }

        
        var phonePattern = /^(01|07)[0-9]{8}$/;
        if (phonePattern.test(phone) === false) {
            document.getElementById("phone-error").innerHTML = "Phone must start with 01 or 07 and have 8 digits after.";
            isValid = false;
        } else {
            document.getElementById("phone-error").innerHTML = "";
        }

        
        var genderOptions = document.getElementsByName("gender");
        var genderPicked = false;
        var chosenGenderValue = "";
        
        for (var i = 0; i < genderOptions.length; i++) {
            if (genderOptions[i].checked === true) {
                genderPicked = true;
                chosenGenderValue = genderOptions[i].value;
            }
        }
        if (genderPicked === false) {
            document.getElementById("gender-error").innerHTML = "Please select an option.";
            isValid = false;
        } else {
            document.getElementById("gender-error").innerHTML = "";
        }

        
        if (isValid === true) {
            try {
                
                const { data, error } = await supabase
                    .from('users') 
                    .insert([
                        { 
                            full_name: fullname, 
                            email: email, 
                            phone_number: phone,
                            gender: chosenGenderValue 
                        }
                    ]);

                if (error) {
                    throw error;
                }

                
                alert("You are signed in! Your details were saved.");
                successMsg.innerHTML = "Account successfully registered!";
                form.reset(); 

            } catch (error) {
                console.error("Supabase Database Error:", error.message);
                alert("Database saving issue: " + error.message);
            }
        }
    };
};
