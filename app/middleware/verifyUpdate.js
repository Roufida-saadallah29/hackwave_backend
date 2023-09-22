const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrLen = (req, res, next) => {
  // Username



  //lenght check
  if (req.body.username ) {
    if (req.body.username.length < 3) {
      return res.status(200).send({
        message: "Le Nom d'utilisateur doit etre au moins de 3 caracteres !"
        //message: "Invalid Password or Username!"
      });
    }
  }
  if ( req.body.phoneTel) {
    if (req.body.phoneTel.length != 9) {
      return res.status(200).send({
        message: "Le numéro de téléphone doit etre au 9 chiffres  !"
        //message: "Invalid Password or Username!"
      });
    }
  }
  //lenght check
  if (req.body.password||req.body.newpassword || req.body.confirmpassword) {
    if (req.body.newpassword.length < 6 ) {
      return res.status(200).send({
        message: "Le nouveau mot de passe doit etre au moins de 6 caracteres "
        //message: "Invalid Password or Username!"
      });
    }
  }



  next();


};



const verifyUpdate = {
  checkDuplicateUsernameOrLen: checkDuplicateUsernameOrLen,
};

module.exports = verifyUpdate;
