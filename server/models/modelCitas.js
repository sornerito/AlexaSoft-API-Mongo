const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productoSchema = new Schema({
    Nombre_Producto: {
        type: String,
    },
    Cantidad: {
        type: Number,
    },
    Unidad_Medida: {
        type: String,
    }
});

const servicioSchema = new Schema({
    Nombre_Servicio: {
        type: String,
    },
    Descripcion_Servicio: {
        type: String,
    },
    Tiempo_Minutos: {
        type: Number,
    },
    Productos: [productoSchema]
});

const citasSchema = new Schema({
    Fecha: {
        type: Date,
    },
    Detalles: {
        type: String
        // Puedes agregar más opciones de validación aquí
    },
    Estado: {
        type: String,
    },
    Motivo_Cancelacion: {
        type: String,
    },
   /*  Horario: {
        NumberDia: {
            type: String,
        },
        Inicio_Jornada: {
            type: String,
        },
        Fin_Jornada: {
            type: String,
        },
        Estado_Horario: {
            type: String,
        }
    },
    Cliente: {
        Nombre_Cliente: {
            type: String,
        },
        Cedula: {
            type: String,
        },
        Correo: {
            type: String
            // Puedes agregar más opciones de validación aquí
        },
        Telefono: {
            type: String
            // Puedes agregar más opciones de validación aquí
        }
    },
    Paquete: {
        Nombre_Paquete: {
            type: String,
        },
        Descripcion_Paquete: {
            type: String,
        },
        Tiempo_Minutos_Paquete: {
            type: Number,
        }, 
        Servicios: [servicioSchema],
    } */
});

module.exports = mongoose.model('citas', citasSchema);
