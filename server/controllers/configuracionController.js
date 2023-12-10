const { MongoClient} = require("mongodb")
const uri = "mongodb+srv://samuel:alexasoft@cluster0.dqbpzak.mongodb.net/"

//Renderizar configuracion
exports.verUsuarios = async (req, res) => {
    const locals = {
        title: 'AlexaSoft | Configuracion',
        description: 'Página Configuracion',
        req: req
    };
    if (req.session.loggedin != true) {
        res.redirect("login");
    } else {
        res.render("layouts/configuracion", { error: "", locals});
    }
};//Fin funcion

exports.verEditarUsuario = async (req,res)=>{
}//fin funcion
exports.editarUsuario = async (req,res)=>{
}//fin funcion
exports.borrarUsuario = async (req,res)=>{
}//fin funcion