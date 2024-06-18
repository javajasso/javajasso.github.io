import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { usuarios } from "../controllers/authentication.controller.js";
//import usuarios from "../modelos/user.js";


dotenv.config();

function soloAdmin(req,res,next){
   const logueado = revisarCookie(req);
   if(logueado) return next();
   return res.redirect("/error")
  
}

function soloPublico(req,res,next){
const logueado = revisarCookie(req);
   if(!logueado) {
      
      return next();
   }

   return res.redirect("/admin")

}

function esAdmin(req,res,next){
   const logueado = revisarCookie(req);
      if(logueado) {
         return next();
      }  
      
      return (
         
         res.redirect("/")
      )
   
   }



function revisarCookie (req){
   try {

    const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4);
    const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
    
    console.log("COOKIE", cookieJWT);
    console.log(decodificada);

    const usuarioRevision = usuarios.find(usuarios => usuarios.email === decodificada.email);
    console.log(usuarioRevision);
    
    if(!usuarioRevision){
        return false
        
    }
        return true

   }catch {
        return false;
   }
}

export const methods = {
    soloAdmin,
    soloPublico,
    esAdmin
}