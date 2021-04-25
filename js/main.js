//LOG IN PAGE:
let usernameInput = document.getElementById("usernameInput"),
    emailInput = document.getElementById("emailInput"),
    passwordInput = document.getElementById("passwordInput"),
    usernameLogInInput = document.getElementById("usernameLogInInput"),
    passwordLogInInput = document.getElementById("passwordLogInInput"), 
    inputs = document.getElementsByClassName("form-control"),
    welcomeMsg = document.getElementById("welcome-msg"),
    logInBtn = document.getElementById("logInBtn"),
    sigUpBtn = document.getElementById("sigUpBtn"),
    confirmBtn = document.getElementById("confirmBtn"),
    welcomeBody = document.getElementById("welcomeBody"),
    usersArray = [];


//Add New User to localstorage:
function addUser() {

    let newUser = {

        email: emailInput.value,
        name: usernameInput.value,
        password: passwordInput.value
    }

    if(!localStorage.getItem("UsersList")) {
        usersArray.push(newUser);
        localStorage.setItem("UsersList", JSON.stringify(usersArray));

    } else {
        usersArray = JSON.parse(localStorage.getItem("UsersList"));
        usersArray.push(newUser);
        localStorage.setItem("UsersList", JSON.stringify(usersArray));
    };
};

//Display Welcome Msg to New User (SIGN UP):
function displayWelcomeMsg() {
    usersArray = JSON.parse(localStorage.getItem("UsersList"));
    for(let i = 0; i < usersArray.length; i++) {
         welcomeMsg.innerHTML = `Welcome ${usersArray[i].name}`; 
    }
};


//Log In Confirm:
function logIn() {
    usersArray = JSON.parse(localStorage.getItem("UsersList"));

    let checkUserExist = user => user.name === usernameLogInInput.value;
    
    if(usersArray.some(checkUserExist))
        {
            logInBtn.setAttribute("href","welcome.html");
            displayWelcomeMsg();
        } 
        else
        {
           alert("No user found!");
           logInBtn.removeAttribute("href");
            }
};

// logInBtn.addEventListener("click", logIn);



//Reset Form:
function resetForm() {
    for(let i = 0; i < inputs.length; i++)
    {
        inputs[i].value = "";
    }
};


//WELCOME PAGE:
function logOut() {
    welcomeMsg.innerHTML = ""; 
}