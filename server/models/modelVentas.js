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
        Nombre_Colaborador: String,
        Cedula: Number,
        Estado: String
    },
    Cotizacion: {
        Fecha_Creacion: Date,
        Fecha_Finalizacion: Date,
        Estado: String
    },
    //     Cliente: {
    //         Nombre_Cliente: {
    //             type: String,
    //             required: true
    //         },
    //         Cedula: {
    //             type: String,
    //             required: true
    //         },
    //         Correo: {
    //             type: String
    //         },
    //         Telefono: {
    //             type: String
    //         }
    //     },
    //     Detalles_Cotizacion: {
    //         Productos: [{
    //             Nombre_Producto: {
    //                 type: String,
    //                 required: true
    //             },
    //             Precio: {
    //                 type: Number,
    //                 required: true
    //             },
    //             Unidades: {
    //                 type: Number,
    //                 required: true
    //             },
    //             Subtotal: {
    //                 type: Number,
    //                 required: true
    //             }
    //         }]
    //     },
    //     Total: {
    //         type: Number
    //     },
    // },
});

const modelVentas = mongoose.model('ventas', ventaSchema);

module.exports = modelVentas;
