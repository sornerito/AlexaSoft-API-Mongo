const express = require("express");
const router = express.Router();

//Llamar funciones para implementar en las rutas
const configuracionController = require('../controllers/configuracionController')

//Abrir usuarios
router.get("/usuarios", configuracionController.verUsuarios)

//Abrir editar usuarios
router.get("/usuarios/:id", configuracionController.verEditarUsuario)

//Editar Usuario
router.put("/usuarios/put/:id", configuracionController.editarUsuario)

//Eliminar Usuario
router.delete("/usuarios/delete/:id", configuracionController.borrarUsuario)

module.exports = router;