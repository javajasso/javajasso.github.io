

//variables para almacenar los numeros a restar, resultados y opciones
var num1, num2;
var respuesta;
var indiceOpCorrecta; 

//variables para los elementos del frontend
txt_resta = document.getElementById("resta");
op1 = document.getElementById("op1");
op2 = document.getElementById("op2");
op3 = document.getElementById("op3");
txt_msj = document.getElementById("msj");
txt_resultado = document.getElementById("resultado");

function comenzar(){
    txt_resultado.innerHTML = "?"
    txt_msj.innerHTML = "";

    num1 = Math.round(Math.random() * 5 * 10);
    num2= Math.round(Math.random() *5);
    respuesta = num1 - num2;

    txt_resta.innerHTML = num1 + " - " + num2 + " = ";

    //generar el numero entre 0 y 2 para colocar la opcion correcta
    indiceOpCorrecta = Math.round(Math.random()*2);
    if(indiceOpCorrecta==0){
        op1.innerHTML = respuesta;
        //las demas opciones tendran respuestas cercanas
        op2.innerHTML = respuesta + 1;
        op3.innerHTML = respuesta - 1;

    }

    //opcion correcta en la segunda posicion
    if(indiceOpCorrecta==1){
        op2.innerHTML = respuesta;
        //las demas opciones tendran respuestas cercanas
        op1.innerHTML = respuesta + 2;
        op3.innerHTML = respuesta - 1;
        
    }

    //opcion correcta en la tercera posicion
    if(indiceOpCorrecta==2){
        op3.innerHTML = respuesta;
        //las demas opciones tendran respuestas cercanas
        op1.innerHTML = respuesta + 1;
        op2.innerHTML = respuesta - 1;
        
    }
}



function controlarRespuesta(opcionElegida){
    //se muestra la respuesta elegida en la operación
    txt_resultado.innerHTML = opcionElegida.innerHTML;

    
    //verificar la respuesta
    if(respuesta == opcionElegida.innerHTML){
        
        txt_msj.innerHTML = "EXCELENTE!!";
        txt_msj.style.color = "green"

        setTimeout(comenzar, 2000);
    }else {
        txt_msj.innerHTML = "INTENTA DE NUEVO";
        txt_msj.style.color = "red";

        setTimeout(limipiar, 2000);
    }

}

function Limpiar (){
    txt_resultado.innerHTML = "?"
    txt_msj.innerHTML = "";
}

comenzar();
