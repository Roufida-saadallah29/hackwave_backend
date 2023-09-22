const db = require("../models");
const CATEGORIES = db.CATEGORIES;
const Report = db.report;

checkReportLen = (req, res, next) => {
  // Username


  //lenght check
  if (req.body.name.length < 3 ) {
    return res.status(200).send({
      message: "Le titre doit etre de au moins 3 caracteres !"
      //message: "Invalid Password or Username!"
    });
  }

  

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