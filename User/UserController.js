const express = require('express');
const router = express.Router();
const User = require('./user');
//Importando o bcrypt para fazer o hash de senha
const bcrypt = require('bcryptjs');


router.get('/admin/users',function(req,res){

    User.findAll({
        order:[
            ['id','ASC']

        ]
    }).then(users => {

        //Mostrando a lista de usuários
        res.render('admin/User/index', {users: users});


    })
 
});



router.get('/admin/users/create',function(req, res){
    res.render('admin/User/create')

});

router.post('/users/create',function(req,res){

    //Nomes que colocamos nos campos do html
    var email = req.body.email;
    var password = req.body.password;


    //Verificando se o email existe
    User.findOne({where: {email : email}}).then( user => {
        if(user == undefined){
            //Fazendo o hash
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);
              
            //Testando se o form está ligado ao backend
            // res.json({email:email,password:password});
        
            User.create({
                email:email,password:hash
            }).then(() =>{
                res.redirect('/');
            }).catch(error =>{
                res.redirect('/')
            })
            

        }else{
            res.redirect('/admin/users/create')
        }
    })


    
    
})



module.exports = router;