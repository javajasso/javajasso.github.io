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
    
    n1 = parseInt(Math.random() * 20);
    n2 = parseInt(Math.random() * 20);

    //se asignan las etiquetas
    num1.innerHTML = n1;
    num2.innerHTML = n2;

    //Colocamos el curso en el input
    respuesta_usuario.focus();
}

function nuevaSumaN2(){
    //Se generan los numeros aleatorios  entre 10 y 30
    n1 = parseInt(Math.random() * (50 - 10 + 1)) + 10;
    n2 = parseInt(Math.random() * (30 - 10 + 1)) + 10;
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

function nuevoProductoN2(){
    //Se generan los numeros aleatorios  entre 10 y 50
    n1 = parseInt(Math.random() * (50 - 10 + 1)) + 10;
    n2 = parseInt(Math.random() * (50 - 10 + 1)) + 10;

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

function nuevaRestaN2(){
    //Se generan dos numeros aleatorios  entre 5 y 10
    n1 = parseInt(Math.random() * (50 - 25 + 1)) + 25;
    //se genera un numero aleatorio entre 0 y 5
    n2 = parseInt(Math.random() * 5 * 5);

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

function nuevaDivisionN2(){
    // arreglo para guardar los divisores
    let divisores = [];

    //se genera un numero aleatorio entre 10 y 30
    n1 = parseInt(Math.random()* (30 - 10 + 1)) + 10;

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
let countEnter = 0;
let correcta = 0;
let incorrectas = 0;

function corregir(){    


    var p = document.createElement("p");
    //Verifica si el usuario no ha ingresado respuestas
    if(respuesta_usuario.value==" "){
        p.textContent = "Debes incluir una respuesta "
        msj_vacio.appendChild(p);    
        
    }
    
   
    countEnter++;
    let solucion;
    //se arma la operación que se genero para visualizar el resultado
    let operacion = n1 + operacion_actual + n2;
    solucion = eval(operacion);

    //crear elemento i para agregar el icono correcto segun el resultado
    var i = document.createElement("i");

    //comparar la respuesta del usuario con la solucion correcta
    if(respuesta_usuario.value == solucion){        
        i.className = "fa-regular fa-face-grin";
       // msj_vacio.remove();
       correcta++;
       console.log(correcta);

    }else { 
        p.textContent = "La respuesta correcta es: "+ solucion;             
        i.className = "fa-regular fa-face-frown";        
        msj_vacio.appendChild(p);
        incorrectas ++;
        console.log(incorrectas);
    } 

   //Se agrega el elemento al contenedor de las correcciones
   msj_correccion.appendChild(i);

    
    
    setTimeout(function() {
        
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
    
    }, 2000);

   

    console.log("*",countEnter);
    if(operacion_actual == "+" && countEnter > 4 && countEnter < 6){     
            msj_correccion.innerHTML = "";        
            p.textContent = "Has alcanzado todos los intentos";
            msj_vacio.appendChild(p);
            msj_vacio.remove();  

            if (incorrectas >=3){
                alert("Continua practicando en este nivel  \n Tu puntuación es: "+ (correcta) +" de 5");
                nuevaSuma();
                incorrectas = 0;
                console.log(" Intento terminado")           
                msj_correccion.innerHTML = ""; 
                countEnter = 0;
                     
                
            }else if(correcta >=3){
                alert("¡Felicidades! Has completado el primer nivel de sumas \n Tu puntuación es: "+ correcta +" de 5" );
                alert("Buen puntaje pasemos al nivel 2");
                nuevaSumaN2();
                correcta = 0;
                console.log("Nivel Terminado")           
                msj_correccion.innerHTML = "";   
                

                
            }

            
            
         }else if(operacion_actual == "+" &&  countEnter > 9 && countEnter < 11){
                 alert("¡Felicidades! Has completado el segundo nivel de sumas ");
                 msj_correccion.innerHTML = "";        
                 p.textContent = "Has alcanzado todos los intentos";
                 msj_vacio.appendChild(p);
                 msj_vacio.remove();
                  
                
                if (incorrectas >=3){
                    alert("Continua practicando en este nivel  \n Tu puntuación es: "+ (correcta) +" de 5");                    
                    incorrectas = 0;
                    nuevaSumaN2();                    
                    countEnter = 0;


                                
                }else {
                    alert("¡Felicidades! Has completado el segundo nivel de sumas ");
                    alert("Perfecto!! \n Tu puntuación es: "+ (correcta) +" de 5 \n Ahora practiquemos con restas");
                    correcta = 0;
                    btnResta();
                    sumaB.style.display = 'none';    
                    countEnter = 0;
                                   

                }               

                
    } else if(operacion_actual == "-" && countEnter > 4 && countEnter < 6){   
             
            console.log("Nivel Terminado")           
            msj_correccion.innerHTML = "";        
            p.textContent = "Has alcanzado todos los intentos";
            msj_vacio.appendChild(p);
            msj_vacio.remove();
            if (incorrectas >=3){
                alert("Continua practicando en este nivel  \n Tu puntuación es: "+ (correcta) +" de 5");                    
                nuevaResta();
                incorrectas = 0;
                countEnter = 0;

            }else if(correcta >=3){
                alert("¡Felicidades! Has completado el primer nivel de restas \n Tu puntuación es: "+ correcta +" de 5" );
                alert("Buen puntaje pasemos al nivel 2");
                nuevaRestaN2();
                correcta = 0;
            }
            
        }else if(operacion_actual == "-" &&  countEnter > 9 && countEnter < 11){
                alert("¡Felicidades! Has completado el segundo nivel de restas ");
                console.log("Nivel 2 Terminado")           
                msj_correccion.innerHTML = "";        
                p.textContent = "Has alcanzado todos los intentos";
                msj_vacio.appendChild(p);
                msj_vacio.remove();

                if (incorrectas >=3){
                    alert("Continua practicando en este nivel  \n Tu puntuación es: "+ (correcta) +" de 5");     
                    incorrectas = 0;
                    nuevaRestaN2();
                    restaB.style.display = 'none';    
                    countEnter = 0;


                }else {
                    alert("¡Felicidades! Has completado el segundo nivel de restas ");
                    alert("Perfecto!! \n Tu puntuación es: "+ (correcta) +" de 5 \n Ahora practiquemos con multiplicaciones");
                    correcta = 0;
                    btnProducto();
                    restaB.style.display = 'none';
                    countEnter = 0;                    
                    
                }     
             
       
    } else if(operacion_actual == "*" && countEnter > 4 && countEnter < 6){
            console.log("Nivel Terminado")           
            msj_correccion.innerHTML = "";        
            p.textContent = "Has alcanzado todos los intentos";
            msj_vacio.appendChild(p);
            msj_vacio.remove();
            if (incorrectas >=3){                
                alert("Continua practicando en este nivel  \n Tu puntuación es: "+ (correcta) +" de 5");     
                alert("Debes seguir practicando las multiplicaciones");
                nuevoProducto();
                incorrectas = 0;
                countEnter = 0;

            }else if(correcta >=3){
                alert("¡Felicidades! Has completado el primer nivel de multiplicaciones \n Tu puntuación es: "+ correcta +" de 5" );
                alert("Buen puntaje pasemos al nivel 2");
                nuevoProductoN2();
                correcta = 0;

            }
            
        }else if(operacion_actual == "*" &&  countEnter > 9 && countEnter < 11){
                alert("¡Felicidades! Has completado el segundo nivel de multiplicaciones ");
                console.log("Nivel 2 Multiplcaciones Terminado")           
                msj_correccion.innerHTML = "";        
                p.textContent = "Has alcanzado todos los intentos";
                msj_vacio.appendChild(p);
                msj_vacio.remove();
                if (incorrectas >=3){
                    alert("Continua practicando en este nivel  \n Tu puntuación es: "+ (correcta) +" de 5");     
                    nuevoProductoN2();
                    incorrectas = 0;   
                    countEnter = 0;


                }else {
                    alert("¡Felicidades! Has completado el segundo nivel de multiplicaciones ");
                    alert("Perfecto!! \n Tu puntuación es: "+ (correcta) +" de 5 \n Ahora practiquemos con divisiones");
                    btnDividir();
                    multiB.style.display = 'none';      
                    correcta = 0;
                    countEnter = 0;

                }     
        
    } else if(operacion_actual == "/" && countEnter > 4 && countEnter < 6){        
            msj_correccion.innerHTML = "";        
            p.textContent = "Has alcanzado todos los intentos";
            msj_vacio.appendChild(p);
            msj_vacio.remove();

            if (incorrectas >=3){                
                alert("Continua practicando en este nivel  \n Tu puntuación es: "+ (correcta) +" de 5");     
                alert("Debes seguir practicando las divisiones");
                nuevaDivision();
                incorrectas = 0;
                countEnter = 0;

            }else if(correcta >=3){
                alert("¡Felicidades! Has completado el primer nivel de divisiones \n Tu puntuación es: "+ correcta +" de 5" );
                alert("Buen puntaje pasemos al nivel 2");
                console.log("Nivel 1 División Terminado");      
                nuevaDivisionN2();
                correcta = 0;
            }
            
        }else if(operacion_actual == "/" &&  countEnter > 9 && countEnter < 11){
                          
                msj_correccion.innerHTML = "";        
                p.textContent = "Has alcanzado todos los intentos";
                msj_vacio.appendChild(p);
                msj_vacio.remove();

                if (incorrectas >=3){
                    alert("Continua practicando en este nivel  \n Tu puntuación es: "+ (correcta) +" de 5");     
                    nuevaDivisionN2();
                    incorrectas = 0; 
                    countEnter = 0;  
                }else  if(correcta >=3){
                    alert("¡Felicidades! Has completado el segundo nivel de divisiones ");
                    alert("Perfecto!! \n Tu puntuación es: "+ (correcta) +" de 5");
                    console.log("Nivel 2 División Terminado") 
                    divB.style.display = 'block';                    
                    correcta = 0;
                    countEnter = 0; 
                    sumaB.style.display = 'block'; 
                    restaB.style.display = 'block';    
                    multiB.style.display = 'block';
                    divB.style.display = 'block';                    
                    
                }     
    }   
    
           
}


//evento onKeydown para detectar cuando el usuario presiona Enter
//llamar a la funcion corregir


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

//funcion para rellenar nueva formula
function nuevaFormula(){
    
}