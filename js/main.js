//LOG IN PAGE:
let usernameInput = document.getElementById("usernameInput"),
    emailInput = document.getElementById("emailInput"),
    passwordInput = document.getElementById("passwordInput"),
    usernameLogInInput = document.getElementById("usernameLogInInput"),
    passwordLogInInput = document.getElementById("passwordLogInInput"), 
    inputs = document.getElementsByClassName("form-control"),
    emailInputAlert = document.getElementById("emailInputAlert"),
    usernameInputAlert = document.getElementById("usernameInputAlert"),
    passwordInputAlert = document.getElementById("passwordInputAlert"),
    logInBtn = document.getElementById("logInBtn"),
    sigUpBtn = document.getElementById("sigUpBtn"),
    confirmBtn = document.getElementById("confirmBtn"),
    logOutBtn = document.getElementById("logOutBtn"),
    container = document.getElementsByClassName("container"),
    welcomeBody = document.getElementById("welcomeBody"),
    welcomeMsg = document.getElementById("welcome-msg"),
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
                    if(usernameLogInInput.value == storedUser.name && passwordLogInInput.value == storedUser.password) 
                    {
                        userCheck = 1;
                        break;
                    }
                }
            return userCheck;
        };

        //LogIn Function:
        function logIn()
        {
            if(usernameLogInInput.value == "" || passwordLogInInput.value == "")
            { 
                alert("Please fill required info");
            } 
            else 
            {
                if(userExsit()) 
                {   
                    responseMsg = 1;
                    localStorage.setItem("Counter", responseMsg);
    
                    LoginName = usernameLogInInput.value;
                    localStorage.setItem("LoginName", LoginName);
    
                    logInBtn.setAttribute("href", "welcome.html");
                }
                else
                {
                    alert("invalidUsername or Password .. Please try again!");
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
            
                    emailInputAlert.classList.add("invisible");
                    emailInputAlert.classList.remove("visible");
            
                    confirmBtn.disabled = false;
            
                    return true;
                
                } else {
                    emailInput.classList.add("is-invalid");
                    emailInput.classList.remove("is-valid");
            
                    emailInputAlert.classList.add("visible");
                    emailInputAlert.classList.remove("invisible");
            
                    confirmBtn.disabled = true;
            
                    return false;
                };
            };
            
            emailInput.addEventListener("keyup", validateEmail);

            //Validate Sign up Username:
            function validateUsername() {
                var regex = /^[A-Z][a-z A-z 0-9]{3,}$/;
            
                if(regex.test(usernameInput.value) == true)
                {
                    usernameInput.classList.add("is-valid");
                    usernameInput.classList.remove("is-invalid");
            
                    usernameInputAlert.classList.add("invisible");
                    usernameInputAlert.classList.remove("visible");
            
                    confirmBtn.disabled = false;
            
                    return true;
                
                } else {
                    usernameInput.classList.add("is-invalid");
                    usernameInput.classList.remove("is-valid");
            
                    usernameInputAlert.classList.add("visible");
                    usernameInputAlert.classList.remove("invisible");
            
                    confirmBtn.disabled = true;
            
                    return false;
                };
            };
            
            usernameInput.addEventListener("keyup", validateUsername);

            //Validate Sign up Password:
            function validatePassword() {
                var regex = /^[A-Za-z0-9]{8,}$/;
            
                if(regex.test(passwordInput.value) == true)
                {
                    passwordInput.classList.add("is-valid");
                    passwordInput.classList.remove("is-invalid");
            
                    passwordInputAlert.classList.add("invisible");
                    passwordInputAlert.classList.remove("visible");
            
                    confirmBtn.disabled = false;
            
                    return true;
                
                } else {
                    passwordInput.classList.add("is-invalid");
                    passwordInput.classList.remove("is-valid");
            
                    passwordInputAlert.classList.add("visible");
                    passwordInputAlert.classList.remove("invisible");
            
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
    
                } else {
                    usersArray = JSON.parse(localStorage.getItem("UsersList"));
    
                    let checkEmailExist = user => user.email === emailInput.value;
                
                    if(usersArray.some(checkEmailExist)) {
    
                        alert("This Email Already Exists, Please Try Again!");
                        confirmBtn.removeAttribute("href");
    
                    } else {
    
                        confirmBtn.setAttribute("href", "welcome.html");
                        responseMsg = 2;
                        localStorage.setItem("Counter", responseMsg);
                        usersArray.push(newUser);
                        localStorage.setItem("UsersList", JSON.stringify(usersArray));
                        
                    }
                };
            }
        };

        //Check If Sign Up form Inputs are Empty:
        function checkEmptySignUpInput() {
            if(usernameInput.value == "" || emailInput.value == "" || passwordInput.value == "") {
                
                confirmBtn.removeAttribute("href");
                alert("Please fill required info");

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
                    else if(responseMsg == 2) //if 2 >> Applay Sign up Function
                    {
                        displayWelcomeMsg();
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