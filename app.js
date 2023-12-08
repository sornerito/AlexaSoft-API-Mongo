// # Configuración de cargar variables de entorno (Sensibilidad en el código no incluirsem, no mover)
require('dotenv').config()

// Dependencias
const express = require("express")
const expressLayout = require("express-ejs-layouts")
const mongoose = require("mongoose")
const session = require("express-session")

//Definir app
const app = express()


//IMPORTAR RUTAS
const loginRutas = require("./server/routes/login.router")
const ventasRutas = require("./server/routes/ventas.router")
/*const configuracionRutas = require("./server/routes/configuracion.router")
const salidaInsumosRutas = require("./server/routes/salidaInsumos.router")
const comprasRutas = require("./server/routes/compras.router")
const citasRutas = require("./server/routes/citas.router")*/
//IMPORTAR RUTAS


// Motor para renderizar las plantillas
app.use(expressLayout)
app.set('layout','./layout/main')
app.set('view engine','ejs')


// # INICIO MIDDLEWARES (Funciones que se ejecutan antes de las peticiones de los usuarios)

//Configuracion al traer datos (para ejor manejo de los mismos)
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Conexión a la base de datos
mongoose.connect("mongodb+srv://samuel:alexasoft@cluster0.dqbpzak.mongodb.net/") //Link de la base de datos
const db = mongoose.connection
db.on("error", (error)=>console.error(error)) //Mensaje de error en caso de que no se conecte la base de datos
db.once("open", ()=> console.log("Base de datos conectada")) // Confirmar si la base de datos está conectada (En proceso..)

//Configuracion para iniciar sesion
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));

// # FIN MIDDLEWARES


// Archivos estáticos   
app.use(express.static('public'));

// # Rutas
app.use("/", loginRutas)
app.use("/", ventasRutas)
// Cuando el usuario entra al aplicativo, se validara si tiene una sesion iniciada, si no lo manda para el login
app.get("/", (req, res) => {
    if (req.session.loggedin == true) {
        res.redirect("/admin")
    } else {
        res.redirect("/login")
    }
});

// ## Esta renderezación será la principal
app.get('/admin', (req, res) => {
    if (req.session.loggedin == true) {
        const locals = {
        title: 'AlexaSoft',
        description: 'Página Completa',
        req: req
    };
    res.render('index', locals);

    } else {
        res.redirect("/login")
    }
    
});
/*
// ## Demás renderezación de páginas
app.get('/login', (req, res) => {
    const locals = {
        title: 'AlexaSoft | Login',
        description: 'Página Login',
        req: req
    };
    res.render('layouts/login', locals);
});

app.get('/config', (req, res) => {
    const locals = {
        title: 'AlexaSoft | Configuración',
        description: 'Página Configuración',
        req: req
    };
    res.render('layouts/config', locals);
});

app.get('/insumos', (req, res) => {
    const locals = {
        title: 'AlexaSoft | Insumos',
        description: 'Página Insumos',
        req: req
    };
    res.render('layouts/insumos', locals);
});

app.get('/compras', (req, res) => {
    const locals = {
        title: 'AlexaSoft | Compras',
        description: 'Página Compras',
        req: req
    };
    res.render('layouts/login', locals);
});

app.get('/ventas', (req, res) => {
    const locals = {
        title: 'AlexaSoft | Ventas',
        description: 'Página Ventas',
        req: req
    };
    res.render('layouts/ventas', locals);
});

app.get('/citas', (req, res) => {
    const locals = {
        title: 'AlexaSoft | Citas',
        description: 'Página Citas',
        req: req
    };
    res.render('layouts/citas', locals);
});
*/




// # Ruta para manejar errores
app.get('*', (req, res) => {
    res.status(404).render('error/404');
});

// # Escuchar si el servidor fue conectado correctamente
app.listen(5000, () => {
    console.log('Corriendo en el servidor 5000');
});