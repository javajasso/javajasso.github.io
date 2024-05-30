import mongoose from 'mongoose'

//mongodb://localhost:27017/edumateskids
const DB_URI = 'mongodb://localhost:27017/edumateskids'

async function conexion(){
    try {

       await mongoose.connect(
            DB_URI
        )
        console.log("Conexion Exitosa a MongoDB")
        
    }catch (error) {
        console.error('Error al conectar a MongoDB; ', error);
        throw error;
    }
}

export default conexion()
    



