
const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  _id: String,
  nombre: String,
  unidades: Number
});

const ProductoModel = mongoose.model('Producto', productoSchema);

module.exports = ProductoModel;