//Carregando módulo do express
const express = require('express');
const app = express();

//Carregando módulo de ejs
app.set('view engine', 'ejs');

//Carregando o body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Carregando arquivos estáticos
app.use(express.static('public'));

//Importando categoriesController
const categoriesController = require('./Categories/CategoriesController');
const articlesController = require('./Articles/ArticlesController');
const usersController = require('./User/UserController');


const Article = require('./Articles/article.js');
const Category = require('./Categories/categorie.js');
const User = require('./User/user.js');







//Carregando conexão com o banco de dados
const connection = require('./database/database')
connection.authenticate().then(() => {
    console.log("Connection has been established successfully.");

}).catch((error) =>{
    console.log(error);
    
});

app.use("/", categoriesController);

app.use("/",articlesController);

app.use("/",usersController);




app.get('/', (req, res) => {
    Article.findAll({
        order:[
            ['id','DESC']
        ],
        limit: 4
    }
    ).then(articles => {
        Category.findAll().then(categories =>{
            res.render('index', {articles: articles, categories : categories});


        })
        
    })
   
});


app.get('/:slug',function(req,res){
    var slug = req.params.slug;
    Article.findOne({

        where: {slug: slug}
    }).then(article =>{
        if(article != undefined){
           
            Category.findAll().then(categories =>{
                res.render('article', {article: article, categories : categories});
            });


        }else{
            res.redirect('/');
        }
    }).catch(error =>{
        res.redirect('/');

    })
})

app.get('/categories/:slug',function(req,res){
    var slug = req.params.slug;

    Category.findOne({
        where : {
            slug : slug
            
        },
        include : [{model: Article}]
    }).then(category =>{
        if(category != undefined){
            Category.findAll().then(categories =>{
                res.render("index", {articles : category.articles, categories : categories});
                })
        
        }else{
            res.redirect('/');

        }

    }).catch(error =>{
        res.redirect('/');
        
    })
    

})

//Configurando porta do servidor
app.listen(3000);
