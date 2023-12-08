// # Exportar y mantener la renderización de la tabla "Ventas"

const express = require("express");
const router = express.Router();
const loginController = require('../controllers/loginController')

// Abrir login
router.get('/login', loginController.login);

module.exports = router;