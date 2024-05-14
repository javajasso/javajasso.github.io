/**
 * // este arreglo me sirve para saber que espacios ya tienen tarjeta
let arreglo = ["", "", ""];


// con esta funcion puedo evita que se abra un enlace al soltar los elementos
function allowDrop(ev){
    ev.preventDefault();
}


// esta funcion especifica que sucedera cuando se arrastre el elemento
function drag(ev){
    //metodo para establecer el tipo de datos y el valor del dato arrastrado
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev){
    //con esta funcion identifico con el evento target y el nombre de id si el espacio esta vacio segun 
    // el avance del arreglo el usuario puede soltar la imagen ahi, caso contrario esta ocupado
    if(arreglo[parseInt(ev.target.id)]==""){
        //con este metodo se obtienen los datos arrastrados con elementos dataTransfer.getData().
        // Este metodo devuelve cualquier datos que se haya establecido en el mismo tipo en el metodo 
        // setData() quedando con los datos asignados.

        var data = ev.dataTransfer.getData("text");
        // agregando al arreglo el metodo del id
        arreglo[parseInt(ev.target.id)] = data;
        //agregando el elemento arrastrano al elemento soltado
        ev.target.appendChild(document.getElementById(data));
    }

    //metodo para las acciones cuando ya estan arrastrados los elementos
    if (arreglo[0] !="" && arreglo[1] !="" && arreglo[2] != "") {
        //verifica si hay coincidencias
        if(arreglo[0] == "num1" && arreglo[1] == "num2" && arreglo[2] =="num3"){
            document.querySelector("h2").innerHTML = "MUY BIEN!!";
        } else {
            document.querySelector("h2").innerHTML = "INTENTA DE NUEVO!!";
        }
    }
}
 */

const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.querySelectorAll(".droppable");

draggableElements.forEach(elem => {
  elem.addEventListener("dragstart", dragStart); // Fires as soon as the user starts dragging an item - This is where we can define the drag data
  // elem.addEventListener("drag", drag); // Fires when a dragged item (element or text selection) is dragged
  // elem.addEventListener("dragend", dragEnd); // Fires when a drag operation ends (such as releasing a mouse button or hitting the Esc key) - After the dragend event, the drag and drop operation is complete
});

droppableElements.forEach(elem => {
  elem.addEventListener("dragenter", dragEnter); // Fires when a dragged item enters a valid drop target
  elem.addEventListener("dragover", dragOver); // Fires when a dragged item is being dragged over a valid drop target, repeatedly while the draggable item is within the drop zone
  elem.addEventListener("dragleave", dragLeave); // Fires when a dragged item leaves a valid drop target
  elem.addEventListener("drop", drop); // Fires when an item is dropped on a valid drop target
});

// Drag and Drop Functions

//Events fired on the drag target

function dragStart(event) {
  event.dataTransfer.setData("text", event.target.id); // or "text/plain" but just "text" would also be fine since we are not setting any other type/format for data value
}

//Events fired on the drop target

function dragEnter(event) {
  if(!event.target.classList.contains("dropped")) {
    event.target.classList.add("droppable-hover");
  }
}

function dragOver(event) {
  if(!event.target.classList.contains("dropped")) {
    event.preventDefault(); // Prevent default to allow drop
  }
}

function dragLeave(event) {
  if(!event.target.classList.contains("dropped")) {
    event.target.classList.remove("droppable-hover");
  }
}

function drop(event) {
  event.preventDefault(); // This is in order to prevent the browser default handling of the data
  event.target.classList.remove("droppable-hover");
  const draggableElementData = event.dataTransfer.getData("text"); // Get the dragged data. This method will return any data that was set to the same type in the setData() method
  const droppableElementData = event.target.getAttribute("data-draggable-id");
  const isCorrectMatching = draggableElementData === droppableElementData;
  if(isCorrectMatching) {
    const draggableElement = document.getElementById(draggableElementData);
    event.target.classList.add("dropped");
    // event.target.style.backgroundColor = draggableElement.style.color; // This approach works only for inline styles. A more general approach would be the following: 
    event.target.style.backgroundColor = window.getComputedStyle(draggableElement).color;
    draggableElement.classList.add("dragged");
    draggableElement.setAttribute("draggable", "false");
    event.target.insertAdjacentHTML("afterbegin", `<i class="fas fa-${draggableElementData}"></i>`);
  }
}