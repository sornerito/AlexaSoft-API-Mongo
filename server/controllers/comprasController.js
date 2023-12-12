const { MongoClient, ObjectId } = require("mongodb")
const uri = "mongodb+srv://samuel:alexasoft@cluster0.dqbpzak.mongodb.net/"

//Renderizar configuracion
exports.verCompras = async (req, res) => {
    const locals = {
        title: 'AlexaSoft | Configuracion',
        description: 'Página Configuracion',
        req: req
    };
    if (req.session.loggedin != true) {
        res.redirect("login");
    } else {
        const cliente = new MongoClient(uri)

        try {
            await cliente.connect()
            const usuarios = cliente.db("ALEXASOFT").collection("compras").find()
            const datos = await usuarios.toArray()
            res.render("layouts/compras", { error: "", locals, datos });
        } catch (error) {

        } finally {
            await cliente.close()
        }


    }
};//Fin funcion

exports.verEditarCompra = async (req, res) => {
    const locals = {
        title: 'AlexaSoft | Editar compra',
        description: 'Página compra',
        req: req
    };
    const idCompra = req.params.id;
    console.log("ID DESDE BACKEND "+idCompra)
    const cliente = new MongoClient(uri)

    try {
        await cliente.connect()
        const compra = await cliente.db("ALEXASOFT").collection("compras").findOne({ _id: new ObjectId(idCompra) });
        console.log(compra)
        res.render("layouts/comprasEdit", { error: "", locals, compra });
    } catch (error) {
        console.error(error);
    } finally {
        await cliente.close();
    }
}//fin funcion

exports.editarCompra = async (req, res) => {

    const locals = {
        title: 'AlexaSoft | Modificar Compra',
        description: 'Página Modificar compra',
        req: req
    };

    //Preparacion para conectar a Mongo
    const cliente = new MongoClient(uri);
    //Datos del formulario
    const data = req.body;
    console.log("DATOS DEL FORMULARIO "+req.body);
    //ID del la compra
    const idCompra = req.params.id;

    // Variables definidas
    let correoActual = null;
    let telefonoActual = null;
    let cedulaActual = null;
    let instagramActual = null;
    let usuarioActual = null;

    try {
        await cliente.connect()

        // Buscar Datos usuario actual
        const datosUsuarioActual = await cliente.db("ALEXASOFT").collection("compras").findOne({ _id: new ObjectId(idCompra) });

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


    /*Buscar Campos Repetidos*/
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

    /*BUSCAR ROL EN COLECCION*/
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


    /*ACTUALIZAR USUARIO*/
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
    /*ACTUALIZAR USUARIO*/

}//fin funcion


exports.borrarUsuario = async (req, res) => {
    const locals = {
        title: 'AlexaSoft | Configuracion',
        description: 'Página Configuracion',
        req: req
    };
    const idUsuario = req.params.id;

    const cliente = new MongoClient(uri)
    try {
        await cliente.connect()
        cliente.db("ALEXASOFT").collection("configuracion").deleteOne({ _id: new ObjectId(idUsuario) });

        res.redirect("usuarios", { error: "", locals });
    } catch (error) {
        console.error(error);
    } finally {
        await cliente.close()
    }
}//fin funcion