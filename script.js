//menu mobile
function toggleMenu() {
    const menu =  document.querySelector(".menu-links");
    const icon =  document.querySelector(".hamburguesa-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}


//botón IR ARRIBA
const buttonUp = document.getElementById("button-up");

buttonUp.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

window.addEventListener("scroll", () => {
  const scroll = window.scrollY;

  if (scroll > 200) {
    buttonUp.style.transform = "scale(1)";
  } else {
    buttonUp.style.transform = "scale(0)";
  }
});

//sección de lluvia de estrellas
document.addEventListener("DOMContentLoaded", () => {
  const starsContainer = document.querySelector(".stars-background");

  if (!starsContainer) return; // Evita errores si no existe

  function createStar() {
    const star = document.createElement("div");
    star.classList.add("star");

    star.style.left = Math.random() * window.innerWidth + "px";
    star.style.animationDuration = Math.random() * 3 + 2 + "s";
    star.style.opacity = Math.random();

    starsContainer.appendChild(star);

    

    setTimeout(() => {
      star.remove();
    }, 5000);
  }

  setInterval(createStar, 120);
});


//efectos de la leyenda de animaciones perfil
const perfil = document.querySelector("#perfil");
const floating = document.querySelector(".floating");

window.addEventListener("scroll", () => {
  const rect = perfil.getBoundingClientRect();

  if (rect.top <= window.innerHeight && rect.bottom >= 0) {
    floating.classList.add("show");
  } else {
    floating.classList.remove("show");
  }
});


