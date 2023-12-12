const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ventaSchema = new Schema({
    numeroFactura: {
        type: String,
        required: true
    },
    Fecha: {
        type: Date,
        required: true
    },
    Colaborador: {
        Nombre_Colaborador: {
            type: String,
            required: true
        },
        Cedula: {
            type: String,
            required: true
        }
    },
    Estado: {
        type: String,
        required: true
    },
    Cotizacion: {
        Fecha_Creacion: {
            type: Date,
            required: true
        },
        Fecha_Finalizacion: {
            type: Date
        },
        Estado: {
            type: String,
            required: true
        }
    },
    Cliente: {
        Nombre_Cliente: {
            type: String,
            required: true
        },
        Cedula: {
            type: String,
            required: true
        },
        Correo: {
            type: String
        },
        Telefono: {
            type: String
        }
    },
    Detalles_Cotizacion: {
        Productos: [{
            Nombre_Producto: {
                type: String,
                required: true
            },
            Precio: {
                type: Number,
                required: true
            },
            Unidades: {
                type: Number,
                required: true
            },
            Subtotal: {
                type: Number,
                required: true
            }
        }]
    },
    Total: {
        type: Number
    },
});

module.exports = mongoose.model('modelVentas', ventaSchema);
