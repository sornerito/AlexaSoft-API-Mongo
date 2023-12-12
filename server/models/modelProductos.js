
const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: String,
  // Otros campos del producto si es necesario
});

const ProductoModel = mongoose.model('Producto', productoSchema);

module.exports = ProductoModel;