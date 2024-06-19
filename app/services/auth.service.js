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

export async function enviarAutenticacionEmail(direccion, token){
    return await transporter.sendMail({
        from: "Edumates - <edumates@gmail.com>",
        to: direccion,
        subject: "Autenticación de Inicio de Sesión - EDUMATES",
        html: crearMailVerificacion(token)
    })
}

function crearMailVerificacion(token){
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

    <h1>Autenticación de Edumates - EDUMATES</h1>
    
    <p>Se ha intentado iniciar sesion en el sitio <strong>Edumates.com</strong> con este correo electrónico.</p>
    <p>Si esta acción no fue creada por usted, por favor descarte este correo.</p>
    <p>Si usted ha creado la cuenta por favor consulte el siguiente link para su verificación</p>

    <a href="http://localhost:4000/autenticar/${token}" target="_blank" rel="noopener noreferrer">Click Aqui para dar Consentimiento</a>
    <p><strong>Edumates</strong></p>
    <p>Edumates Copyright</p>
    
</body>
</html>
    
    
    
    `
}

