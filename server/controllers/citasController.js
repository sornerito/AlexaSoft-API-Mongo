const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb+srv://samuel:alexasoft@cluster0.dqbpzak.mongodb.net/";

// Renderizar configuracion
exports.verCitas = async (req, res) => {
    const locals = {
        title: 'AlexaSoft | Citas',
        description: 'Página Citas',
        req: req
    };

    const citasClient = new MongoClient(uri);

    try {
        await citasClient.connect();
        const citasCollection = citasClient.db("ALEXASOFT").collection("citas");
        const citasData = await citasCollection.find().toArray();
        res.render("layouts/citas", { error: "", locals, datos: citasData });
    } catch (error) {
        console.error("Error al obtener datos de citas:", error);
        // Puedes manejar el error de otra manera si es necesario
        res.render("layouts/citas", { error: "Error al obtener datos de citas", locals, datos: [] });
    } finally {
        await citasClient.close();
    }
};// Fin funcion

exports.addCitas = async (req, res) => {
    try {
        // Obtén la lista de usuarios desde la base de datos
        const usuarios = await usuario.find({}, 'Nombre_Usuario'); // Ajusta los campos según tu modelo
  
        const locals = {
            title: 'AlexaSoft | Citas Añadir',
            description: 'Página Citas Añadir',
            req: req,
            usuarios: usuarios // Pasa la lista de usuarios al contexto de la vista
        };
  
        res.render('crearGeneral/addCitas', locals);
    } catch (error) {
        console.error(error);
        // Maneja el error de manera adecuada, por ejemplo, redirigiendo a una página de error.
        res.status(500).send('Error interno del servidor');
    }
    
  };


const modelCitas = require('../models/modelCitas');
const usuario = require("../models/modelConfiguracion");


exports.postCitas = async (req, res) => {
    
    
    console.log(req.body); // Agregar esta línea para imprimir los datos recibidos

    const { fecha, detalles, numeroDia, estado, mCancelacion, cedula, correo, telefono, nombre } = req.body;
    console.log(cedula)
    console.log(nombre)
    console.log(telefono)
    console.log(correo)

    const nuevaCita = new modelCitas({
        Fecha: fecha,
        Detalles: detalles,
        Estado: estado,
        Motivo_Cancelacion: mCancelacion,
        Horario: {
            NumeroDia: numeroDia,
            Inicio_Jornada: '08:30',
            Fin_Jornada: '17:00',
            Estado_Horario: 'Activo'
        },
        Cliente: {
            Nombre_Cliente: nombre,
            Cedula: cedula,
            Correo: correo,
            Telefono: telefono
        },
           /* Paquete:{
                Nombre_Paquete: data.Nombre_Paquete,
                Descripcion_Paquete: data.Descripcion_Paquete,
                Tiempo_Minutos_Paquete: data.Tiempo_Minutos_Paquete,
                    Servicios: {
                        Nombre_Servicio: data.Nombre_Servicio,
                        Descripcion_Servicio: data.Descripcion_Servicio,
                        Tiempo_Minutos: data.Tiempo_Minutos,
                            Productos:{
                                Nombre_Producto: data.Nombre_Producto,
                                Cantidad: data.Cantidad,
                                Unidad_Medida: data.Unidad_Medida
                            }
                    }
            } */
        });

        try {
            await modelCitas.create(nuevaCita);
            res.redirect("/citas");
          } catch (error) {
            console.log(error);
          }
};

exports.borrarCitas = async (req, res) => {
    const locals = {
        title: 'AlexaSoft | Citas',
        description: 'Página Citas',
        req: req
    };

    const idCitas = req.params.id;

    try {
        const citas = await MongoClient.connect(uri);
        const result = await citas.db("ALEXASOFT").collection("citas").deleteOne({ _id: new ObjectId(idCitas) });

        if (result.deletedCount === 1) {
            res.redirect("/citas");
        } else {
            res.status(404).send("Cita no encontrada");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al eliminar la cita");
    }
};
