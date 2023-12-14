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
        Fecha_Creacion: String,
        Fecha_Finalizacion: String,
        Estado: String,
        Cliente: {
            Nombre_Cliente: String,
            Cedula: Number,
            Correo: String,
            Telefono: Number

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
        }
    },
});

const modelVentas = mongoose.model('ventas', ventaSchema);

module.exports = modelVentas;
