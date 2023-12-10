const usuario = require("../models/modelConfiguracion")
const { MongoClient } = require("mongodb")
const uri = "mongodb+srv://samuel:alexasoft@cluster0.dqbpzak.mongodb.net/"

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
    //Datos del formulario
    const data = req.body;
    /*console.log(data)*/ //Mostrar datos formulario

    var permisos = []; //Variable definida
    var nombreRol = "";
    var estadoRol = "";

    /*BUSCAR ROL EN COLECCION*/
    const cliente = new MongoClient(uri)
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

    const newUsuario = new usuario({})


};//Fin funcion
