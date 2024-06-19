

(function () {
    const formLogin = document.querySelector(".form-login");
    const inputEmail = document.querySelector(".form-login input[type='email']");
    const inputPass = document.querySelector(".form-login input[type='password']");
    const alertaError = document.querySelector(".form-login .alerta-error");
    const alertaExito = document.querySelector(".form-login .alerta-exito");
    const inputLogin = document.getElementById ("btn-login");
    
    
    //constantes para validar los input 
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9-.]+$/;    
    //const passwordRegex =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w$#&]{8,}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w$#&]{8}$/;


    
    const estadoValidacionCampos = {
        userEmail: false,
        userPassword: false
    };
    
    //metodo para evitar errores al momento de hacer la carga de datos
    document.addEventListener("DOMContentLoaded", () => {
        formLogin.addEventListener("submit", async(e) => {
            e.preventDefault();
            

            const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
               
                userEmail: inputEmail.value,
                userPassword: inputPass.value,
            })
            
        });
        
        if(!res.ok && !enviarFormulario()){
        
        console.log("Necesitas verificar tu correo")
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
        }

    }

        })
        
     
    
        inputEmail.addEventListener("input", () => {
            emailMessage = "El correo solo puede contener letras, números, puntos, guiones y guión bajo"
            validarCampo(emailRegex,inputEmail,emailMessage)
    
        })
    
        inputPass.addEventListener("input", () => {
            passMessage =  "La contraseña tiene que ser de 8  digitos, debe iniciar con una letra mayúscula puede contener numeros - Ej: Ameli#56"
            validarCampo(passwordRegex,inputPass, passMessage)
    
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
            inputLogin.style.display = "block"

    
        }else {
            estadoValidacionCampos[campo.name] = false;
            mostrarAlerta(campo.parentElement.parentElement, mensaje);
            campo.parentElement.classList.add("error");
            inputLogin.style.display = "none"

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
        if(estadoValidacionCampos.userEmail && estadoValidacionCampos.userPassword){
            alertaExito.classList.add("alertaExito");
            alertaError.classList.remove("alertaError");    
            formLogin.reset();    
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
    
    
    })();