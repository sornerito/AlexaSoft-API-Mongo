const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const citasSchema = new Schema({
    Fecha: {
        type: String,
        required: true
    }, 
    Detalles: {
        type: String,
        required: false
    },
    Estado: {
        type: String,
        required: true
    },
    Motivo_Cancelacion: {
        type: String,
        required: true
    },
    Horario: {
        NumberDia: {
            type: String,
            required: true
        },
        Inicio_Jornada: {
            type: String,
            required: true
        },
        Fin_Jornada: {
            type: String,
            required: true
        },
        Estado_Horario: {
            type: String,
            required: true
        },
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
    Paquete: {
        Nombre_Paquete: {
            type: String,
            required: true
        },
        Descripcion_Paquete: {
            type: String,
            required: true
        },
        Servicios:[
            {
                Nombre_Servicio: {
                    type: String,
                    required: true
                }, 
                Descripcion_Servicio: {
                    type: String,
                    required: true
                }, 
                Tiempo_Minutos: {
                    type: String,
                    required: true
                }, 
                Productos:[{
                    Nombre_Producto: {
                        type: String,
                        required: true
                    },
                    Cantidad: {
                        type: String,
                        required: true
                    },
                    Unidad_Medida: {
                        type: String,
                        required: true
                    },
                }]
            }
        ]
    },
    
});

module.exports = mongoose.model('modelCitas', citasSchema);
