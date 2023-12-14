const mongoose = require('mongoose');

const insumoSchema = new mongoose.Schema({
  Fecha_Retiro: Date,
  Unidades_Retiradas: Number,
  Producto: {
    type: mongoose.Schema.Types.ObjectId,
  },
  Motivo_Anular: {
    type: String,
    default: 'sin anular', // Puedes establecerlo como 'sin anular' por defecto
  },
});

const InsumoModel = mongoose.model('salida_insumos', insumoSchema);

module.exports = InsumoModel;


