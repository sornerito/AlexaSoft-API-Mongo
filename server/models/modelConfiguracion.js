const mongoose = require('mongoose');

const dbUrl = 'mongodb+srv://samuel:alexasoft@cluster0.dqbpzak.mongodb.net/ALEXASOFT'

// Configuración de la conexión
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const PermisoSchema = new mongoose.Schema({
  Nombre_Permiso: {
    type: String,
    required: true,
  },
  Descripcion: {
    type: String,
    required: true,
  },
}, { _id: false });

const RolSchema = new mongoose.Schema({
  Nombre_Rol: {
    type: String,
    required: true,
  },
  Estado: {
    type: String,
    required: true,
  },
  Permisos: {
    type: [PermisoSchema],
    default: [],
  },
}, { _id: false });

const ConfiguracionSchema = new mongoose.Schema({
  Nombre_Usuario: {
    type: String,
    required: true
  },
  Cedula: {
    type: String,
    required: true
  },
  Correo: {
    type: String,
    required: true
  },
  Telefono: {
    type: String,
    required: true
  },
  Instagram: {
    type: String
  },
  Contrasena: {
    type: String,
    required: true
  },
  Estado_Usuario: {
    type: String,
    default: "Habilitado"
  },
  Fecha_Interaccion: {
    type: Date,
    default: Date.now
  },
  Rol: {
    type: RolSchema,
    required: true
  }
}, { versionKey: false });

const usuario = mongoose.model('configuracion', ConfiguracionSchema, "configuracion", "ALEXASOFT");

module.exports = usuario;
