document.querySelector('.menu-btn').addEventListener('click', () => {
   document.querySelector('.nav-menu').classList.toggle('show');
   

   console.log('yes!!!')
});

//menú hamburguesa
document.getElementById("menu-btn").addEventListener("click", mostrarMenu);
migas = document.querySelector(".wrapper");

menu_left = document.getElementById("nav-menu");

// -- metodo para mostrar menú
function mostrarMenu() {
    
   menu_left.style.display = "block";
   migas.style.display = "none";
}

migas.style.display = "block";

ScrollReveal().reveal('.showcase');
ScrollReveal().reveal('.news-cards', {delay: 500});
ScrollReveal().reveal('.cards-banner-one', {delay: 500});
ScrollReveal().reveal('.cards-banner-two', {delay: 500});

function redireccionarface() {
   window.location.href = 'https://www.facebook.com';
}


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

   if(scroll > 100){

      //alert(scroll); // sirve para saber la posicion del scroll
      buttonUp.style.transform = "scale(1)"
   }else if(scroll < 100){
      buttonUp.style.transform = "scale(0)"

   }
}



/*Buscador de Contenido */