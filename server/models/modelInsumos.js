const mongoose = require('mongoose');

const InsumoSchema = new mongoose.Schema({
  Fecha_Retiro: Date,
  Unidades_Retiradas: Number,
  Motivo_Anular: String,
  Producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto'  // Asegúrate de que estás usando el nombre correcto del modelo Producto
  }
});

const InsumoModel = mongoose.model('salida_insumos', InsumoSchema);

module.exports = InsumoModel;

