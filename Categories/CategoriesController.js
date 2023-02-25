const express = require('express');
const router = express.Router();
const Category = require('./categorie');
const slugify = require('slugify');

 

router.get('/admin/categories/new',function(req,res){
    res.render('admin/categories/new');


});

router.post('/categories/save',function(req,res){
    var title = req.body.title;

    if(title != undefined){
        //Salvando no banco de dados
        Category.create({
            title : title,
            slug: slugify(title)
        }).then(() =>{
            res.redirect("/admin/categories");

        })

    }else{
        res.redirect('/admin/categories/new');
    }
    
});

router.get('/admin/categories',function(req,res){

    Category.findAll().then(categories => {

        //Mostrando as categorias salvas
        res.render('admin/categories/index', {categories: categories});

    })

});


//Deletando uma categoria
router.post('/categories/delete',function(req,res){
    var id = req.body.id;
    if(id != undefined){
        if (!isNaN(id)){

            Category.destroy({
                where: {
                    id : id
                }
            }).then(() => {
                res.redirect('/admin/categories');
            });
        
        }else{//ID não é um numero

            res.redirect('/admin/categories');

        }    
    }else{//ID null
        res.redirect('/admin/categories');


    }
    });

//Editando uma categoria

router.get('/admin/categories/edit/:id',function(req,res){
    var id = req.params.id;

    //Verificando id 
    if(isNaN(id)){
        res.redirect('/admin/categories');

    }
    Category.findByPk(id).then(category => {
        if(category != undefined){
            res.render('admin/categories/edit', {category: category});

        }else{
            res.redirect('/admin/categories');

        }
    }).catch(error => {
        res.redirect('/admin/categories');

    })


});

//Salvando no banco o update
router.post('/categories/update',function(req,res){
    var id = req.body.id;
    var title = req.body.title;
    
    //Atualizando o title e slug
    Category.update({title: title, slug : slugify(title)}, {
        where: {
            id : id
        }
    }).then(() =>{
        res.redirect('/admin/categories');

    })
    
});

module.exports = router;