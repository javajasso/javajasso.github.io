import mongoose from 'mongoose'

const { Schema, model } = mongoose;

const operacionSchema = new Schema(
    {
        nameUser: {
            type: String
        },
        nameOper: {
            type: String
        },
        nivel: {
            type: Number, default: 0
        },
        
        fecha: {
            type: Date, 
            default: Date.now
        }
        
    }
)

const operacion = model('operacion', operacionSchema);

export default operacion;
