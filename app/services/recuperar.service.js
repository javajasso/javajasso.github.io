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

export async function enviarRecuperaEmail(direccion, codigo){
    return await transporter.sendMail({
        from: "Edumates - <edumates@gmail.com>",
        to: direccion,
        subject: "Recuperación de Contraseña - EDUMATES",
        html: crearMailRecuperacion(codigo)
    })
}

function crearMailRecuperacion(codigo){
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

    <h1>Recuperación de Contraseña - EDUMATESKIDS</h1>
    <p>Hemos recibido una solicitud de recuperación de contraseña de este correo </p>
    <p><strong>${codigo}</strong></p>
    <p><strong>Por favor ingresa este código para recuperar tu contraseña</strong></p>
    <p>Edumates Copyright</p>
    
</body>
</html>
    
    
    
    `
}
