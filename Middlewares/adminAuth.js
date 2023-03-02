function adminAuth(req, res, next) {
    if(req.session.user != undefined){
        next();
    }else{
        //Se não estiver logado, redireciona para a home page
        res.redirect('/login');
    }

}


module.exports = adminAuth;