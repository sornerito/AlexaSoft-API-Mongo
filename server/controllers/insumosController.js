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
    const locals = {
        title: 'AlexaSoft | Retirar Insumos',
        description: 'Página Retirar',
        req: req
    }
    res.render('crearGeneral/addInsumos', locals)
}

exports.postInsumos = async (req, res) => {

    console.log(req.body);


    const newRetiro = new modelInsumos({
        Unidades_Retiradas: req.body.Unidades_Retiradas,
        CAMBIAR_AQUI: req.body.CAMBIAR_AQUI,
    });

    try {
        await modelInsumos.create(newRetiro);
        await req.flash('info', 'Retiro exitoso')

        res.redirect('insumos')
    } catch (error) {
        console.log(error);
    }

}