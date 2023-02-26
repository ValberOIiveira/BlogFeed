const express = require('express');
const router = express.Router();
const User = require('./user')

router.get('/admin/users',function(req,res){
    res.send("Listagem de usuários");
 
});


router.get('/admin/users/create',function(req, res){
    res.render('admin/User/create')

});

router.post('/users/create',function(req,res){
    var email = req.body.email;
    var password = req.body.password;
      
    //Testando se o form está ligado ao backend
    res.json({email:email,password:password});
    


})



module.exports = router;