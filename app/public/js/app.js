if (navigator.serviceWorker){
    console.log("si soporta el serviceWorker")
    navigator.serviceWorker.register("/sw.js")
    .then( registro => {
        

        Notification.requestPermission()
        .then(resultado => {
            console.log("Permiso: ", resultado);
            registro.showNotification("Hola desde el app.js");
        });
    })
    .catch( error => console.log("Fallo: ", error));
}
