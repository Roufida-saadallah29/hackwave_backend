const db = require("../models");
const CATEGORIES = db.CATEGORIES;
const Report = db.report;

checkReportLen = (req, res, next) => {
  // Username


  //lenght check
  if (req.body.title.length < 3 ) {
    return res.status(200).send({
      message: "Le titre doit etre de au moins 3 caracteres !"
      //message: "Invalid Password or Username!"
    });
  }
  if ( req.body.description.length < 3 ) {
    return res.status(200).send({
      message: "La description doit etre de au moins 3 caracteres !"
      //message: "Invalid Password or Username!"
    });
  }
 
  if ( req.body.site.length < 3 ) {
    return res.status(200).send({
      message: "Veuillez indiquez le site !"
      //message: "Invalid Password or Username!"
    });
  }
  if ( req.body.etage.length < 3 ) {
    return res.status(200).send({
      message: "Veuillez indiquez l'étage !"
      //message: "Invalid Password or Username!"
    });
  }
  if ( req.body.salle.length < 3 ) {
    return res.status(200).send({
      message: "Veuillez indiquez la salle  !"
      //message: "Invalid Password or Username!"
    });
  }
  if (req.body.category.length < 1 ) {
    return res.status(200).send({
      message: "Veillez choisir une categorie"
      //message: "Invalid Password or Username!"
    });
  }
/*
  if ( req.body.dateOf.length < 1) {
    return res.status(200).send({
      message: "Veillez indiquez la date et heure!"
      //message: "Invalid Password or Username!"
    });
  }*/
  next();
};

/*
checkCategoriesExisted = (req, res, next) => {
  if (req.body.categories) {
    for (let i = 0; i < req.body.categories.length; i++) {
      if (!CATEGORIES.name.includes(req.body.categories[i])) {
        res.status(200).send({
          message: "Failed! Category does not exist = " + req.body.categories[i]
        });
       
      }
    }
  }

  next();
};*/

const verifyReport = {
  checkReportLen: checkReportLen,
//checkCategoriesExisted: checkCategoriesExisted
};

module.exports = verifyReport;