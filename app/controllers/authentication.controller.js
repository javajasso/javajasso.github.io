import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { enviarVerificacionEmail } from "./../services/mail.service.js";


dotenv.config();

export const usuarios = [{
    user: 'Caleb',
    email: 'isabellabeauty.mk@gmail.com',
    password: '$2a$05$YVTEJxMQbefYpaOGv58O4.BkjFQwjjj/ekRt9FUz.3o9Wcg0t8q.S',
    verificado: false
    
    }]




//import usuarios from "../modelos/user.js";



async function login(req,res){
    console.log(req.body);
    const user = req.body.userName;
    const email = req.body.userEmail;
    const password = req.body.userPassword;

    if(!email || !password){
        console.log("Error desconocido");
        return res.status(400).json({status:"Error", message:"Error desconocido"});
        
        
    }
    try{
        
        const usuarioRevision = usuarios.find(usuarios => usuarios.email === email);
    // const usuarioRevision = await usuarios.findOne({ usuarios: email}).exec();
        if(!usuarioRevision){
            console.log("Error durante el login el usuario es diferente al registrado");
            return res.status(400).json({status:"Error", message: "Error durante el login"});
            
        }
        console.log("Inicio Existoso")
        
        const loginCorrecto = await bcryptjs.compare(password, usuarioRevision.password)
        
       
        if(!loginCorrecto){
            console.log("Error durante el login la contraseña es diferente a la registada");
            return res.status(400).json({status:"Error", message: "Error durante el login"});

        }

        console.log("Password Check")

        const token = jsonwebtoken.sign(
            {user:usuarioRevision.user},
            process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_EXPIRATION});

            const cookieOption = {
                expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 10 * 60 * 1000),
                path: "/"
            }
                res.cookie("jwt",token,cookieOption);
                //res.send({status:"ok", message:"Usuario loggeado", redirect:"/"})

                const indexUsuarioActualizar = usuarios.findIndex(usuario => usuario.email === email);
                usuarios[indexUsuarioActualizar].verificado = true;

                res.json({ status: "ok", message: "Usuario loggeado", redirect: "/" });

                              
        }catch (error) {
            console.error(error);
            res.status(500).json({ status: "Error", message: "Error en el servidor." });
        }

    
        
}

async function register(req,res){
    console.log(req.body);
    const user = req.body.userName;
    const email = req.body.userEmail;
    const password = req.body.userPassword;

    if(!user || !email || !password){
        console.log("Error durante el login");
        return res.status(400).json({status:"Error",message:"Error desconocido"})
        //res.status(400).send({status: "Error", message: "Los datos son incorrectos"})
    }

    try{
        const usuarioRevision = usuarios.find(usuarios => usuarios.email === email);
        if(usuarioRevision){
            console.log("Este email ya fue usado en una cuenta");
            return res.status(400).json({status:"Error",message: "Este email ya fue usado en una cuenta"})
            
        }
    }catch (error) {
        console.error(error);
    }
    const salt = await bcryptjs.genSalt(5);
    const hashPassword = await bcryptjs.hash(password,salt)

    //Proceso para enviar la verificación por correo
    const tokenVerificacion = jsonwebtoken.sign(
        {email:email},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRATION});



    const mail = await enviarVerificacionEmail(email,tokenVerificacion)
    console.log(mail);

    if(mail.accepted===0){
        console.log("rechazado")
        return res(500).json({status:"error", message:"Error enviando mail de verificación - Correo rechazado"})
    }
    console.log("Email Aceptado")

    const nuevoUsuario = {
        user, email, 
        password: hashPassword, verificado: false
    }
    console.log("Usuario agregado");
    usuarios.push(nuevoUsuario);
    console.log("Usuario cifrado");
    console.log(nuevoUsuario);  
    console.log("Usuarios");
    console.log(usuarios);    
    return res.status(201).json({status:"ok",message: `Usuario ${nuevoUsuario.user} agregado`, redirect:"/sesion"});

}

function verificarCuenta(req, res){
    try{
        if(!req.params.token){
            return res.redirect("/");
        }
        const decodificada = jsonwebtoken.verify(req.params.token, process.env.JWT_SECRET);

        if(!decodificada || !decodificada.email){
            return res.redirect("/").json({status:"error", message:"Error en el token"});
        }

        //cookie correcta
        //generar un nuevo token para la validación del usuario que acepto el correo
        const token = jsonwebtoken.sign(
            {email:decodificada.email},
            process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_EXPIRATION});
    
            const cookieOption = {
                //expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 1000),
                expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 10 * 60 * 1000),
                path: "/"
            }

                const indexUsuarioActualizar = usuarios.findIndex(usuarios => usuarios.email === decodificada.email );
                usuarios[indexUsuarioActualizar].verificado = true;

                res.cookie("jwt",token,cookieOption);
                console.log("Usuario Verificado");
                res.redirect("/admin");

                setTimeout(() => {
                    alert("Tu sesión ha expirado");
                    console.log("Tu sesión ha sido expirada")
                }, process.env.JWT_COOKIE_EXPIRES * 10 * 60 * 1000);
    } catch (err) {
        res.status(500);
        console.log("fallo la verificación")
        console.log("token: ",req.params.token)
        res.redirect("/index");
    }
}



export const methods = {
    login, 
    register,
    verificarCuenta

}