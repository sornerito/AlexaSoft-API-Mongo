/* Aquí el controlador hará que en el router de ventas extraía el contenido
    que se necesita o que esté dentro del router al exportar la página de
    inicio (exampleController.homepage).
*/

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

    /* # Este console no lo saquen es necesario para ver si en la consola de la página o
        en la consola de la terminal se imprimen los datos del formulario. */
    console.log(req.body);


    const newRetiro = new modelInsumos({
        Unidades_Retiradas: req.body.Unidades_Retiradas,
        CAMBIAR_AQUI: req.body.CAMBIAR_AQUI,
    });

    try {
        await modelInsumos.create(newRetiro);
        await req.flash('info', 'Retiro exitoso')

        res.redirect('/insumos')
    } catch (error) {
        console.log(error);
    }

}