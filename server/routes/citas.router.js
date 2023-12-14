// # Exportar y mantener la renderización de la tabla "Citas"

const express = require("express");
const router = express.Router();
const citasController = require('../controllers/citasController')



// Citas Routes

router.get('/citas', citasController.verCitas);
router.get("/addCitas",citasController.addCitas)
router.post('/addCita', citasController.postCitas)
router.delete("/eliminar/:id", citasController.borrarCitas)



module.exports = router;