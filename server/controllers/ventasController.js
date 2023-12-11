/* Aquí el controlador hará que en el router de ventas extraía el contenido
    que se necesita o que esté dentro del router al exportar la página de
    inicio (exampleController.homepage).
*/

const modelVentas = require('../models/modelVentas');
const connectBD = require('../config/db');


// # GET /ventas
// # Página Principal

exports.homepage = async (req, res) => {
    const locals = {
        title: 'AlexaSoft | Ventas',
        description: 'Página Ventas'
    }

    try {
        const ventas = await modelVentas.find({});
        const messages = await req.flash("info");
        res.render('layouts/ventas', { locals, messages, ventas });
    } catch (error) {
        console.error('Error al obtener las ventas:', error);
        const messages = ["Error al obtener las ventas. Por favor, inténtelo de nuevo."];
        res.status(500).render('layouts/ventas', { locals, messages, ventas: [] });
    }
}

// # GET /ventas
// # Nuevo Ventas Form

exports.addVentas = async (req, res) => {
    const locals = {
        title: 'AlexaSoft | Crear',
        description: 'Página Crear'
    }
    res.render('crearGeneral/addVentas', locals)
}


// # POST /ventas
// # Añadir Ventas Form

exports.postVentas = async (req, res) => {

    /* # Este console no lo saquen es necesario para ver si en la consola de la página o
        en la consola de la terminal se imprimen los datos del formulario. */
    console.log(req.body);


    const newVenta = new modelVentas({
        CAMBIAR_AQUI: req.body.CAMBIAR_AQUI,  // ## Importante aquí cambiar campos que estén en la base de datos y el formulario
        CAMBIAR_AQUI: req.body.CAMBIAR_AQUI,  // ETC ETC ETC
        CAMBIAR_AQUI: req.body.CAMBIAR_AQUI,  // ETC ETC ETC
    });

    try {
        await modelVentas.create(newVenta);
        await req.flash('info', 'Nueva venta ha sido añadida')

        res.redirect('/ventas')
    } catch (error) {
        console.log(error);
    }

}