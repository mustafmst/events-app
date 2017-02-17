module.exports = function(app, passport){

  //Index page
  app.get('/', function(req,res){
    res.render('../views/pages/index.ejs');
  });

  //Login
};
