module.exports = function(app, passport){

  //Index page
  app.get('/', function(req,res){
    res.render('../views/pages/index.ejs', {message: req.flash('homeMessage')});
  });

  //signup
  app.get('/signup', function(req,res){
    res.render('../views/pages/signup.ejs', {message: req.flash('signupMessage')});
  })

  app.post('/signup', passport.authenticate('signup',{
    successRedirect: '/',
    successFlash: true,
    failureRedirect: '/signup',
    failureFlash: true,
  }));
  //Login
};
