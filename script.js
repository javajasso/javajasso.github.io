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
// document.addEventListener("DOMContentLoaded", () => {
//   const starsContainer = document.querySelector(".stars-background");

//   if (!starsContainer) return; // Evita errores si no existe

//   function createStar() {
//     const star = document.createElement("div");
//     star.classList.add("star");

//     star.style.left = Math.random() * window.innerWidth + "px";
//     star.style.animationDuration = Math.random() * 3 + 2 + "s";
//     star.style.opacity = Math.random();

//     starsContainer.appendChild(star);

    

//     setTimeout(() => {
//       star.remove();
//     }, 5000);
//   }

//   setInterval(createStar, 120);
// });

document.addEventListener("DOMContentLoaded", () => {
  const starsContainer = document.querySelector(".stars-background");
  const legend = document.querySelector(".chat-legend");

  if (!starsContainer) return;

  // 🌍 Detectar estación automáticamente
  const month = new Date().getMonth();
  let season = "winter";

  if (month >= 2 && month <= 4) season = "spring";
  else if (month >= 5 && month <= 7) season = "summer";
  else if (month >= 8 && month <= 10) season = "autumn";

  // Aplicar clase al contenedor
  starsContainer.classList.add(season);

  // 💬 Mensajes dinámicos
  const messages = {
    winter: "Invierno de estrellas... la primavera pronto llegará ❄️",
    spring: "Flores en el aire... nuevos comienzos 🌸",
    summer: "El sol brilla más fuerte que nunca ☀️",
    autumn: "Hojas caen... es tiempo de cambio 🍂"
  };

  if (legend) {
    legend.textContent = messages[season];
  }

  // ✨ Crear partículas
  function createParticle() {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    particle.style.left = Math.random() * window.innerWidth + "px";
    particle.style.animationDuration = Math.random() * 3 + 2 + "s";
    particle.style.opacity = Math.random();

    starsContainer.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 5000);
  }

  setInterval(createParticle, 120);
});


// // 👇 EFECTO DE APARICIÓN DE LA LEYENDA
// const perfil = document.querySelector("#perfil");
// const floating = document.querySelector(".floating");

// window.addEventListener("scroll", () => {
//   if (!perfil || !floating) return;

//   const rect = perfil.getBoundingClientRect();

//   if (rect.top <= window.innerHeight && rect.bottom >= 0) {
//     floating.classList.add("show");
//   } else {
//     floating.classList.remove("show");
//   }
// });


//efectos de la leyenda de animaciones perfil
const perfileyenda = document.querySelector("#perfil");
const floatingleyenda = document.querySelector(".floating");

window.addEventListener("scroll", () => {
  const rect = perfileyenda.getBoundingClientRect();

  if (rect.top <= window.innerHeight && rect.bottom >= 0) {
    floatingleyenda.classList.add("show");
  } else {
    floatingleyenda.classList.remove("show");
  }
});


