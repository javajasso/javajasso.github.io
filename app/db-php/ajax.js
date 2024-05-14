// Crear una solicitud AJAX
var xhr = new XMLHttpRequest();
xhr.open('GET', 'tu_endpoint_de_servidor.php', true);

// Configurar la función de respuesta
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4 && xhr.status == 200) {
    // Aquí manejas la respuesta del servidor
    console.log(xhr.responseText);
  }
};

// Enviar la solicitud
xhr.send();