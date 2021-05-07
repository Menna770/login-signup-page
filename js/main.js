//LOG IN PAGE:
let usernameInput = document.getElementById("usernameInput"),
    emailInput = document.getElementById("emailInput"),
    passwordInput = document.getElementById("passwordInput"),
    emailLogInInput = document.getElementById("emailLogInInput"),
    passwordLogInInput = document.getElementById("passwordLogInInput"), 
    inputs = document.getElementsByClassName("form-control"),
    emailInputAlert = document.getElementById("emailInputAlert"),
    usernameInputAlert = document.getElementById("usernameInputAlert"),
    passwordInputAlert = document.getElementById("passwordInputAlert"),
    logInBtn = document.getElementById("logInBtn"),
    sigUpBtn = document.getElementById("sigUpBtn"),
    goToLoginBtn = document.getElementById("goToLoginBtn"),
    confirmBtn = document.getElementById("confirmBtn"),
    logOutBtn = document.getElementById("logOutBtn"),
    modalForm = document.getElementById("modalForm"),
    container = document.getElementsByClassName("container"),
    welcomeBody = document.getElementById("welcomeBody"),
    welcomeMsg = document.getElementById("welcome-msg"),
    msgAlert = document.getElementById("msgAlert"),
    LoginName = "",
    responseMsg = 0,
    usersArray = [];


//Store ResponseMsg Counter into localStorage:
if(!localStorage.getItem("Counter")) 
    {
        localStorage.setItem("Counter", responseMsg);
    } 
    else
    {
        responseMsg = localStorage.getItem("Counter");
    }

//Store Login Input name into localStorage:
if(!localStorage.getItem("LoginName")) 
    {
        localStorage.setItem("LoginName", LoginName);
    } 
    else
    {
        LoginName = localStorage.getItem("LoginName");
    }


//Pages code:
for(let i = 0; i < container.length; i++) {

    ///// Log In PAGE CODE /////
    if(container[i].classList.contains("logInPage")) {

        //Log In Check Name & Password:
        function userExsit()
        {
            let userCheck = 0;
            usersArray = JSON.parse(localStorage.getItem("UsersList"));
            for(let i = 0; i < usersArray.length; i++)
                {
                    let storedUser = usersArray[i];
                    if(emailLogInInput.value == storedUser.email && passwordLogInInput.value == storedUser.password) 
                    {
                        LoginName = usersArray[i].name;
                        localStorage.setItem("LoginName", LoginName);
                        userCheck = 1;
                        break;
                    }
                }
            return userCheck;
        };

        //LogIn Function:
        function logIn()
        {
            if(emailLogInInput.value == "" || passwordLogInInput.value == "")
            { 
                msgAlert.classList.remove("d-none");
                msgAlert.classList.add("d-block");
                msgAlert.innerHTML = "All info are required";
            } 
            else if(!localStorage.getItem("UsersList")) {
                msgAlert.classList.remove("d-none");
                msgAlert.classList.add("d-block");
                msgAlert.innerHTML = "Not Registered!";
            } 
            else
            {
                if(userExsit()) 
                {   
                    responseMsg = 1;
                    localStorage.setItem("Counter", responseMsg);
    
                    logInBtn.setAttribute("href", "welcome.html");
                }
                else
                {
                    msgAlert.classList.remove("d-none");
                    msgAlert.classList.add("d-block");
                    msgAlert.innerHTML = "invalid email or password<br>Please try again!";
                }
            }

        };


        //LogIn Button Onclick:
        logInBtn.addEventListener("click", logIn);
        
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        ///// SIGN UP PAGE CODE /////
        } else if(container[i].classList.contains("signUpPage")) {

            //Validate Sign up Email Address:
            function validateEmail() {
                var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{3,}$/;
            
                if(regex.test(emailInput.value) == true)
                {
                    emailInput.classList.add("is-valid");
                    emailInput.classList.remove("is-invalid");
            
                    emailInputAlert.classList.add("d-none");
                    emailInputAlert.classList.remove("d-block");
            
                    confirmBtn.disabled = false;
            
                    return true;
                
                } else {
                    emailInput.classList.add("is-invalid");
                    emailInput.classList.remove("is-valid");
            
                    emailInputAlert.classList.add("d-block");
                    emailInputAlert.classList.remove("d-none");
            
                    confirmBtn.disabled = true;
            
                    return false;
                };
            };
            
            emailInput.addEventListener("keyup", validateEmail);

            //Validate Sign up Username:
            function validateUsername() {
                var regex = /^[A-Z][a-z A-z 0-9]{2,}$/;
            
                if(regex.test(usernameInput.value) == true)
                {
                    usernameInput.classList.add("is-valid");
                    usernameInput.classList.remove("is-invalid");
            
                    usernameInputAlert.classList.add("d-none");
                    usernameInputAlert.classList.remove("d-block");
            
                    confirmBtn.disabled = false;
            
                    return true;
                
                } else {
                    usernameInput.classList.add("is-invalid");
                    usernameInput.classList.remove("is-valid");
            
                    usernameInputAlert.classList.add("d-block");
                    usernameInputAlert.classList.remove("d-none");
            
                    confirmBtn.disabled = true;
            
                    return false;
                };
            };
            
            usernameInput.addEventListener("keyup", validateUsername);

            //Validate Sign up Password:
            function validatePassword() {
                var regex = /^[A-Za-z0-9]{5,}$/;
            
                if(regex.test(passwordInput.value) == true)
                {
                    passwordInput.classList.add("is-valid");
                    passwordInput.classList.remove("is-invalid");
            
                    passwordInputAlert.classList.add("d-none");
                    passwordInputAlert.classList.remove("d-block");
            
                    confirmBtn.disabled = false;
            
                    return true;
                
                } else {
                    passwordInput.classList.add("is-invalid");
                    passwordInput.classList.remove("is-valid");
            
                    passwordInputAlert.classList.add("d-block");
                    passwordInputAlert.classList.remove("d-none");
            
                    confirmBtn.disabled = true;
            
                    return false;
                };
            };
            
            passwordInput.addEventListener("keyup", validatePassword);
            

        //Add New User to localstorage:
        function addUser() {

            if(validateEmail() == true && validateUsername() == true && validatePassword() == true)
            {
                let newUser = {

                    email: emailInput.value,
                    name: usernameInput.value,
                    password: passwordInput.value
                }
    
                if(!localStorage.getItem("UsersList")) {
                    usersArray.push(newUser);
                    localStorage.setItem("UsersList", JSON.stringify(usersArray));
                    modalForm.innerHTML = `
                                    <div class="badge">Done</div>
                                    <p class="done-msg">Congratulations
                                    <br>Your accout has been created successfully
                                    <br>
                                    You can log in to your accont now
                                    </p>
                                    <div>
                                    <a id="goToLoginBtn" type="button" class="btn" href="index.html">Go to login page</a>
                                    </div>
                                    `;
    
                } else {
                    usersArray = JSON.parse(localStorage.getItem("UsersList"));
    
                    let checkEmailExist = user => user.email === emailInput.value;
                
                    if(usersArray.some(checkEmailExist)) {
    
                        
                        msgAlert.classList.remove("d-none");
                        msgAlert.classList.add("d-block");
                        msgAlert.innerHTML = "This Email already exists, Please try again!";
    
                    } else {

                        usersArray.push(newUser);
                        localStorage.setItem("UsersList", JSON.stringify(usersArray));
                        modalForm.innerHTML = `
                                    <div class="badge">Done</div>
                                    <p class="done-msg">Congratulations
                                    <br>Your accout has been created successfully
                                    <br>
                                    You can log in to your accont now
                                    </p>
                                    <div>
                                    <a id="goToLoginBtn" type="button" class="btn" href="index.html">Go to login page</a>
                                    </div>
                                    `;
                        
                    }
                };
            }
        };

        //Check If Sign Up form Inputs are Empty:
        function checkEmptySignUpInput() {
            if(usernameInput.value == "" || emailInput.value == "" || passwordInput.value == "") {
                
                confirmBtn.removeAttribute("href");
                msgAlert.classList.remove("d-none");
                msgAlert.classList.add("d-block");
                msgAlert.innerHTML = "All info are required";

            } else {
                addUser();                
            }
        };

        //Sign Up Confirm Button Onlick:
        confirmBtn.addEventListener("click", checkEmptySignUpInput);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        ///// WELCOME PAGE CODE ///// 
        } else if(container[i].classList.contains("welcomePage")) {

            //WELCOME PAGE:
            function logOut() {
                logOutBtn.setAttribute("href", "index.html");
                welcomeMsg.innerHTML = ""; 
            }

            logOutBtn.addEventListener("click", logOut);


            welcomeBody.onload= function()
                {
                    responseMsg = localStorage.getItem("Counter"); 

                    if(responseMsg == 1) //if 1 >> Applay Login Function
                    {
                        welcomeMsg.innerHTML = `Welcome ${LoginName}`; 
                    }
                };
        };
}

//GLOBAL:
//Display Welcome Msg to New User (SIGN UP):
function displayWelcomeMsg() {
    usersArray = JSON.parse(localStorage.getItem("UsersList"));
    for(let i = 0; i < usersArray.length; i++) {
        welcomeMsg.innerHTML = `Welcome ${usersArray[i].name}`; 
    }
};