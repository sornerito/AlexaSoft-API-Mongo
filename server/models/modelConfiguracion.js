const mongoose = require('mongoose');

const PermisoSchema = new mongoose.Schema({
  Nombre_Permiso: {
    type: String,
    required: true,
  },
  Descripcion: {
    type: String,
    required: true,
  },
});

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
});

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
});

const Usuario = mongoose.model('Usuario', ConfiguracionSchema);

module.exports = Usuario;
