// # Configuración de cargar variables de entorno (Sensibilidad en el código no incluirsem, no mover)
require('dotenv').config()

// Dependencias
const express = require('express')
const expressLayout = require('express-ejs-layouts')
const session = require('express-session')
const flash = require('connect-flash');
const connectBD = require('./server/config/db')
const bodyParser = require('body-parser');

//Definir app
const app = express()

// Conexión a la base de datos
connectBD();

//IMPORTAR RUTAS
const loginRutas = require('./server/routes/login.router')
const ventasRutas = require('./server/routes/ventas.router')
const registroRutas = require('./server/routes/registro.router')
const configuracionRutas = require('./server/routes/configuracion.router')
const citasRutas = require('./server/routes/citas.router')
const salidaInsumosRutas = require('./server/routes/salidaInsumos.router')
const comprasRutas = require('./server/routes/compras.router')
/*
const configuracionRutas = require('./server/routes/configuracion.router')
const comprasRutas = require('./server/routes/compras.router')
*/
//IMPORTAR RUTAS


// Motor para renderizar las plantillas
app.use(expressLayout)
app.set('layout', './layout/main')
app.set('view engine', 'ejs')


// # INICIO MIDDLEWARES (Funciones que se ejecutan antes de las peticiones de los usuarios)

// Configuración del body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Configuracion al traer datos (para ejor manejo de los mismos)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Configuracion para iniciar sesion
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Flash Message (Configuración)
app.use(flash({ sessionKeyName: 'flashMessage' }));

// # FIN MIDDLEWARES


// Archivos estáticos   
app.use(express.static('public'));

// # Rutas
app.use('/', loginRutas)
app.use('/', ventasRutas)
app.use('/', registroRutas)
app.use('/', configuracionRutas)
app.use('/', citasRutas)
app.use('/', salidaInsumosRutas)
app.use('/', comprasRutas)

// Cuando el usuario entra al aplicativo, se validara si tiene una sesion iniciada, si no lo manda para el login
app.get('/', (req, res) => {
    if (req.session.loggedin === true) {
        res.redirect('/admin')
    } else {
        res.redirect('/login')
    }
});

// ## Esta renderezación será la principal
app.get('/admin', (req, res) => {
    if (req.session.loggedin === true) {
        const locals = {
            title: 'AlexaSoft',
            description: 'Página Completa',
            req: req
        };
        res.render('index', locals);

    } else {
        res.redirect('/login')
    }

});

// # Ruta para manejar errores
app.get('*', (req, res) => {
    res.status(404).render('error/404');
});

// # Escuchar si el servidor fue conectado correctamente
app.listen(5000, () => {
    console.log('Corriendo en el servidor 5000');
});