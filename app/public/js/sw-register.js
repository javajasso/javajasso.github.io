if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/public/js/sw.js').then((registration) => {
        console.log('Service Worker registrado con éxito:', registration);
      }).catch((error) => {
        console.log('Error al registrar el Service Worker:', error);
      });
    });
  }
  