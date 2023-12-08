// # Exportar y mantener la renderización de la tabla "Ventas"

const express = require("express");
const router = express.Router();
const loginController = require('../controllers/loginController');

// Ventas Routes

router.get('/login', loginController.homepage);

module.exports = router;