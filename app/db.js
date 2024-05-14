import mysql from 'mysql';

async function conexion(){
    try {
        const conectar = await mysql.createConnection({
            host: '127.0.0.1',
            port: 3306,
            database: 'edumates',
            username: 'developer',
            password: 'Developerweb1'
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