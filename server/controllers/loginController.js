const { MongoClient} = require("mongodb")
const uri = "mongodb+srv://samuel:alexasoft@cluster0.dqbpzak.mongodb.net/"

//Renderizar Login
exports.login = async (req, res) => {
    const locals = {
        title: 'AlexaSoft | Login',
        description: 'Página Login',
        req: req
    };
    if (req.session.loggedin === true) {
        res.redirect("admin");
    } else {
        res.render("layouts/login", { error: "", locals});
    }
};//Fin funcion

//Validar Formulario
exports.verificarSesion = async (req, res) => {
    const locals = {
        title: 'AlexaSoft | Login',
        description: 'Página Login',
        req: req
    };
    //Datos del formulario
    const data = req.body;
    const cliente = new MongoClient(uri)
        try {
            await cliente.connect()
            const usuario = await cliente.db("ALEXASOFT").collection("configuracion").findOne({ Correo: data.correo }, { Contrasena:1, Rol:1})
            
            if (usuario) {
                const {Contrasena, _id, Rol} = usuario
                if (data.contrasena != Contrasena) {
                    res.render("layouts/login", { error: "Contraseña incorrecta" , locals });
                } else {
                    req.session.loggedin = true;
                    req.session.idUsuario = _id;
                    req.session.rol = Rol.Nombre_Rol;
                    res.redirect("/")
                }
            } else {
                res.render("layouts/login", { error: "Usuario no encontrado", locals });
            }
        } catch (error) {
            console.log(error)
        } finally {
            await cliente.close()
        }

};//Fin funcion

//Cerrar Sesión
exports.cerrarSesion = (req, res) => {
    if (req.session.loggedin === true) {
        req.session.destroy();
    }
    res.redirect("/");
};//Fin funcion
