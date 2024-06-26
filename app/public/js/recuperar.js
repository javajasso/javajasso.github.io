const btnSesion = document.getElementById("volverSesion");
const formRecuperarEnvio = document.querySelector(".formRecuperarEnvio");
const inputEmail = document.querySelector(".formRecuperarEnvio input[type='email']");
const alertaError = document.querySelector(".alerta-error");
const alertaExito = document.querySelector(".alerta-exito");
const inputEnvio = document.getElementById ("btn-envEmail");

btnSesion.addEventListener("click", _e => {
    window.location.href = '/sesion';
})

console.log("Envio Recuperación")

//constantes para validar los input 
const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9-.]+$/;

const estadoValidacionCampos = {    
    userEmail: false,   
};

//metodo para evitar errores al momento de hacer la carga de datos

document.addEventListener("DOMContentLoaded", () => {    

    formRecuperarEnvio.addEventListener("submit", async(e) => {
        e.preventDefault();   
         
        
        console.log(inputEmail.value)        
        const res = await fetch("/api/recuperar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
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
            alert("Se ha enviado el codigo de recuperación verifica tu correo ");         
            
            
        }
        
        }
        
     
    }  

);
    

    

    
    inputEmail.addEventListener("input", () => {
        emailMessage = "El correo solo puede contener letras, números, puntos, arroba(@), guiones y guión bajo"
        validarCampo(emailRegex,inputEmail,emailMessage)

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
        //inputRegister.style.display = "block"


    }else {
        estadoValidacionCampos[campo.name] = false;
        mostrarAlerta(campo.parentElement.parentElement, mensaje);
        campo.parentElement.classList.add("error");
        //inputRegister.style.display = "none"


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
    if(estadoValidacionCampos.userEmail){
        alertaExito.classList.add("alertaExito");
        alertaError.classList.remove("alertaError"); 
        formRecuperarEnvio.reset();
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