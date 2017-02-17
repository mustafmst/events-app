var LocalStrategy = require('passport-local').Strategy;
var UserModel = require('../app/models/UserModel');

module.exports = function(passport){

  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
    UserModel.findById(id, function(err, user){
      done(err,user);
    })
  })

  passport.use('signup', new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, login, password, done){

    process.nextTick(function(){
      UserModel.findOne({'login': login}, function(err, user){
        if(err) return done(err);

        if(user){
          return done(null,false, req.flash('signupMessage', 'This login is taken.'));
        }else{
          var newUser = new UserModel();

          newUser.name = req.body.name;
          newUser.surname = req.body.surname;
          newUser.login = login;
          newUser.password = newUser.generateHash(password);

          newUser.save(function(err){
            if(err) throw err;
            return done(null,newUser);
          });
        }
      });
    });
  }));

  passport.use('login', new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, login, password, done){
    process.nextTick(function(){
      UserModel.findOne({'login': login}, function(err, user){
        if(err) return done(err);
        if(!user) return done(null,false,req.flash('loginMessage', 'There is no such user'));

        if(user.isPasswordValid(password)){
          return done(null,user);
        }

        return done(null,false,req.flash('loginMessage','Wrong password!'));
      });
    });
  }));
};
