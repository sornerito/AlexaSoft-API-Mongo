// # Exportar y mantener la renderización de la tabla "Ventas"

const express = require("express");
const router = express.Router();
const citasController = require('../controllers/citasController')

// Ventas Routes

router.get('/citas', citasController.verCitas);
/* 
router.get('/add', citasController.addCitas);

router.post('/add', citasController.postCitas); */

module.exports = router;