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

export async function enviarVerificacionEmail(direccion, token){
    return await transporter.sendMail({
        from: "Edumates kids - <edumatesKids@gmail.com>",
        to: direccion,
        subject: "Verificación de cuenta - EDUMATES KIDS",
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

    <h1>Verificación de Correo Electrónico - EDUMATES KIDS</h1>
    <p>Se ha creado una cuenta en el sitio <strong>https://edumateskids.onrender.com/</strong> con este correo electrónico.</p>
    <p>Si esta cuenta no fue creada por usted, por favor descarte este correo.</p>
    <p>Si usted ha creado la cuenta por favor consulte el siguiente link para su verificación</p>
    <a href="https://edumateskids.onrender.com/verificar/${token}" target="_blank" rel="noopener noreferrer">Click Aqui para Verificar Cuenta</a>
    <p><strong>Edumates Kids</strong></p>
    <p>Edumates Kids Copyright</p>
    
</body>
</html>
    
    
    
    `
}

