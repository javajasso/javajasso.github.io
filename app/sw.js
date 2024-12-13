self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('pwa-cache').then((cache) => {
        return cache.addAll([
          '/',
        '/index.html',
        '/home.html',
        '/css/style.css',
        '/js/index.js',
        '/img/icon-192x192.png',
        '/img/icon-512x512.png',
        '/admin.html',   // Página de administración
        '/compleTarjeta.html',  // Página adicional
        '/conocimiento.html',
        '/crear.html',
        '/email.html',
        '/error.html',
        '/errorSesion.html',
        '/errorVideo.html',
        '/footer.html',
        '/galeria.html',
        '/galeriaP.html',
        '/login2.html',
        '/mapa.html',
        '/material.html',
        '/multi.html',
        '/nav2.html',
        '/navbar.html',
        '/newPassword.html',
        '/nosotros.html',
        '/recuperarCodigo.html',
        '/recuperarEnvio.html',
        '/resta.html',
        '/sesion.html',
        '/suma.html',
        
        // Archivos de imágenes
        '/img/abaco.jpg',
        '/img/abaco2.jpg',
        '/img/brand.png',
        '/img/calculo.jpg',
        '/img/EDULOGO.png',
        '/img/edumate-logo.png',
        '/img/edumate.png',
        '/img/edumatelogo.png',
        '/img/error404.png',
        '/img/galeria.webp',
        '/img/image-five.jpg',
        '/img/image-four.jpg',
        '/img/image-three.jpg',
        '/img/memorama.jpg',
        '/img/5 news 1.jpg',
        '/img/news 3.jpg',
        '/img/news 4.jpg',
        '/img/numbers.jpg',
        '/img/pared.jpg',
        '/img/showcase2.jpg',
        '/img/tech-red.jpg',
        '/img/videos.jpg',

        //Archivos jpg de icons
        '/img/icons/icon-16.png',
        '/img/icons/icon-32.png',
        '/img/icons/icon-36.png',
        '/img/icons/icon-48.png',
        '/img/icons/icon-72.png',
        '/img/icons/icon-76.png',
        '/img/icons/icon-96.png',
        '/img/icons/icon-128.png',
        '/img/icons/icon-144.png',
        '/img/icons/icon-152.png',
        '/img/icons/icon-168.png',
        '/img/icons/icon-192.png',
        '/img/icons/icon-256.png',
        
        // Archivos JavaScript
        '/js/admin.js',
        '/js/botonUp.js',
        '/js/buscador.js',
        '/js/captcha.js',
        '/js/codigo.js',
        '/js/dragdrop.js',
        '/js/draw.js',
        '/js/galeria.js',
        '/js/iffe_login.js',
        '/js/login.js',
        '/js/login2.js',
        '/js/main.js',
        '/js/operaciones.js',
        '/js/operBack.js',
        '/js/operFront.js',
        '/js/recuperar.js',
        '/js/register.js',
        '/js/reseteo.js',
        '/js/restando.js',
        '/js/sesion.js',

          // Archivos de la carpeta "services" (parte del frontend)
          '/services/auth.service.js',
          '/services/mail.service.js',
          '/services/recuperar.service.js',
          '/services/db.js',
          '/services/index.js',

        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  