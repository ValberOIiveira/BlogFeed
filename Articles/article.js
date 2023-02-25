const Sequelize = require('sequelize')
const connection = require('../database/database')

const Category = require('../Categories/categorie')

const Article = connection.define('articles', {
    title:{
        type: Sequelize.STRING,
        allowNull: false

    },slug : {
        type: Sequelize.STRING,
        allowNull: false

    },body : {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Category.hasMany(Article) // Uma categoria tem muitos artigos

Article.belongsTo(Category) // Um artigo pertence a uma categoria

// Article.sync({force:true});


//Depois da tabela ser feita apagar essa linha
//Article.sync({force : true});

module.exports = Article;