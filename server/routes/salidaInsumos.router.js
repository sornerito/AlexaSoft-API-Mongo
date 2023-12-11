const express = require("express");
const router = express.Router();
const insumosController = require('../controllers/insumosController')

// Salida de Insumos Routes

router.get('/insumos', insumosController.vistaInsumos);

router.get('/addInsumo', insumosController.addInsumo);

router.post('/addInsumo', insumosController.postInsumos);

module.exports = router;