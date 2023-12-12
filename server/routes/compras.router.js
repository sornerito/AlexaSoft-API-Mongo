const express = require("express");
const router = express.Router();

// Llamar funciones para implementar en las rutas
const comprasController= require('../controllers/comprasController')

// Abrir usuarios
router.get("/compras", comprasController.verCompras)

// Abrir editar usuarios
router.get("/compras/edit/:id", comprasController.verEditarCompra)

// Editar Usuario
router.put("/compras/edit/:id", comprasController.editarCompra)

// Eliminar Usuario
router.delete("/compras/delete/:id", comprasController.borrarCompra)

module.exports = router;
