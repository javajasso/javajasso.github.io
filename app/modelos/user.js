import mongoose from 'mongoose'

const { Schema, model } = mongoose;

const usuariosSchema = new Schema(
    {
        user: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String
        },
        verificado: {
            type: Boolean
        }
        
    }
)

const usuarios = model('usuarios', usuariosSchema);

export default usuarios;

 

