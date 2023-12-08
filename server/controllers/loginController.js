exports.login = async (req, res) => {
    const usuarios = {
        title: "AlexaSoft | Ventas",
        description: "Hola111"
    }
    res.render('layouts/login', usuarios)
}