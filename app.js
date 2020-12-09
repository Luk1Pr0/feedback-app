// Navigation buttons
const signinBtn = document.querySelectorAll(".nav-link")[0];
const registerBtn = document.querySelectorAll(".nav-link")[1];
const logoutBtn = document.querySelector(".logout-btn");
// Sign in and register pages
const signinPage = document.getElementById("signin-page");
const registerPage = document.getElementById("register-page");
const contentPage = document.querySelector(".content-container");
// Sign in and register forms
const signinForm = document.getElementById("signin-form");
const registerForm = document.getElementById("register-form");
// Form inputs
const formInputs = document.querySelectorAll("input");
const infoBox1 = document.querySelectorAll(".info-box")[0];
const infoBox2 = document.querySelectorAll(".info-box")[1];

let allUsers = [];

function logoutUser() {
    contentPage.classList.add("hidden");
    logoutBtn.classList.add("hidden");
    registerBtn.classList.remove("hidden");
    signinBtn.classList.remove("hidden");
    togglePageShown("signin");
}

// Display the content page after succesfull log in
function displayContentPage() {
    contentPage.classList.remove("hidden");
    signinPage.classList.add("hidden");
    registerPage.classList.add("hidden");
    signinBtn.classList.add("hidden")
    registerBtn.classList.add("hidden")
    logoutBtn.classList.remove("hidden");
}

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

function getSigninValues(e) {
    e.preventDefault();
    // Get signin input values
    const emailInput = formInputs[0].value;
    const passwordInput = formInputs[1].value;
    let userEmail = "";
    let userPassword = "";
    allUsers.forEach(user => {
        if (user.email === emailInput && user.password === passwordInput) {
            userEmail = user.email;
            userPassword = user.password;
        }
    });
    // If email and password in allUsers array matches the email and password input, then log in
    if (userEmail === emailInput && userPassword === passwordInput) {
        infoBox1.classList.add("hidden");
        clearInputFields();
        displayContentPage();
    } else {
        infoBox1.textContent = "Incorrect email or password";
        infoBox1.style.border = "2px solid red";
        infoBox1.classList.remove("hidden");
        clearInputFields(1);
    }
}

function getRegisterValues(e) {
    e.preventDefault();
    const newUser = {};
    // Get register input values
    const nameInput = formInputs[2].value;
    const emailInput = formInputs[3].value;
    const passwordInput = formInputs[4].value;
    const confirmInput = formInputs[5].value;
    // If passwords entered match, then display the infoBox2 and append data to user object
    if (passwordInput === confirmInput) {
        infoBox2.textContent = "Account successfully created";
        infoBox2.style.border = "2px solid lightgreen";
        infoBox2.classList.remove("hidden");
        // Append keys and values to the newUser object
        newUser.name = nameInput;
        newUser.email = emailInput;
        newUser.password = passwordInput;
        allUsers.push(newUser);
        // Update local storage with the allUsers array
        saveUsersToLocalStorage();
        clearInputFields(0);
        // Switch to the signin page after successful registration
        setTimeout(togglePageShown, 2000, "signin");
    } else {
        infoBox2.textContent = "Make sure both passwords match";
        infoBox2.style.border = "2px solid red";
        infoBox2.classList.remove("hidden");
        clearInputFields(4);
    }
}

// Delete passwords values or all input values, depending on if the user enetered both passwords correctly
function clearInputFields(index = 0) {
    for (let i = index; i < formInputs.length; i++) {
        formInputs[i].value = "";
    }
}

// Save allUsers array to local storage
function saveUsersToLocalStorage() {
    localStorage.setItem("users", JSON.stringify(allUsers));
}

// Update users array with data from local storage
function updateUsersArray() {
    if (localStorage.getItem("users")) {
        allUsers = JSON.parse(localStorage.getItem("users"));
    }
}

// Event listeners
signinBtn.addEventListener("click", () => togglePageShown("signin"));
registerBtn.addEventListener("click", () => togglePageShown("register"));
signinForm.addEventListener("submit", getSigninValues);
registerForm.addEventListener("submit", getRegisterValues);
logoutBtn.addEventListener("click", logoutUser);

// Run function on page load
togglePageShown("signin");
updateUsersArray();