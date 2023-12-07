/* Aquí el controlador hará que en el router de ventas extraía el contenido
    que se necesita o que esté dentro del router al exportar la página de
    inicio (exampleController.homepage).
*/

// # GET /ventas
// # Homepage

exports.homepage = async (req, res) => {
    const locals = {
        title: "AlexaSoft | Ventas",
        description: "Hola111"
    }
    res.render('layouts/ventas', locals)
}