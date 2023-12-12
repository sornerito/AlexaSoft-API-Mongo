// # Exportar y mantener la renderización de la tabla "Citas"

const express = require("express");
const router = express.Router();
const citasController = require('../controllers/citasController')

// Citas Routes

router.get('/citas', citasController.verCitas);
router.delete("/citas/delete/:id", citasController.borrarCitas)

/* 
router.get('/add', citasController.addCitas);

router.post('/add', citasController.postCitas); */

module.exports = router;