const fileUpload = require('express-fileupload');
const express = require("express");
const cors = require("cors");

const app = express();


// Enable file uploads
app.use(fileUpload());

var corsOptions = {
  origin: "http://192.168.30.22:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");


//db.sequelize.sync();
// force: true will drop the table if it already exists

db.sequelize.sync({ force: false }).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to IBN rochd platforme " });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/AdminEtudiant.routes')(app);
require('./app/routes/AdminEnseignant.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/emplois.routes')(app);
// db.Annee.create({
//   nom: "2023/2024",
// });
// db.Annee.create({
//   nom: "2023/2024",
// });

// db.Promo.create({
//   nom:"L1",
//   anneescolariteId:01,
//   specialite:"Informatique",

// });
// db.Promo.create({
//   nom:"L2",
//   anneescolariteId:01,
//   specialite:"Informatique",

// });
// db.Promo.create({
//   nom:"L3",
//   anneescolariteId:01,
//   specialite:"Informatique",

// });


// db.Promo.create({
//   nom:"L1",
//   anneescolariteId:01,
//   specialite:"Management",

// });
// db.Promo.create({
//   nom:"L2",
//   anneescolariteId:01,
//   specialite:"Management",

// });
// db.Promo.create({
//   nom:"L3",
//   anneescolariteId:01,
//   specialite:"Management",

// });
// db.Groupe.create({
//   nom:"G1", 
//   PromoId:01
// });
// db.Groupe.create({
//   nom:"G1", 
//   PromoId:02
// });
// db.Groupe.create({
//   nom:"G2", 
//   PromoId:01
// });
db.Module.create({
  nom:"ALGO1", 
  PromoID:01,
  Semestre:"S1"
  
});
db.Module.create({
  nom:"ARCHI2", 
  PromoID:02,
  Semestre:"S1"
  
});
db.Module.create({
  nom:"POO", 
  PromoID:02,
  Semestre:"S1"
  
 });

 
 db.Groupe.create({
  nom:"G3", 
  PromoId:01
});
// db.Promo.create({
//   nom:"L1",
//   anneScorlariteeID:01
// });
// db.Promo.create({
//   nom:"L2",
//   anneScorlariteeID:01
// });
// db.Promo.create({
//   nom:"L3",
//   anneScorlariteeID:01
// });
//require('./app/routes/photo.routes')(app);

/* db.Annee.create({
    nom: "2021/2022",
  });
  db.Promo.create({
    nom:"1CP",
    anneScorlariteeID:01
  });
  db.Promo.create({
    nom:"2CP", 
    anneScorlariteeID:01
  });
  db.Promo.create({
    nom:"1SC", 
    anneScorlariteeID:01
  });
  db.Promo.create({
    nom:"2SC", 
    anneScorlariteeID:01
  });
  db.Promo.create({
    nom:"3SC", 
    anneScorlariteeID:01
  });

  db.Groupe.create({
    nom:"G1", 
    PromoId:03
  });
  db.Groupe.create({
    nom:"G2",
    PromoId:03
  });
  db.Groupe.create({
    nom:"G3", 
    PromoId:03
  });
  db.Groupe.create({
    nom:"G4", 
    PromoId:03
  });
  db.Groupe.create({
    nom:"G5", 
    PromoId:03
  });
  db.Groupe.create({
    nom:"G6", 
    PromoId:03
  });*/
  // const controller= require("../controllers/SupprimerEtudiant.controller");
  // controller.SuppEtudiant;
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT,'192.168.30.77', () => {
  console.log(`Server is running on port ${PORT}.`);
});
// add this comment


  
  

  /********************************************** */


