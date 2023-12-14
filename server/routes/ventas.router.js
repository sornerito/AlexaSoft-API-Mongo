// # Exportar y mantener la renderización de la tabla "Ventas"

const express = require("express");
const router = express.Router();
const ventasController = require('../controllers/ventasController')

// Ventas Routes

router.get('/ventas', ventasController.verVentas);

router.get('/add', ventasController.addVentas);

router.post('/postVentas', ventasController.postVentas);

router.delete("/eliminar/:id", ventasController.borrarVentas)

module.exports = router;