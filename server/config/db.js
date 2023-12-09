const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const connectBD = async () => {
    try {
        const conexion = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Base de datos conectada: ${conexion.connection.host} (ALEXASOFT)`);
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectBD;