const express = require('express');
const router = express.Router();
const Category = require('../Categories/categorie');
const Article = require('./article');
const Slugify = require('slugify');



router.get('/admin/articles',function(req,res){
    Article.findAll({
        include: [{model: Category}]
    }).then(articles=>{
        res.render('admin/articles/index_articles', {articles:articles})

    })
  
});

router.get('/admin/articles/new',function(req,res){
    Category.findAll().then(categories =>{
        res.render('admin/articles/new', {categories:categories});

    })

});

//Salvando artigos
router.post('/articles/save',function(req,res){
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.create({
        title: title,
        slug: Slugify(title),
        body : body,
        categoryId: category
      }).then(() => {
        res.redirect("/admin/articles");
      })
    });

//Deletando uma categoria
router.post('/articles/delete',function(req,res){
    var id = req.body.id;
    if(id != undefined){
        if (!isNaN(id)){

            Article.destroy({
                where: {
                    id : id
                }
            }).then(() => {
                res.redirect('/admin/articles');
            });
        
        }else{//ID não é um numero

            res.redirect('/admin/articles');

        }    
    }else{//ID null
        res.redirect('/admin/articles');


    }
    });

router.get('/admin/articles/edit/:id', function(req,res){
    var id = req.params.id;
    Article.findByPk(id).then(article =>{
        if(article!= undefined){
            Category.findAll().then(categories =>{
                res.render("admin/articles/edit", {categories:categories, article : article});


            })

        }else{
            res.redirect('/');
        }
    }).catch(error => {
        res.redirect('/');

    })
})   


//Salvando o update no banco
//Pegar a rota e colocar no action do formulário

router.post('/articles/update',function(req,res){

    //Chamando as variaveis que receberam os dados
    var id = req.body.id
    var title = req.body.title
    var body = req.body.body
    var category = req.body.category

    Article.update({
        //Selecionando os campos que serão atualizados
        title: title,
        body: body,
        categoryId: category,
        slug: Slugify(title)
        
    }, {where: {
        id : id
    //Oque acontecerá depois do update

    } }).then(() => {
        res.redirect('/admin/articles');

    }).catch(error => {
        res.redirect('/');

    })

})


//Limitando quantos artigos serão exibidos na pagina
router.get('/articles/page/:num',function(req,res){
    var page = req.params.num;
    var offset = 0

    if(isNaN(page || page == 1)){
        offset = 0;

    }else{
        offset = parseInt((page) - 1) * 4;
    }

    Article.findAndCountAll({
        limit: 4,
        offset: offset,
        order:[
            ['id','DESC']
        ]
    }
    ).then(articles =>{

        var next;

        if(offset + 4 >= articles.count){
            next = false;
        }else{
            next = true;
        }


        var result = {
            page : parseInt(page),
            next: next,
            articles : articles
        }

        Category.findAll().then(categories =>{
            res.render('admin/articles/page',{result: result, categories: categories})

        });
        
        
        
    
    })


})







module.exports = router;