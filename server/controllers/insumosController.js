const mongoose = require('mongoose');
const InsumoModel = require('../models/modelInsumos');
const ProductoModel = require('../models/modelProductos'); // Ajusta la ruta según tu estructura de archivos y modelos

const uri = "mongodb+srv://samuel:alexasoft@cluster0.dqbpzak.mongodb.net/";

exports.vistaInsumos = async (req, res) => {
  const locals = {
    title: 'AlexaSoft | insumos',
    description: 'Página insumos',
    req: req
  };

  try {
    const insumos = await InsumoModel.find().populate('Producto').exec();
    res.render('layouts/insumos', { insumos, locals });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  } finally {
    // No cierres la conexión aquí; Mongoose manejará la conexión automáticamente
  }
};



exports.addInsumo = async (req, res) => {
    try {
        // Obtén la lista de productos desde la base de datos
        const productos = await ProductoModel.find({}, 'nombre'); // Ajusta los campos según tu modelo

        const locals = {
            title: 'AlexaSoft | Retirar Insumos',
            description: 'Página Retirar',
            req: req,
            productos: productos // Pasa la lista de productos al contexto de la vista
        };

        res.render('crearGeneral/addInsumos', locals);
    } catch (error) {
        console.error(error);
        // Maneja el error de manera adecuada, por ejemplo, redirigiendo a una página de error.
        res.status(500).send('Error interno del servidor');
    }
}

exports.postInsumos = async (req, res) => {

    console.log(req.body);


    const newRetiro = new InsumoModel({
        Unidades_Retiradas: req.body.Unidades_Retiradas,
        CAMBIAR_AQUI: req.body.CAMBIAR_AQUI,
    });

    try {
        await InsumoModel.create(newRetiro);
        await req.flash('info', 'Retiro exitoso')

        res.redirect('insumos')
    } catch (error) {
        console.log(error);
    }

}