const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    host: 'localhost',
    port: 3306,
    database: 'edumates',
    username: 'root',
    password: '',
    dialect: 'mysql'
});

module.exports = {
    sequelize
}

