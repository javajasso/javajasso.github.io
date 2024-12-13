

let num1 = document.querySelector("#num1");
let num2 = document.querySelector("#num2");
let respuesta_usuario = document.querySelector("#respuesta_usuario");
let msj_correccion = document.querySelector("#msj_correccion");
let msj_vacio = document.querySelector("#msj_vacio");
let operacion = document.querySelector("#operacion");
let miBoton = document.getElementById('corregir');
let sumaB = document.getElementById('suma');
let restaB = document.getElementById('resta');
let multiB = document.getElementById('producto');
let divB = document.getElementById('division');
let operacion_actual;

//variables para guardar los botones de llamada 

let suma = document.getElementById('suma');
let resta = document.getElementById('resta');
let multi = document.getElementById('producto');
let div = document.getElementById('division');


suma.addEventListener('click', async function() {
    const res = await fetch("'/api/sumar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            
            num1: num1.value,
            num2: num2.value,
            respuesta_usuario: respuesta_usuario.value,
            operacion:num2.value,
            msj_correccion:num2.value,
            msj_vacio:num2.value,
            
        })
        
    });
    
    if(!res.ok) {
    
    console.log("Por favor rellena los campos correctamente")   
    return;

    }else{
        const resJson = await res.json();
    if(resJson.redirect){        
        console.log("Los datos de suma han sido enviados");
    }
    }   
});


respuesta_usuario.onkeydown = function(e) {
    var ev = document.all ? window.event : e;
    if(ev.keyCode == 13){
        setTimeout(corregir(), 2000);
        

    }
}

//funcion para activar el color de los botones 
function activarBoton(idBoton){
    document.getElementById("suma").className="";
    document.getElementById("resta").className="";
    document.getElementById("producto").className="";
    document.getElementById("division").className="";
    document.getElementById(idBoton).className="activado";
}

