import mysql from 'mysql';
import { 
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_USER,
    DB_PORT
} from './configD.js';

async function conexion(){
    try {
        const conectar = await mysql.createConnection({
            host: DB_HOST,
            port: DB_PORT,
            database: DB_NAME,
            username: DB_USER,
            password: DB_PASSWORD
        });

        console.log('Conexion a MySQL establecida');

        conectar.query('SELECT * FROM usuarios', (error, results) => {
            if (error) throw error;
        
            const users = [];
            results.forEach(row => {
                users.push(row);
            });
        
            console.log(users);
        });
        
        
        return conectar;
    } catch (error) {
        console.error('Error al conectar a MySQL; ', error);
        throw error;
    }
}

export default conexion()




/*

        
        conectar.query('SELECT * FROM usuarios', (err, results) => {
            if (err) throw err;
        
            const users = [];
            results.forEach(row => {
                users.push(row);
            });
        
            console.log(users);
        });
*/