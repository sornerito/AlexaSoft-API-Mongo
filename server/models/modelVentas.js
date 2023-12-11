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
        // Agrega otros campos del colaborador si es necesario
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
            // Agrega otros campos de la cotización si es necesario
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
            // Agrega otros campos del cliente si es necesario
        },
        Telefono: {
            type: String
            // Agrega otros campos del cliente si es necesario
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
        // Agrega otros campos de detalles de cotización si es necesario
    },
    Total: {
        type: Number
        // Agrega otros campos si es necesario
    },
});

module.exports = mongoose.model('modelVentas', ventaSchema);
