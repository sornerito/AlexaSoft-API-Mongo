const modelInsumos = require('../models/modelInsumos');
const mongoose = require('mongoose');

// # GET /ventas
// # Página Principal

exports.vistaInsumos = async (req, res) => {
    const locals = {
        title: 'AlexaSoft | Salida de Insumos',
        description: 'Página Salida de Insumos',
    }

    try {
        const Insumos = await modelInsumos.find({});
        console.log(Insumos)
        const messages = await req.flash("info");
        res.render('layouts/insumos', { locals, messages, insumos });
    } catch (error) {
        console.error('Error al obtener las ventas:', error);
        const messages = ["Error al obtener las ventas. Por favor, inténtelo de nuevo."];
        res.status(500).render('layouts/insumos', { locals, messages, insumos: [] });
    }
}


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