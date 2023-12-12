const usuario = require("../models/modelConfiguracion")
const { MongoClient } = require("mongodb")
const uri = "mongodb+srv://samuel:alexasoft@cluster0.dqbpzak.mongodb.net/";

//Renderizar Regitro
exports.verRegistro = async (req, res) => {
    const locals = {
        title: 'AlexaSoft | Registro',
        description: 'Página Registro',
        req: req
    };
    //Solo Puede acceer si no ha iniciado sesión
    if (req.session.loggedin === true) {
        res.redirect("admin");
    } else {
        res.render("layouts/registro", { error: "", locals });
    }
};//Fin funcion

//Validar Formulario
exports.guardarUsuario = async (req, res) => {
    const locals = {
        title: 'AlexaSoft | Registro',
        description: 'Página Registro',
        req: req
    };
    //Preparacion para conectar a Mongo
    const cliente = await new MongoClient(uri)

    //Datos del formulario
    const data = req.body;

    //TRAER REGISTROS
    /*Buscar Campos Repetidos*/

    // Variables definidas
    let correoRepetido = false;
    let instagramRepetido = false;
    let cedulaRepetida = false;
    let telefonoRepetido = false;

    try {
        await cliente.connect();

        // Verificar si el correo ya está registrado
        const correoResult = await cliente.db("ALEXASOFT").collection("configuracion").findOne({ Correo: data.Correo });
        if (correoResult) {
            correoRepetido = true;
        }

        // Verificar si el Instagram ya está registrado
        const instagramResult = await cliente.db("ALEXASOFT").collection("configuracion").findOne({ Instagram: data.Instagram });
        if (instagramResult) {
            instagramRepetido = true;
        }

        // Verificar si la cédula ya está registrada
        const cedulaResult = await cliente.db("ALEXASOFT").collection("configuracion").findOne({ Cedula: data.Cedula });
        if (cedulaResult) {
            cedulaRepetida = true;
        }

        // Verificar si el teléfono ya está registrado
        const telefonoResult = await cliente.db("ALEXASOFT").collection("configuracion").findOne({ Telefono: data.Telefono });
        if (telefonoResult) {
            telefonoRepetido = true;
        }
    } catch (error) {
        console.log(error);
    } finally {
        await cliente.close();
    }

    
    // Verificar campos repetidos
    if (cedulaRepetida) {
        return res.render("layouts/registro", { locals, error: "La cédula ya está registrada en la página" });
    } else if (correoRepetido) {
        return res.render("layouts/registro", { locals, error: "El correo ya está registrado en la página" });
    } else if (telefonoRepetido) {
        return res.render("layouts/registro", { locals, error: "El teléfono ya está registrado en la página" });
    } else if (data.Instagram && instagramRepetido) {
        return res.render("layouts/registro", { locals, error: "El Instagram ya está registrado en la página" });
    }

    //En caso de que no hayan variables repetidas...
    //Variable definidas
    var permisos = [];
    var nombreRol = "";
    var estadoRol = "";

    /*BUSCAR ROL EN COLECCION*/
    try {
        await cliente.connect()
        const rol = await cliente.db("ALEXASOFT").collection("roles").findOne({ Nombre_Rol: "Cliente" })

        const { Nombre_Rol, Estado, Permisos } = rol;
        //Llenar variables definidas
        permisos = Permisos;
        nombreRol = Nombre_Rol;
        estadoRol = Estado;

    } catch (error) {
        console.log(error)
    } finally {
        await cliente.close()
    }
    /*BUSCAR ROL EN COLECCION*/


    /*Organizar datos en el esquema*/
    const newUsuario = new usuario({
        Nombre_Usuario: data.Nombre_Usuario,
        Cedula: data.Cedula,
        Correo: data.Correo,
        Telefono: data.Telefono,
        Instagram: data.Instagram,
        Contrasena: data.Contrasena,
        Rol: {
            Nombre_Rol: nombreRol,
            Estado: estadoRol,
            Permisos: permisos
        }
    })
    /*Organizar datos en el esquema*/

    //Insertar Registro
    try {
        await usuario.create(newUsuario)
        await res.redirect("login")
    } catch (error) {
        console.log(error)
    }
}

    ;//Fin funcion
