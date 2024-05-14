let num1 = document.querySelector("#num1");
let num2 = document.querySelector("#num2");
let respuesta_usuario = document.querySelector("#respuesta_usuario");
let msj_correccion = document.querySelector("#msj_correccion");
let msj_vacio = document.querySelector("#msj_vacio");
let operacion = document.querySelector("#operacion");
let operacion_actual;

//n1 y n2 para guardar los numeros aleatorios
let n1, n2;

//función para las sumas
function btnSumar(){
    //Limpiar el div contenedor de las correcciones
    msj_correccion.innerHTML = "";

    //agregamos la clase activa al boton suma y se borra de la vista
    activarBoton("suma");
    operacion_actual = "+";

    //se asigna la operación suma a la etiqueta
    operacion.innerHTML = " + ";

    //Se generan los numeros aleatorios
    nuevaSuma();
}

function nuevaSuma(){
    //Se generan los numeros aleatorios  entre 0 y 9
    n1 = parseInt(Math.random() * 10);
    n2 = parseInt(Math.random() * 10);

    //se asignan las etiquetas
    num1.innerHTML = n1;
    num2.innerHTML = n2;

    //Colocamos el curso en el input
    respuesta_usuario.focus();
}

//función para multiplicar

function btnProducto(){
    //Limpiar el div contenedor de las correcciones
    msj_correccion.innerHTML = "";

    //agregamos la clase activa al boton suma y se borra de la vista
    activarBoton("producto");
    operacion_actual = "*";

    //se asigna la operación suma a la etiqueta
    operacion.innerHTML = " x ";

    //Se generan los numeros aleatorios
    nuevoProducto();
}

function nuevoProducto(){
    //Se generan los numeros aleatorios  entre 0 y 9
    n1 = parseInt(Math.random() * 10);
    n2 = parseInt(Math.random() * 10);

    //se asignan las etiquetas
    num1.innerHTML = n1;
    num2.innerHTML = n2;

    //Colocamos el curso en el input
    respuesta_usuario.focus();
}

//funcion para restar
function btnResta(){
    //Limpiar el div contenedor de las correcciones
    msj_correccion.innerHTML = "";

    //agregamos la clase activa al boton suma y se borra de la vista
    activarBoton("resta");
    operacion_actual = "-";

    //se asigna la operación suma a la etiqueta
    operacion.innerHTML = " - ";

    //Se generan los numeros aleatorios
    nuevaResta();
}

function nuevaResta(){
    //Se generan dos numeros aleatorios  entre 5 y 10
    n1 = parseInt(Math.random() * 5 * 5);
    //se genera un numero aleatorio entre 0 y 5
    n2 = parseInt(Math.random() * 5);

    //se asignan las etiquetas
    num1.innerHTML = n1;
    num2.innerHTML = n2;

    //Colocamos el curso en el input
    respuesta_usuario.focus();
}

//funcion para dividir
function btnDividir(){
    //Limpiar el div contenedor de las correcciones
    msj_correccion.innerHTML = "";

    //agregamos la clase activa al boton suma y se borra de la vista
    activarBoton("division");
    operacion_actual = "/";

    //se asigna la operación suma a la etiqueta
    operacion.innerHTML = " / ";

    //Se generan los numeros aleatorios
    nuevaDivision();
}

function nuevaDivision(){
    // arreglo para guardar los divisores
    let divisores = [];

    //se genera un numero aleatorio entre 1 y 10
    n1 = parseInt(Math.random()*19 + 1);

    //ciclo para encontrar los divisores del numero generado y se guarda en el arreglo
    for(var i=1; i<=n1; i++){
        if(n1%i===0){
            divisores.push(i);
        }
    }

    //Seleccionar una posicion aleatoria de los numeros que son divisores
    let pos = parseInt(Math.random()*(divisores.length));

    n2 = divisores[pos];
    num1.innerHTML = n1;
    num2.innerHTML = n2;
    respuesta_usuario.focus();


}


//función que controla si la respuesta es correcta
function corregir(){
    var p = document.createElement("p");
    //Verifica si el usuario no ha ingresado respuestas
    if(respuesta_usuario.value==""){
        p.textContent = "Debes incluir una respuesta "
        msj_vacio.appendChild(p);       
        
    }

   

    let solucion;
    //se arma la operación que se genero para visusalizar el resultado
    let operacion = n1 + operacion_actual + n2;
    solucion = eval(operacion);

    //crear elemento i para agregar el icono correcto segun el resultado
    var i = document.createElement("i");

    //comparar la respuesta del usuario con la solucion correcta
    if(respuesta_usuario.value == solucion){
        i.className = "fa-regular fa-face-grin";
        msj_vacio.remove();
    }else {
        
        i.className = "fa-regular fa-face-frown";
        p.textContent = "Debes incluir una respuesta "
        msj_vacio.appendChild(p);   
    }
    
   

    //Se agrega el elemento al contenedor de las correcciones
    msj_correccion.appendChild(i);

    //Verificar el tipo de operacion actual para generar una nueva
    if(operacion_actual == "+"){
        nuevaSuma();
    } else if(operacion_actual == "-"){
        nuevaResta();
    } else if(operacion_actual == "*"){
        nuevoProducto();
    } else if(operacion_actual == "/"){
        nuevaDivision();
    }

    //Limpiar el input
    respuesta_usuario.value = "";
}

//evento onKeydown para detectar cuando el usuario presiona Enter
//llamar a la funcion corregir
respuesta_usuario.onkeydown = function(e) {
    var ev = document.all ? window.event : e;
    if(ev.keyCode == 13){
        corregir();
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