const formPassword = document.querySelector(".formPassword");
const inputEmail = document.querySelector(".formPassword input[type='email']");
const inputPass = document.getElementById ("newPass");
const inputPass2 = document.getElementById ("newPass2");
const alertaError = document.querySelector(".alerta-error");
const alertaExito = document.querySelector(".alerta-exito");
const btnPassword = document.getElementById ("btn-password");
const btnSesion = document.getElementById ("volverSesion");

btnSesion.addEventListener("click", _e => {
    window.location.href = '/sesion';
})


//constantes para validar los input 
const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9-.]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w$#&]{8}$/;

// validacion para caracteres especiales -> const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w$#&]{8,}$/;


const estadoValidacionCampos = {
    userPassword: false,
    userEmail: false,
};

//metodo para evitar errores al momento de hacer la carga de datos

document.addEventListener("DOMContentLoaded", () => {    

    formPassword.addEventListener("submit", async(e) => {
        e.preventDefault();   
         
        
        console.log(inputPass.value)        
        const res = await fetch("/api/newPassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                
                userPassword: inputPass.value,
                userEmail: inputEmail.value,
                
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
            alert("Tu contraseña ha sido actualizada Bienvenido!!!! ");

            
            
            
        }
        
        }
        
     
    }  

);
    

    inputEmail.addEventListener("input", () => {
        emailMessage = "El correo solo puede contener letras, números, puntos, arroba(@), guiones y guión bajo"
        validarCampo(emailRegex,inputEmail,emailMessage)

    })    

   
    inputPass.addEventListener("input", () => {
        passMessage = "La contraseña tiene que ser de 8  digitos, debe iniciar con una letra mayúscula puede contener numeros - Ej: Ameli#56"
        validarCampo(passwordRegex,inputPass,passMessage)

    })

    inputPass2.addEventListener("input", () => {
        passMessage = "La contraseña tiene que ser de 8  digitos, debe iniciar con una letra mayúscula puede contener numeros - Ej: Ameli#56"
        validarCampo(passwordRegex,inputPass2,passMessage)

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
        btnPassword.style.display = "block"


    }else {
        estadoValidacionCampos[campo.name] = false;
        mostrarAlerta(campo.parentElement.parentElement, mensaje);
        campo.parentElement.classList.add("error");
        btnPassword.style.display = "none"


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
    if(estadoValidacionCampos.userPassword && estadoValidacionCampos.userEmail){
        alertaExito.classList.add("alertaExito");
        alertaError.classList.remove("alertaError"); 
        formPassword.reset();
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