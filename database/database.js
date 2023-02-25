//Criando a conexão com o banco de dados

const Sequelize = require('sequelize');

//O Sequelize suporta vários bancos
const connection = new Sequelize('blogfeed', 'root', 'batatinhafrita1@', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});


module.exports = connection;
