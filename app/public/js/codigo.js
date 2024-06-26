const btnSesion = document.getElementById("volverSesion");
const formCodigo = document.querySelector(".formCodigo");
const inputCodigo = document.querySelector(".formCodigo input[type='text']");
const alertaError = document.querySelector(".alerta-error");
const alertaExito = document.querySelector(".alerta-exito");
const btnCodigo = document.getElementById ("btn-comprobarCodigo");

btnSesion.addEventListener("click", _e => {
    window.location.href = '/sesion';
})

console.log("Envio Código")

//constantes para validar los input 
const codigoRegex = '^[A-Za-z0-9]+$';

const estadoValidacionCampos = {    
    codigoRegex: false,   
};

//metodo para evitar errores al momento de hacer la carga de datos

document.addEventListener("DOMContentLoaded", () => {    

    formCodigo.addEventListener("submit", async(e) => {
        e.preventDefault();   
         
        
        console.log(inputCodigo.value)        
        const res = await fetch("/api/codigoEnv", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userCodigo: inputCodigo.value,
            })
            
        });
        
        if(!res.ok) {
        
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
            alert("El código ha sido verificado correctamente ya puedes generar una nueva contraseña ");         
            
            
        }
        
        }
        
     
    }  

);
    

    

    
    inputCodigo.addEventListener("input", () => {
        codigoMessage = "Debes colocar el código enviado a tu correo"
        validarCampo(codigoRegex,inputCodigo,codigoMessage)

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
    if(estadoValidacionCampos.userCodigo){
        alertaExito.classList.add("alertaExito");
        alertaError.classList.remove("alertaError"); 
        formCodigo.reset();
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