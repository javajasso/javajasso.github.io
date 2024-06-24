const btnSignIn = document.getElementById("signIn"),
      btnSignUp = document.getElementById("signUp"),
      containerformRegister = document.querySelector(".registro"),
      containerformLogin = document.querySelector(".login");


btnSignIn.addEventListener("click", _e => {
    containerformRegister.classList.add("hidden");
    containerformLogin.classList.remove("hidden");
})

//esconder formulario register
btnSignUp.addEventListener("click", _e => {
    containerformLogin.classList.add("hidden");
    containerformRegister.classList.remove("hidden");
})

