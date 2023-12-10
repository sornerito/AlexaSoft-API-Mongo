const express = require("express");
const router = express.Router();

//Llamar funciones para implementar en las rutas
const registroController = require('../controllers/registroController')

//Abrir login
router.get("/registro", registroController.verRegistro)

// Validar datos del formulario
router.post("/registro", registroController.guardarUsuario)

module.exports = router;