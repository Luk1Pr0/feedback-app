// Navigation buttons
const signinBtn = document.querySelectorAll(".nav-link")[0];
const registerBtn = document.querySelectorAll(".nav-link")[1];
// Sign in and register pages
const signinPage = document.getElementById("signin-page");
const registerPage = document.getElementById("register-page");
// Sign in and register forms
const signinForm = document.getElementById("signin-form");
const registerForm = document.getElementById("register-form");
// Form inputs
const formInputs = document.querySelectorAll("input");
const infoBox1 = document.querySelectorAll(".info-box")[0];
const infoBox2 = document.querySelectorAll(".info-box")[1];

let allUsers = [];
let pageSwitchDelay;

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
        console.log("Logged in");
        infoBox1.classList.add("hidden");
    } else {
        console.log("NOT LOGGED IN");
        infoBox1.textContent = "Incorrect email or password";
        infoBox1.style.border = "2px solid red";
        infoBox1.classList.remove("hidden");
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
function clearInputFields(index) {
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
        console.log(allUsers);
    }
}

// Event listeners
signinBtn.addEventListener("click", () => togglePageShown("signin"));
registerBtn.addEventListener("click", () => togglePageShown("register"));
signinForm.addEventListener("submit", getSigninValues);
registerForm.addEventListener("submit", getRegisterValues);

// Run function on page load
togglePageShown("signin");
updateUsersArray();




// // User database
// let users = [];
// const newUser = {};



// function getSigninInput() {
//     const emailValue = formInputs[0].value;
//     const passwordValue = formInputs[1].value;
//     let storedEmail = "";
//     let storedPassword = "";
//     // Loop through the users array and check if any object there matches the entered credentials
//     users.forEach(user => {
//         if (emailValue === user.email && passwordValue === user.password) {
//             storedEmail = user.email;
//             storedPassword = user.password;
//         }
//     });
//     // If credentials entered match the credentials in users then sign in, else display error
//     if (emailValue === storedEmail && passwordValue === storedPassword) {
//         console.log("logged in");
//         infoBox1.classList.add("hidden");
//     } else {
//         console.log("not logged in");
//         infoBox1.classList.remove("hidden");
//         infoBox1.textContent = "Incorrect email address or password";
//     }
//     // Remove password after attempted log in
//     return formInputs[1] = "";
// }

// function getRegisterInput() {
//     const nameValue = formInputs[2].value;
//     const emailValue = formInputs[3].value;
//     const passwordValue = formInputs[4].value;
//     const passwordConfirm = formInputs[5].value;
//     if (passwordValue === passwordConfirm) {
//         // Append details to an object
//         newUser.name = nameValue;
//         newUser.email = emailValue;
//         newUser.password = passwordValue;
//         // Push the new user object to the users array
//         // Display a green outline box notifying that the account has been created
//         infoBox2.textContent = "Account created succesfully";
//         infoBox2.style.border = "2px solid lightgreen";
//         infoBox2.classList.remove("hidden");
//     } else {
//         infoBox2.textContent = "Please make sure both passwords match";
//         infoBox2.classList.remove("hidden");
//     }
//     users.push(newUser);
//     updateLocalStorage();
// }

// // Save the users array to local storage
// function updateLocalStorage() {
//     if (users.length) {
//         localStorage.setItem("users", JSON.stringify(users));
//     }
// }

// // Update users array from the local storage
// function updateUsersArray() {
//     users = JSON.parse(localStorage.getItem("users"));
// }

// Event listeners
// signinBtn.addEventListener("click", () => togglePageShown("signin"));
// registerBtn.addEventListener("click", () => togglePageShown("register"));
// signinForm.addEventListener("submit", getSigninInput);
// registerForm.addEventListener("submit", getRegisterInput);

// // Run function on page load
// togglePageShown("signin");
// updateUsersArray();
