// # Configuración de cargar variables de entorno (Sensibilidad en el código no incluirsem, no mover)
require('dotenv').config()

// Dependencias
const express = require('express')
const expressLayout = require('express-ejs-layouts')
const session = require('express-session')
const flash = require('connect-flash');
const connectBD = require('./server/config/db')

//Definir app
const app = express()

// Conexión a la base de datos
connectBD();

//IMPORTAR RUTAS
const loginRutas = require('./server/routes/login.router')
const ventasRutas = require('./server/routes/ventas.router')
const registroRutas = require('./server/routes/registro.router')
const salidaInsumosRutas = require('./server/routes/salidaInsumos.router')
/*const configuracionRutas = require('./server/routes/configuracion.router')
const comprasRutas = require('./server/routes/compras.router')
const citasRutas = require('./server/routes/citas.router')*/
//IMPORTAR RUTAS


// Motor para renderizar las plantillas
app.use(expressLayout)
app.set('layout', './layout/main')
app.set('view engine', 'ejs')


// # INICIO MIDDLEWARES (Funciones que se ejecutan antes de las peticiones de los usuarios)

//Configuracion al traer datos (para ejor manejo de los mismos)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/*

// Conexión a la base de datos
mongoose.connect('mongodb+srv://samuel:alexasoft@cluster0.dqbpzak.mongodb.net/') //Link de la base de datos
const db = mongoose.connection
db.on('error', (error)=>console.error(error)) //Mensaje de error en caso de que no se conecte la base de datos
db.once('open', ()=> console.log('Base de datos conectada')) // Confirmar si la base de datos está conectada (En proceso..)

 */

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
app.use('/', salidaInsumosRutas)
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