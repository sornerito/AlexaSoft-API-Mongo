/* Aquí el controlador hará que en el router de ventas extraía el contenido
    que se necesita o que esté dentro del router al exportar la página de
    inicio (exampleController.homepage).
*/

const { MongoClient, ObjectId } = require("mongodb");
const modelVentas = require('../models/modelVentas');
const uri = "mongodb+srv://samuel:alexasoft@cluster0.dqbpzak.mongodb.net/";

// Renderizar configuracion
exports.verVentas = async (req, res) => {
  const locals = {
    title: 'AlexaSoft | Ventas',
    description: 'Página Ventas',
    req: req
  };

  const ventasClient = new MongoClient(uri);

  try {
    await ventasClient.connect();
    const ventasCollection = ventasClient.db("ALEXASOFT").collection("ventas");
    const ventasData = await ventasCollection.find().toArray();
    res.render("layouts/ventas", { error: "", locals, datos: ventasData });
  } catch (error) {
    console.error("Error al obtener datos de ventas:", error);
    // Puedes manejar el error de otra manera si es necesario
    res.render("layouts/ventas", { error: "Error al obtener datos de ventas", locals, datos: [] });
  } finally {
    await ventasClient.close();
  }
};// Fin funcion

/**
 * GET /
 * New Customer Form
 */
exports.addVentas = async (req, res) => {

  const locals = {
    title: 'AlexaSoft | Ventas Añadir',
    description: 'Página Ventas Añadir',
  };

  res.render("crearGeneral/addVentas", locals);
};

/**
 * POST /
 * Create New Customer
 */

exports.postVentas = async (req, res) => {

  const { nombreColaborador, cedulaColaborador, nombreCliente } = req.body;


  const fechaActual = new Date();
  const fechaCotizacion = fechaActual
    .toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })
    .replace(/\//g, '-');
  const fechaFormateada = fechaActual
    .toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
    .replace(/\//g, '');

  // Obtener el último número de factura de la colección de ventas en MongoDB
  const ultimoNumero = await modelVentas.findOne({}, { numeroFactura: 1 }, { sort: { numeroFactura: -1 } });

  let nuevoNumero = 1;
  if (ultimoNumero) {

    const ultimoDigitoYear = ultimoNumero.numeroFactura.match(/\d(\d)$/);

    if (ultimoDigitoYear) {
      nuevoNumero = parseInt(ultimoDigitoYear[1]) + 1;
    }
  }

  const numFac = "VEN" + fechaFormateada + nuevoNumero.toString();

  // Crear un nuevo documento para la colección de ventas
  const newVentas = new modelVentas({
    numeroFactura: numFac,
    Fecha: new Date(),
    Colaborador: {
      Nombre_Colaborador: nombreColaborador,
      Cedula: cedulaColaborador,
      Estado: 'Activo'
    },
    Cotizacion: {
      Fecha_Creacion: fechaCotizacion,
      Fecha_Finalizacion: fechaCotizacion,
      Estado: 'Espera',
      Cliente: {
        Nombre_Cliente: nombreCliente,
        //     Cedula: req.body.Cedula,
        //     Correo: req.body.Correo,
        //     Telefono: req.body.Telefono
      },
      //   Detalles_Cotizacion: {
      //     Productos: [{
      //       Nombre_Producto: req.body.Nombre_Producto,
      //       Precio: req.body.Precio,
      //       Unidades: req.body.Unidades,
      //       Subtotal: req.body.Subtotal
      //     }]
      //   },
      //   Total: req.body.Total
    },
    redirect: "/ventas"
  });

  try {
    await modelVentas.create(newVentas);
    res.redirect("/ventas");
  } catch (error) {
    console.log(error);
  }
};

exports.borrarVentas = async (req, res) => {
  const locals = {
    title: 'AlexaSoft | Ventas',
    description: 'Página Ventas',
    req: req
  };

  const idVentas = req.params.id;
  console.log("ID DE CONTROLADOR", idVentas)

  try {
    const ventas = await MongoClient.connect(uri);
    const result = await ventas.db("ALEXASOFT").collection("ventas").deleteOne({ _id: new ObjectId(idVentas) });

    if (result.deletedCount === 1) {
      res.redirect("/ventas");
    } else {
      res.status(404).send("Venta no encontrada");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar la venta");
  }
};
