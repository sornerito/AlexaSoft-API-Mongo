const express = require("express")
const mongoose = require("mongoose")
const app = express()

mongoose.connect("mongodb+srv://samuel:alexasoft@cluster0.dqbpzak.mongodb.net/")
const db = mongoose.connection
db.on("error", (error)=>console.error(error))
db.once("open", ()=> console.log("Base de datos conectada"))

app.use(express.json())

const configuracionRutas = require("./routes/configuracion.router")
const salidaInsumosRutas = require("./routes/salidaInsumos.router")
const comprasRutas = require("./routes/compras.router")
const ventasRutas = require("./routes/ventas.router")
const citasRutas = require("./routes/citas.router")

app.listen(5000, ()=>{
    console.log("Corriendo en el servidor 5000")
})