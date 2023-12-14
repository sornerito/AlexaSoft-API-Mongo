const mongoose = require('mongoose');
const InsumoModel = require('../models/modelInsumos');
const ProductoModel = require('../models/modelProductos');



exports.vistaInsumos = async (req, res) => {
  const locals = {
    title: 'AlexaSoft | insumos',
    description: 'Página insumos',
    req: req
  };

  try {
    const producto = await ProductoModel.find();
    const insumos = await InsumoModel.find();
    res.render('layouts/insumos', { insumos, locals, producto });
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
  const fechaActual = new Date(); // Obtener la fecha actual

  try {
    // Crear un nuevo retiro de insumo
    const newRetiro = new InsumoModel({
      Unidades_Retiradas: req.body.Unidades_Retiradas,
      Producto: req.body.producto,
      Fecha_Retiro: fechaActual
    });

    // Guardar el retiro de insumo
    await InsumoModel.create(newRetiro);

    // Actualizar el documento que coincide con el _id proporcionado
    const resultado = await ProductoModel.updateOne(
      { _id: req.body.producto },
      { $inc: { unidades: -req.body.Unidades_Retiradas } }
    );
    console.log(resultado)

    res.redirect('insumos')
  } catch (error) {
    console.log(error);
    res.status(500).send('Error interno del servidor');
  }
};



