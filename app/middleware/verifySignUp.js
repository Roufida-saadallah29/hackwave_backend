const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(200).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(200).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

       //lenght check
       if (req.body.username.length < 3  ){
        return res.status(200).send({
        message: "Le Nom d'utilisateur doit etre au moins de 3 caracteres !"
        //message: "Invalid Password or Username!"
       });
      }
      if ( req.body.phoneTel.length != 10  ){
        return res.status(200).send({
        message: "Le numéro de téléphone doit etre au 10 chiffres  !"
        //message: "Invalid Password or Username!"
       });
      }
      if ( req.body.password.length <6 ){
        return res.status(200).send({
        message: "Le mot de passe doit etre au moins de 6 caracteres "
        //message: "Invalid Password or Username!"
       });
      }

      let em = req.body.email.toString(); 
      let domain = em.split("@")[1]; // Saves user input after the @ (at)
      if ( domain != "esi-sba.dz"){ // checks if the user entered a esi-sba.dz domain after @
      return res.status(200).send({
        message: "Invalid address mail. Please write your gmail address like this: username@esi-sba.dz"
       }); }
      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;
