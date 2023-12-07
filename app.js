require('dotenv').config()

const express = require("express")
const expressLayout = require("express-ejs-layouts")
const mongoose = require("mongoose")
const app = express()

mongoose.connect("mongodb+srv://samuel:alexasoft@cluster0.dqbpzak.mongodb.net/")
const db = mongoose.connection
db.on("error", (error)=>console.error(error))
db.once("open", ()=> console.log("Base de datos conectada"))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

const configuracionRutas = require("./routes/configuracion.router")
const salidaInsumosRutas = require("./routes/salidaInsumos.router")
const comprasRutas = require("./routes/compras.router")
const ventasRutas = require("./routes/ventas.router")
const citasRutas = require("./routes/citas.router")

app.use(express.static('public'))

app.use(expressLayout)
app.set('layout','./layouts/main')
app.set('view engine','ejs')

// Renderizar el archivo principal principal
app.get("/", (req, res) => {
    const locals = {
        title: "AlexaSoft",
        description: "Cómo estás?"
    }
    res.render("index", locals)
})

// Renderizar un error (En proceso..)
app.get("*", (req, res) => {
    res.status(404).render('./error/404')
})

// Observar si el servidor se inicio correctamente
app.listen(5000, ()=>{
    console.log("Corriendo en el servidor 5000")
})