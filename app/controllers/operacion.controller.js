
import operacion from "../modelos/operacion.js";
import { usuarios } from "./authentication.controller.js";


//funcion para rellenar nueva formula
async function guardarRegistro(nameUser, nameOper, nivel){
    try{
    const nuevaScore = new operacion({
        nameUser: usuarios.user, 
        nameOper: nameOper,
        nivel: nivel
    });

    const respuestaGuardada = await nuevaScore.save();
    console.log('Respuesta guardada correctamente:', respuestaGuardada);
    return respuestaGuardada;

    } catch(error) {
            console.error('Error al guardar la respuesta:', error);
            // Manejar el error, por ejemplo, responder con un error HTTP si es una aplicación web
        };
    
}

export const methods = {
    guardarRegistro

}