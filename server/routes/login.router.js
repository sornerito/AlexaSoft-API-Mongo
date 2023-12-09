const express = require("express");
const router = express.Router();

//Llamar funciones para implementar en las rutas
const loginController = require('../controllers/loginController')

//Abrir login
router.get("/login", loginController.login)

// Validar datos del formulario
router.post("/login", loginController.verificarSesion)

//Cerrar Sesión
router.get("/cerrarSesion", loginController.cerrarSesion)

module.exports = router;