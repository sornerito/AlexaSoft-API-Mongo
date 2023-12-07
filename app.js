// # Configuración de cargar variables de entorno (Sensibilidad en el código no incluirsem, no mover)
require('dotenv').config()

// Dependencias necesarías para renderizar las tablas
const express = require("express")
const expressLayout = require("express-ejs-layouts")
const mongoose = require("mongoose")
const app = express()

// Conexión a la base de datos
mongoose.connect("mongodb+srv://samuel:alexasoft@cluster0.dqbpzak.mongodb.net/")
const db = mongoose.connection
db.on("error", (error)=>console.error(error))
db.once("open", ()=> console.log("Base de datos conectada")) // Confirmar si la base de datos está conectada (En proceso..)

app.use(express.urlencoded({extended: true}))
app.use(express.json())

// 
// De momento estas exportaciones de cada tabla son innecesarias
// 

const configuracionRutas = require("./server/routes/configuracion.router")
const salidaInsumosRutas = require("./server/routes/salidaInsumos.router")
const comprasRutas = require("./server/routes/compras.router")
const ventasRutas = require("./server/routes/ventas.router")
const citasRutas = require("./server/routes/citas.router")

//
// De momento estas exportaciones de cada tabla son innecesarias
//

// Archivos estáticos   
app.use(express.static('public'))

// Motor para renderizar la plantilla o example
app.use(expressLayout)
app.set('layout','./layout/main')
app.set('view engine','ejs')

// # Routers demás páginas

// ## Esta renderezación será la principal
app.get("/", (req, res) => {
    const locals = {
        title: "AlexaSoft",
        description: "Página Completa"
    }
    res.render("index", locals)
})

app.get('/ventas', require('./server/routes/ventas.router'))  

// Renderizar un error (En proceso..)
app.get("*", (req, res) => {
    res.status(404).render('./error/404')
})

// Observar si el servidor se inicio correctamente
app.listen(5000, ()=>{
    console.log("Corriendo en el servidor 5000")
})