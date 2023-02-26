const Sequelize = require('sequelize')
const connection = require('../database/database')

const User = connection.define('users', {
    email:{
        type: Sequelize.STRING,
        allowNull: false

    },password : {
        type: Sequelize.STRING,
        allowNull: false

    }



});

//Depois da tabela ser feita apagar essa linha
// User.sync({force: true});


module.exports = User;

