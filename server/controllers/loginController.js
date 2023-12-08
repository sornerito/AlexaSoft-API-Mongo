const { MongoClient, ObjectId } = require("mongodb")
const uri = "mongodb+srv://samuel:alexasoft@cluster0.dqbpzak.mongodb.net/"

//Renderizar Login
exports.login = async (req, res) => {
    if (req.session.loggedin != true) {
        res.render("layouts/login", { error: "" });
    } else {
        res.redirect("admin")
    }
};//Fin funcion

//Validar Formulario
exports.verificarSesion = async (req, res) => {
    //Datos del formulario
    const data = req.body;
    const cliente = new MongoClient(uri)
        try {
            await cliente.connect()
            const usuario = await cliente.db("ALEXASOFT").collection("configuracion").findOne({ Correo: data.correo }, {Correo:1, Contrasena:1})
            
            if (usuario) {
                const {Contrasena, _id} = usuario
                if (data.contrasena != Contrasena) {
                    res.render("layouts/login", { error: "Contraseña incorrecta" });
                } else {
                    req.session.loggedin = true;
                    req.session.idUsuario = _id
                    res.redirect("/")
                }
            } else {
                res.render("layouts/login", { error: "Usuario no encontrado" });
            }
        } catch (error) {
            console.log(error)
        } finally {
            await cliente.close()
        }

};//Fin funcion

//Cerrar Sesión
exports.cerrarSesion = (req, res) => {
    if (req.session.loggedin == true) {
        req.session.destroy();
    }
    res.redirect("/")
};//Fin funcion
