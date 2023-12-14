const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombre: String,
  unidades: Number
});

const ProductoModel = mongoose.model('productos', productoSchema);

module.exports = ProductoModel;

