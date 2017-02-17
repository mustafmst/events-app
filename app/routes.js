module.exports = function(app, passport){

  //Index page
  app.get('/', function(req,res){
    res.render('../views/pages/index.ejs');
  });

  //signup
  app.get('/signup', function(req,res){
    res.render('../views/pages/signup.ejs', {message: req.flash('signupMessage')});
  })

  //Login
};
