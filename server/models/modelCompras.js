const mongoose = require('mongoose');

const dbUrl = 'mongodb+srv://samuel:alexasoft@cluster0.dqbpzak.mongodb.net/ALEXASOFT'

// Configuración de la conexión
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const ProveedorSchema = new mongoose.Schema({
  Nombre_Proveedor: {
    type: String,
    required: true,
  },
  Descripcion: {
    type: String,
    required: true,
  },
  Telefono: {
    type: String,
    required: true,
  },
}, { _id: false });

const ProductosSchema = new mongoose.Schema({
  Nombre_Producto: {
    type: String,
    required: true,
  },
  Unidades_Compradas: {
    type: String,
    required: true,
  },
}, { _id: false });

const ComprasSchema = new mongoose.Schema({
  Fecha_Compra: {
    type: Date,
    default: Date.now
  },
  Productos: {
    type: ProductosSchema,
    required: true
  },
  Proveedor: {
    type: ProveedorSchema,
    required: true
  },
  Precio: {
    type: String,
    required: true
  },
  Motivo_Anular: {
    type: String,
    required: true
  }
}, { versionKey: false });

const compra = mongoose.model('compras', ComprasSchema, "compras", "ALEXASOFT");

module.exports = compra;
