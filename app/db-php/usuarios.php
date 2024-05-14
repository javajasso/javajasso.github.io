<?php
// Conectar a la base de datos
$conexion = new mysqli('127.0.0.1', 'root', '', 'edumates');

// Verificar conexión
if ($conexion->connect_error) {
    die('Conexión fallida: ' . $conexion->connect_error);
}

// Consulta para obtener los datos
$sql = "SELECT * FROM usuarios";
$resultado = $conexion->query($sql);

// Crear un arreglo para almacenar los datos
$usuarios = [];

// Verificar si la consulta devuelve filas
if ($resultado->num_rows > 0) {
    // Salida de datos de cada fila
    while($fila = $resultado->fetch_assoc()) {
        $usuarios[] = $fila;
    }
} else {
    echo "0 resultados";
}
$conexion->close();

// Convertir los datos a JSON
$usuarios_json = json_encode($usuarios);

// Imprimir los datos en formato JSON
echo $usuarios_json;
?>
