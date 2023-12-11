const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const salidaInsumosSchema = new Schema({
    Fecha_Retiro: {
        type: Date,
        default: Date.now
    },
    Unidades_Retiradas: {
        type: Number,
        required: true
    },
    Producto: {
        _id: {
        type: String,
        required: true
        }
    },
    Motivo_Anular: {
        type: String,
    },
});

module.exports = mongoose.model('modelInsumos', salidaInsumosSchema);
