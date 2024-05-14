//ejevución de funciones
document.getElementById("icon-search").addEventListener("click", mostrar_buscador);
document.getElementById("cover-ctn-search").addEventListener("click", ocultarBuscador);

//variables
bars_search = document.getElementById("ctn-bars-search");
cover_ctn_search = document.getElementById("cover-ctn-search");
inputSearch = document.getElementById("inputSearch");
box_search = document.getElementById("box-search");
negativo = document.querySelector("#box-search  #negativo");

//función para hacer visible el buscador
function mostrar_buscador() {
    
    bars_search.style.top = "120px";
    cover_ctn_search.style.display = "block";
    inputSearch.focus();

    if(inputSearch.value === ""){
        box_search.style.display = "none";
    }
}

//función para ocultar el buscador
function ocultarBuscador(){
    bars_search.style.top = "-80px";
    cover_ctn_search.style.display = "none";
    inputSearch.value = "";
    box_search.style.display = "none";
}

//Filtrado de busqueda
document.getElementById("inputSearch").addEventListener("keyup", buscador_interno);

function buscador_interno(){
    filter = inputSearch.value.toUpperCase();
    li = box_search.getElementsByTagName("li");

    //recorriendo elementos a filtrar 

    for (i=0; i < li.length; i++){

        a = li[i].getElementsByTagName("a")[0];
        textValue = a.textContent || a.innerText;

        if(textValue.toUpperCase().indexOf(filter) > -1){

            li[i].style.display = "";
            box_search.style.display = "block";
            

            if(inputSearch.value === ""){
                box_search.style.display = "none";
            }
        }else {
            li[i].style.display = "none";

        }
    }
}