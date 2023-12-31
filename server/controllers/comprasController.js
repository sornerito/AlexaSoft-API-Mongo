const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb+srv://samuel:alexasoft@cluster0.dqbpzak.mongodb.net/";
const comprasModel = require('../models/modelCompras');
const ComprasModel = require('../models/modelCompras');

// Renderizar configuracion
exports.verCompras = async (req, res) => {
    const locals = {
        title: 'AlexaSoft | compras',
        description: 'Página compras',
        req: req
    };

    const comprasClient = new MongoClient(uri);

    try {
        await comprasClient.connect();
        const comprasCollection = comprasClient.db("ALEXASOFT").collection("compras");
        const comprasData = await comprasCollection.find().toArray();
        res.render("layouts/compras", { error: "", locals, datos: comprasData });
    } catch (error) {
        console.error("Error al obtener datos de citas:", error);
        // Puedes manejar el error de otra manera si es necesario
        res.render("layouts/citas", { error: "Error al obtener datos de citas", locals, datos: [] });
    } finally {
        await comprasClient.close();
    }

    exports.addcompra = async (req, res) => {
        try {
            // Obtén la lista de productos desde la base de datos
            const compras = await ComprasModel.find({}, 'Nombre_Producto'); // Ajusta los campos según tu modelo
    
            const locals = {
                title: 'AlexaSoft | compras',
                description: 'Página compras',
                req: req,
                compras: compras // Pasa la lista de productos al contexto de la vista
            };
    
            res.render('crearGeneral/addcompras', locals);
        } catch (error) {
            console.error(error);
            // Maneja el error de manera adecuada, por ejemplo, redirigiendo a una página de error.
            res.status(500).send('Error interno del servidor');
        }
    }
    
    exports.postcompras = async (req, res) => {
    
        console.log(req.body);
    
    
        const newCompra = new comprasModel({
            Precio: req.body.Precio,
            Motivo_Anular: req.body.Motivo_Anular,
        });
    
        try {
            await comprasModel.create(newCompra);
            await req.flash('info', 'Compra exitoso')
    
            res.redirect('compras')
        } catch (error) {
            console.log(error);
        }
    
    }
};// Fin funcion


/* exports.verEditarUsuario = async (req, res) => {
    const locals = {
        title: 'AlexaSoft | Editar Configuracion',
        description: 'Página Configuracion',
        req: req
    };
    const idUsuario = req.params.id;
    console.log("ID DESDE BACKEND "+idUsuario)
    const cliente = new MongoClient(uri)

    try {
        await cliente.connect()
        const usuario = await cliente.db("ALEXASOFT").collection("configuracion").findOne({ _id: new ObjectId(idUsuario) });
        console.log(usuario)
        res.render("layouts/configuracionEdit", { error: "", locals, usuario });
    } catch (error) {
        console.error(error);
    } finally {
        await cliente.close();
    }
}//fin funcion

exports.editarUsuario = async (req, res) => {

    const locals = {
        title: 'AlexaSoft | Modificar Usuario',
        description: 'Página Modificar Usuario',
        req: req
    };

    //Preparacion para conectar a Mongo
    const cliente = new MongoClient(uri);
    //Datos del formulario
    const data = req.body;
    console.log("DATOS DEL FORMULARIO "+req.body);
    //ID del usuario
    const idUsuario = req.params.id;

    // Variables definidas
    let correoActual = null;
    let telefonoActual = null;
    let cedulaActual = null;
    let instagramActual = null;
    let usuarioActual = null;

    try {
        await cliente.connect()

        // Buscar Datos usuario actual
        const datosUsuarioActual = await cliente.db("ALEXASOFT").collection("configuracion").findOne({ _id: new ObjectId(idUsuario) });

        //Guardar valor actual para omitirlo
        correoActual = datosUsuarioActual.Correo;
        telefonoActual = datosUsuarioActual.Telefono;
        cedulaActual = datosUsuarioActual.Cedula;
        instagramActual = datosUsuarioActual.Instagram;
        usuarioActual = datosUsuarioActual;
        console.log(usuarioActual._id)
    } catch (error) {

    } finally {

    }


    /*Buscar Campos Repetidos
    // Variables definidas
    let correoRepetido = false;
    let instagramRepetido = false;
    let cedulaRepetida = false;
    let telefonoRepetido = false;

    try {
        await cliente.connect();

        // Verificar si el correo ya está registrado (omitir si es el mismo valor actual)
        if (data.Correo !== correoActual) {
            const correoResult = await cliente.db("ALEXASOFT").collection("configuracion").findOne({ Correo: data.Correo });
            if (correoResult) {
                correoRepetido = true;
            }
        }

        // Verificar si el Instagram ya está registrado (omitir si es el mismo valor actual)
        if (data.Instagram !== instagramActual) {
            const instagramResult = await cliente.db("ALEXASOFT").collection("configuracion").findOne({ Instagram: data.Instagram });
            if (instagramResult) {
                instagramRepetido = true;
            }
        }

        // Verificar si la cédula ya está registrada (omitir si es el mismo valor actual)
        if (data.Cedula !== cedulaActual) {
            const cedulaResult = await cliente.db("ALEXASOFT").collection("configuracion").findOne({ Cedula: data.Cedula });
            if (cedulaResult) {
                cedulaRepetida = true;
            }
        }

        // Verificar si el teléfono ya está registrado (omitir si es el mismo valor actual)
        if (data.Telefono !== telefonoActual) {
            const telefonoResult = await cliente.db("ALEXASOFT").collection("configuracion").findOne({ Telefono: data.Telefono });
            if (telefonoResult) {
                telefonoRepetido = true;
            }
        }
    } catch (error) {
        console.log(error);
    } finally {
        await cliente.close();
    }


    // Verificar campos repetidos
    if (cedulaRepetida) {
        return res.render("layouts/configuracionEdit", { locals, error: "La cédula ya está registrada en la página", usuario:usuarioActual });
    } else if (correoRepetido) {
        return res.render("layouts/configuracionEdit", { locals, error: "El correo ya está registrado en la página", usuario:usuarioActual });
    } else if (telefonoRepetido) {
        return res.render("layouts/configuracionEdit", { locals, error: "El teléfono ya está registrado en la página", usuario:usuarioActual });
    } else if (data.Instagram && instagramRepetido) {
        return res.render("layouts/configuracionEdit", { locals, error: "El Instagram ya está registrado en la página", usuario:usuarioActual });
    }



    //En caso de que no hayan variables repetidas...
    //Variable definidas
    var permisos = [];

    /*BUSCAR ROL EN COLECCION
    try {
        await cliente.connect()
        const rol = await cliente.db("ALEXASOFT").collection("roles").findOne({ Nombre_Rol: "Cliente" })

        const { Permisos } = rol;
        //Llenar variables definidas
        permisos = Permisos;

    } catch (error) {
        console.log(error)
    } finally {
        await cliente.close()
    }
    /*BUSCAR ROL EN COLECCION*/


    /*ACTUALIZAR USUARIO
    try {
        await cliente.connect()
        await cliente.db("ALEXASOFT").collection("configuracion").updateOne(
            { _id: new ObjectId(idUsuario) },
            {
                $set: {
                    Nombre_Rol: data.Nombre_Rol,
                    Cedula: data.Cedula,
                    Correo: data.Correo,
                    Telefono: data.Telefono,
                    Instagram: data.Instagram,
                    Estado_Usuario: data.Estado_Usuario,
                    'Rol.Nombre_Rol': data.Nombre_Rol,
                    'Rol.Permisos': permisos
                }
            }
        );
        res.redirect("usuarios")


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Hubo un error al modificar el usuario.' });
    } finally {
        await cliente.close()
    }
    /*ACTUALIZAR USUARIO

}//fin funcion*/


exports.borrarCompra = async (req, res) => {
    const locals = {
        title: 'AlexaSoft | compras',
        description: 'Página compras',
        req: req
    };
    const idCompra = req.params.id;

    const compras = new MongoClient(uri)
    try {
        await compras.connect()
        compras.db("ALEXASOFT").collection("compras").deleteOne({ _id: new ObjectId(idCompra) });

        res.redirect("usuarios", { error: "", locals });
    } catch (error) {
        console.error(error);
    } finally {
        await compras.close()
    }
}//fin funcion 