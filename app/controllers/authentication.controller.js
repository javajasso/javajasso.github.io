import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { enviarVerificacionEmail } from "./../services/mail.service.js";
import { enviarAutenticacionEmail } from "./../services/auth.service.js";
import { enviarRecuperaEmail } from "./../services/recuperar.service.js";


dotenv.config();


 export const usuarios = [{
    user: 'Caleb',
    email: 'isabellabeauty.mk@gmail.com',
    password: 'Pract#24',
    //password: '$2a$05$YVTEJxMQbefYpaOGv58O4.BkjFQwjjj/ekRt9FUz.3o9Wcg0t8q.S',
    verificado: false,
    codigo: 'jguzR53p',
    
    }]



//import usuarios from "../modelos/user.js";



async function login(req,res){
    console.log(req.body);
    const user = req.body.userName;
    const email = req.body.userEmail;
    const password = req.body.userPassword;

    if(!email || !password){
        console.log("Error desconocido");
        return res.status(400).json({status:"Error", message:"Los campos estan incompletos"});
        
        
    }
    try{
        //const usuarioRevision = await usuarios.findOne(usuarios => usuarios.email === email);
        const usuarioRevision = await usuarios.find(usuarios => usuarios.email === email);
        //const usuarioRevision = await usuarios.find({ usuarios: email, usuario: password }).exec();
        if(!usuarioRevision){
            console.log("Error durante el login el usuario es diferente al registrado");
            return res.status(400).json({status:"Error", message: "Error durante el login"});
            
        }
        console.log("Inicio Existoso")
        
        const loginCorrecto = await bcryptjs.compare(password, usuarioRevision.password);
        console.log(loginCorrecto);
       
        if(!loginCorrecto){
            console.log("Error durante el login la contraseña es diferente a la registada");
            return res.status(400).json({status:"Error", message: "Error durante el login"});

        }

        console.log("Password Check")

        const token = jsonwebtoken.sign(
            {email:usuarioRevision.email},
            process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_EXPIRATION});

            const mail = await enviarAutenticacionEmail(email,token)
            console.log(mail);

            if(mail.accepted===0){
                console.log("rechazado")
                return res(500).json({status:"error", message:"Error enviando mail de verificación - Correo rechazado"})
            }
            console.log("Email Auth Aceptado")


            const cookieOption = {
                expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                path: "/"
            }
                res.cookie("jwt",token,cookieOption);
                res.send({status:"ok", message:"Usuario loggeado", redirect:"/admin"})

                

                              
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
    /**
     * usuarios.find({})
        .then(usuarios => {
            console.log('Usuarios encontrados:');
            usuarios.forEach(usuario => {
                console.log(usuario);
            });   });
     */
    
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
                expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                path: "/"
            }

                const indexUsuarioActualizar = usuarios.findOneAndUpdate(usuarios => usuarios.email === decodificada.email );
                usuarios[indexUsuarioActualizar].verificado = true;               

                res.cookie("jwt",token,cookieOption);
                console.log("Usuario Verificado");
                res.redirect("/admin");

                setTimeout(() => {
                    console.log("***********Tu sesión ha sido expirada***************")
                }, process.env.JWT_COOKIE_EXPIRES * 10 * 60 * 1000);
    } catch (err) {
        res.status(500);
        console.log("fallo la verificación")
        console.log("token: ",req.params.token)
        res.redirect("/index");
    }
}

function generarClave(length) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let clave = '';
    for (let i = 0; i < length; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      clave += caracteres[indice];
    }
    return clave;
}



async function recuperarPassword(req,res){
    console.log(req.body);
    const user = req.body.userName;
    const email = req.body.userEmail;
  
    if(!email){
        console.log("Error desconocido");
        return res.status(400).json({status:"Error", message:"Los campos estan incompletos"});
        
        
    }
    try{
        const usuarioRevision = await usuarios.find(usuarios => usuarios.email === email);
        if(!usuarioRevision){
            console.log("Error durante el login el usuario es diferente al registrado");
            return res.status(400).json({status:"Error", message: "Error durante el login"});
            
        }
        console.log("")
        
        
        const token = jsonwebtoken.sign(
            {email:email},
            process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_EXPIRATION});

            

         
            const codigoN = generarClave(8);
            const indexUsuarioActualizar = usuarios.findIndex(usuarios => usuarios.email === email );
            usuarios[indexUsuarioActualizar].codigo = codigoN;  
            
            /**
             *  try {
                const usuarioActualizado = await usuarios.find(
                    { email: email },
                    { $set: { codigo: codigoN } },
                    { new: true } // Devuelve el documento actualizado
                );
            
                if (usuarioActualizado) {
                    // El usuario ha sido actualizado
                    console.log('Usuario actualizado:', usuarioActualizado);
                } else {
                    console.log('No se encontró el usuario con ese correo electrónico.');
                }
            } catch (error) {
                console.error('Error al actualizar usuario:', error);
            }


             */
           
            
            console.log(usuarios)

            const mail = await enviarRecuperaEmail(email,codigoN)
            console.log(mail);

            if(mail.accepted===0){
                console.log("rechazado")
                return res(500).json({status:"error", message:"Error enviando mail de recuperación - Correo rechazado"})
            }
            console.log("Email Recuperar Aceptado")
            return res.send({status:"ok", message:"Codigo enviado", redirect:"/codigo"})


            /**
             * const cookieOption = {
                expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                path: "/"
            }
                res.cookie("jwt",token,cookieOption);
                res.send({status:"ok", message:"Usuario loggeado", redirect:"/codigo"})
             * 
             */               

                              
        }catch (error) {
            console.error(error);
            res.status(500).json({ status: "Error", message: "Error en el servidor." });
        }

    
        
}

const comprobarCodigo  = async function(req,res){
    console.log(req.body);
    const codigo = req.body.userCodigo;
    
    try {
        
        const usuariosCodigo = usuarios.find(usuarios => usuarios.codigo === codigo);
        if (usuariosCodigo) {
            return res.send({status:"ok", message:"Codigo enviado", redirect:"/newPass"})
            
        }else{
            return res.send({status:"ok", message:"Codigo enviado", redirect:"/codigo"})
            
        }
    } catch (error) {
        console.log(error);
    }

}

async function nuevaPassword(req,res){
    console.log(req.body)
    const newPass = req.body.userPassword;
    const email = req.body.userEmail;
    
    try {
        
        const usuariosPassword = await usuarios.findIndex(usuarios => usuarios.password === newPass);
        if (!usuariosPassword) {
            console.log("La contraseña debe ser diferente a la primera")
            return res.send({status:"ok", message:"La contraseña debe ser diferente", redirect:"/newPass"})
            
        }                
            

    const token = jsonwebtoken.sign(
        {email:email},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRATION});       

     
        
        //const indexUsuarioActualizar = usuarios.findIndex(usuarios => usuarios.email === email );
        //usuarios[indexUsuarioActualizar].password = newPass;  

        const indexUsuarioActualizar = usuarios.findIndex(usuarios => usuarios.email === email );
         

        if (indexUsuarioActualizar !== -1) {
            // Actualizar el campo password del usuario encontrado
            usuarios[indexUsuarioActualizar].password = newPass;
            console.log('Contraseña actualizada correctamente:', usuarios[indexUsuarioActualizar]);
        } else {
            console.log('Usuario no encontrado con el correo electrónico especificado:', email);
        }
 
       
        
        console.log(usuarios)       

         const cookieOption = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            path: "/"
        }
            res.cookie("jwt",token,cookieOption);
            res.send({status:"ok", message:"Usuario loggeado", redirect:"/admin"})
                    

                          
    }catch (error) {
        console.error(error);
        res.status(500).json({ status: "Error", message: "Error en el servidor." });
    }

}



export const methods = {
    login, 
    register,
    verificarCuenta,
    recuperarPassword,
    comprobarCodigo,
    nuevaPassword

}