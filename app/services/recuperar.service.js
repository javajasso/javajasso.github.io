import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})

export async function enviarRecuperaEmail(direccion, token){
    return await transporter.sendMail({
        from: "Edumates - <edumates@gmail.com>",
        to: direccion,
        subject: "Verificación de cuenta - EDUMATES",
        html: crearMailRecuperacion(token)
    })
}

function crearMailRecuperacion(token){
    return `
    <!DOCTYPE html>
<html lang="en">

<style>

    html {
        background-color: #a8d5d1;
    }
    body{
    background: #0000;
    color: #05020e;
    background-color: #a8d5d1;
    font-size: 16px;
    font-family: "Quicksand", sans-serif;
    font-optical-sizing: auto;
    font-weight: 900;
    font-style: normal;

}
</style>
<body>

    <h1>Recuperación de Contraseña - EDUMATES</h1>
    <p><strong>Hola ${direccion}</strong></p>
    <p>Hemos recibido una solicitud de recuperación de contraseña de este correo </p>
    <a href="https://edumateskids.onrender.com/recuperar/${token}" target="_blank" rel="noopener noreferrer">Click Aqui para Recuperar Contraseña</a>
    <p><strong>Edumates</strong></p>
    <p>Edumates Copyright</p>
    
</body>
</html>
    
    
    
    `
}
