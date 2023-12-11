const express = require("express");
const router = express.Router();

// Llamar funciones para implementar en las rutas
const configuracionController = require('../controllers/configuracionController')

// Abrir usuarios
router.get("/usuarios", configuracionController.verUsuarios)

// Abrir editar usuarios
router.get("/usuarios/edit/:id", configuracionController.verEditarUsuario)

// Editar Usuario
router.put("/usuarios/edit/:id", configuracionController.editarUsuario)

// Eliminar Usuario
router.delete("/usuarios/delete/:id", configuracionController.borrarUsuario)

module.exports = router;
