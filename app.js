// Navigation buttons
const signinBtn = document.querySelectorAll(".nav-link")[0];
const registerBtn = document.querySelectorAll(".nav-link")[1];
// Sign in and register pages
const signinPage = document.getElementById("signin-page");
const registerPage = document.getElementById("register-page");
// Sign in and register forms
const signinForm = document.querySelectorAll("form")[0];
const registerForm = document.querySelectorAll("form")[1];
// Form inputs
const formInputs = document.querySelectorAll("input");
const infoBox = document.querySelector(".info-box");

// User database
let users = [];

function togglePageShown(page) {
    if (page === "signin") {
        signinBtn.classList.add("active");
        registerBtn.classList.remove("active");
        signinPage.classList.remove("hidden");
        registerPage.classList.add("hidden");
    } else {
        signinBtn.classList.remove("active");
        registerBtn.classList.add("active");
        signinPage.classList.add("hidden");
        registerPage.classList.remove("hidden");
    }
}

function getSigninInput() {
    const emailValue = formInputs[0].value;
    const passwordValue = formInputs[1].value;
    let storedEmail = "";
    let storedPassword = "";
    // Loop through the users array and check if any object there matches the entered credentials
    users.forEach(user => {
        if (emailValue === user.email && passwordValue === user.password) {
            storedEmail = user.email;
            storedPassword = user.password;
        }
    });
    if (emailValue === storedEmail && passwordValue === storedPassword) {
        console.log("logged in");
    } else {
        console.log("not logged in");
    }

}

function getRegisterInput() {
    const nameValue = formInputs[2].value;
    const emailValue = formInputs[3].value;
    const passwordValue = formInputs[4].value;
    const passwordConfirm = formInputs[5].value;
    const newUser = {};
    if (passwordValue === passwordConfirm) {
        // Append details to an object
        newUser.name = nameValue;
        newUser.email = emailValue;
        newUser.password = passwordValue;
        // Push the new user object to the users array
        users.push(newUser);
        updateLocalStorage();
        // Display a green outline box notifying that the account has been created
        infoBox.textContent = "Account created succesfully";
        infoBox.style.border = "2px solid lightgreen";
        infoBox.classList.remove("hidden");
    } else {
        infoBox.classList.remove("hidden");
    }
}

// Save the users array to local storage
function updateLocalStorage() {
    localStorage.setItem("users", JSON.stringify(users));
}

// Update users array from the local storage
function updateUsersArray() {
    users = JSON.parse(localStorage.getItem("users"))
}

// Event listeners
signinBtn.addEventListener("click", () => togglePageShown("signin"));
registerBtn.addEventListener("click", () => togglePageShown("register"));
signinForm.addEventListener("submit", getSigninInput);
registerForm.addEventListener("submit", getRegisterInput);

// Run function on page load
togglePageShown("signin");
updateUsersArray();
