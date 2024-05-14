document.querySelector('.menu-btn').addEventListener('click', () => {
    document.querySelector('.nav-menu').classList.toggle('show');
    console.log('yes!!!')
 });


/*Botón Ir arriba */
document.getElementById("button-up").addEventListener("click", scrollUp);

function scrollUp(){
   //para asegurar de que obtenemos el scroll
   var currentScroll = document.documentElement.scrollTop;

   //función para volver a la posicion de arriba de la ventana
   if(currentScroll > 0){
      //agregar el efecto de animación del botón
      window.requestAnimationFrame(scrollUp);
      window.scrollTo (0, currentScroll - (currentScroll / 12));
      buttonUp.style.transform = "scale(0)"
      
   }
}

//Metodo para desaparecer y aparecer botón
buttonUp = document.getElementById("button-up");

window.onscroll = function(){
   //esta variable guarda la posicion del scroll
   var scroll = document.documentElement.scrollTop;

   if(scroll > 200){

      //alert(scroll); // sirve para saber la posicion del scroll
      buttonUp.style.transform = "scale(1)"
   }else if(scroll < 200){
      buttonUp.style.transform = "scale(0)"

   }
}
