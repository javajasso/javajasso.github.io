

const formRegister = document.querySelector(".formRegister");
const inputUser = document.querySelector(".formRegister input[type='text']");
const inputEmail = document.querySelector(".formRegister input[type='email']");
const inputPass = document.querySelector(".formRegister input[type='password']");
const alertaError = document.querySelector(".alerta-error");
const alertaExito = document.querySelector(".alerta-exito");



console.log(inputUser)

//constantes para validar los input 
const userNameRegex = /^[a-zA-Z0-9\_\-]{4,16}$/;
const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9-.]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w$#&]{8,}$/;
// validacion para caracteres especiales -> const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w$#&]{8,}$/;


const estadoValidacionCampos = {
    userName: false,
    userEmail: false,
    userPassword: false
};

//metodo para evitar errores al momento de hacer la carga de datos

document.addEventListener("DOMContentLoaded", () => {    

    formRegister.addEventListener("submit", async(e) => {
        e.preventDefault();   
         
        
        console.log(inputUser.value)        
        const res = await fetch("http://localhost:4000/api/registro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userName: inputUser.value,
                userEmail: inputEmail.value,
                userPassword: inputPass.value,
            })
            
        });
        
        if(!res.ok && !enviarFormulario()) {
        
        console.log("Por favor rellena los campos correctamente")
        alertaExito.classList.remove("alertaExito");
        alertaError.classList.add("alertaError");
        setTimeout(() => {
            alertaError.classList.remove("alertaError");
        }, 3000);

        return;

        }else{
            const resJson = await res.json();
        if(resJson.redirect){
            window.location.href = resJson.redirect;
            alert("Has sido registrado por favor verifica tu correo antes de empezar ");

            
            
            
        }
        
        }
        
     
    }  

);
    

    

    inputUser.addEventListener("input", () => {
       userMessage= "El usuario tiene que ser de 4 a 16 digitos y solo puede contener letras y guión bajo." 
       validarCampo(userNameRegex,inputUser,userMessage)
    })

    inputEmail.addEventListener("input", () => {
        emailMessage = "El correo solo puede contener letras, números, puntos, arroba(@), guiones y guión bajo"
        validarCampo(emailRegex,inputEmail,emailMessage)

    })

    inputPass.addEventListener("input", () => {
        passMessage = "La contraseña tiene que ser de 8  digitos y debe incluir al menos una letra mayúscula y un número"
        validarCampo(passwordRegex,inputPass,passMessage)

    })
    

})


//función para validar las entradas del usuario
function validarCampo(regularExpression, campo, mensaje) {
    const validarCampo = regularExpression.test(campo.value);
    if(validarCampo) {
        eliminarAlerta(campo.parentElement.parentElement);
        estadoValidacionCampos[campo.name] = true;
        console.log(estadoValidacionCampos);
        campo.parentElement.classList.remove("error");

    }else {
        estadoValidacionCampos[campo.name] = false;
        mostrarAlerta(campo.parentElement.parentElement, mensaje);
        campo.parentElement.classList.add("error");

    }
    
}

//función para mostrar las alertas de validación
function mostrarAlerta(referencia,mensaje){
    eliminarAlerta(referencia);
    const alertaDiv = document.createElement("div");
    alertaDiv.classList.add("alerta");
    alertaDiv.textContent = mensaje;
    referencia.appendChild(alertaDiv);
}


function eliminarAlerta(referencia){
    const alerta = referencia.querySelector(".alerta");
    
    if (alerta) {
        alerta.remove();
    }
}




function enviarFormulario() {
    if(estadoValidacionCampos.userName && estadoValidacionCampos.userEmail && estadoValidacionCampos.userPassword){
        alertaExito.classList.add("alertaExito");
        alertaError.classList.remove("alertaError"); 
        formRegister.reset();
        setTimeout(() => {
            alertaExito.classList.remove("alertaExito");
        }, 3000);
       
        return; 
    }
        console.log("Por favor rellena los campos correctamente")
        alertaExito.classList.remove("alertaExito");
        alertaError.classList.add("alertaError");
        setTimeout(() => {
            alertaError.classList.remove("alertaError");
        }, 3000);

    
}