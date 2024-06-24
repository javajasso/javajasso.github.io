
//importando recursos
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
//import fetch from 'node-fetch';
import cookieParser from 'cookie-parser';


//importando la conexion a la BD
import conexion from './db.js';


//codigo para habilitar __dirname en las rutas
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//Servidor del Sitio Web
const app = express();
app.set("port", 4000);
app.listen(app.get("port"));
console.log("Servidor corriendo en puerto", app.get("port"));
import { methods as authentication} from './controllers/authentication.controller.js';
import { methods as authorization } from './middlewares/authorization.js';


//Configuración
app.use(cors());
app.use(morgan('dev'));
app.use(express.static(__dirname + "/public/"));
app.use(express.json());
app.use(cookieParser());
console.log("Servidor corriendo en puerto", app.get("port"));



//Rutas para acceder al Proyecto
app.get("/", (req,res) => res.sendFile(__dirname +  "/paginas/index.html"));
app.get("/registro", authorization.soloPublico, (req,res) => res.sendFile(__dirname +  "/paginas/sesion.html"));
app.get("/sesion",authorization.soloPublico, (req,res) => res.sendFile(__dirname +  "/paginas/sesion.html"));
app.get("/admin", authorization.soloAdmin, (req,res) => res.sendFile(__dirname +  "/paginas/admin.html"));
app.post("/api/registro", authentication.register);
app.post("/api/login", authentication.login);


//Rutas del contenido del proyecto soloPublico

app.get("/galeria", (req,res) => res.sendFile(__dirname +  "/paginas/galeria.html"));
app.get("/nosotros", (req,res) => res.sendFile( __dirname + "/paginas/nosotros.html"));
app.get("/mapa", (req,res) => res.sendFile( __dirname + "/paginas/mapa.html"));
app.get("/error", authorization.soloPublico,(req,res) => res.sendFile( __dirname + "/paginas/error.html"));
app.get("/errorSesion", authorization.soloPublico,(req,res) => res.sendFile( __dirname + "/paginas/errorSesion.html"));
app.get("/error2", authorization.soloAdmin,(req,res) => res.sendFile( __dirname + "/paginas/errorVideo.html"));
app.get("/conocimiento", (req,res) => res.sendFile( __dirname + "/paginas/conocimiento.html"));
app.get("/material", (req,res) => res.sendFile( __dirname + "/paginas/material.html"));


//Rutas del contenido del proyecto soloAdmin
app.get("/index", authorization.soloAdmin, (req,res) => res.sendFile(__dirname +  "/paginas/index.html"));
app.get("/crear", authorization.soloAdmin,(req,res) => res.sendFile(__dirname +  "/paginas/crear.html"));
app.get("/galeria", authorization.soloAdmin, (req,res) => res.sendFile(__dirname +  "/paginas/galeria.html"));
app.get("/multi", authorization.soloAdmin,(req,res) => res.sendFile(__dirname +  "/paginas/multi.html"));
app.get("/resta", authorization.soloAdmin,(req,res) => res.sendFile(__dirname +  "/paginas/resta.html"));
app.get("/suma", authorization.soloAdmin,(req,res) => res.sendFile( __dirname + "/paginas/suma.html"));
app.get("/nosotros", authorization.soloAdmin, (req,res) => res.sendFile( __dirname + "/paginas/nosotros.html"));
app.get("/mapa", authorization.soloAdmin,(req,res) => res.sendFile( __dirname + "/paginas/mapa.html"));
app.get("/error2", authorization.soloAdmin,(req,res) => res.sendFile( __dirname + "/paginas/errorVideo.html"));


app.get("/footer", (req,res) => res.sendFile( __dirname + "/paginas/footer.html"));


//Ruta para la verificación correcta del mail
app.get("/verificar/:token", authentication.verificarCuenta);

//Rutas de recuperación de contraseña
//pp.get("/recuperar", authorization.soloPublico, (req,res) => res.sendFile(__dirname +  "/paginas/recuperar.html"));
//app.post("/recuperar/:token", authentication.recuperarPassword);


