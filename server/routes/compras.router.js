const express = require("express");
const router = express.Router();

// Llamar funciones para implementar en las rutas
const comprasController= require('../controllers/comprasController')

// Abrir usuarios
router.get("/compras", comprasController.verCompras)
    
// Eliminar Usuario
router.delete("/compras/delete/:id", comprasController.borrarCompra)

module.exports = router;
