const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    port:config.PORT,
    dialect: config.dialect,
    //operatorsAliases: false,
    operatorsAliases:0,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.Annee = require("./Annee.model.js")(sequelize,Sequelize);
db.Promo = require("../models/Promo.model.js")(sequelize,Sequelize);
db.Enseignant = require("../models/Enseignant.model.js")(sequelize,Sequelize);
db.Groupe = require("../models/Groupe.model.js")(sequelize,Sequelize);
db.Module= require("../models/Module.model.js")(sequelize,Sequelize);
db.EtudiantModule= require("../models/EtudiantModule.model.js")(sequelize,Sequelize);
db.Salle = require("../models/Salle.model.js")(sequelize,Sequelize);
db.EmploiDeTemps= require("./EmploiDeTemps.model.js")(sequelize,Sequelize);
db.EnseignantModul= require("../models/EnseignantModule.model.js")(sequelize,Sequelize);
db.Etudiant = require("./Etudiant.model.js")(sequelize,Sequelize);


db.user.hasMany(db.Enseignant,{
  foreignKey: "userId",
});
db.Enseignant.belongsTo(db.user);

db.user.hasMany(db.Etudiant,{
  foreignKey: "userId",
});
db.Etudiant.belongsTo(db.user);
/*db.Annee.insertMany([
  {_id:01, nom: "2021/2022"}
]);

/*db.Groupe.insertMany([

])*/

// db.Module.belongsToMany(db.Enseignant,{
//   through: "EnseignantModule",
//   foreignKey: "ModuleId",
//   otherKey: "EnseignantId",
//   });
//   db.Module.belongsToMany(db.Etudiant,{
//     through: "EtudiantModule",
//     foreignKey: "ModuleId",
//     otherKey: "EtudiantId",
//     });
/*db.Etudiant.belongsTo(db.Groupe);
db.Groupe.belongsTo(db.Promo);
db.Promo.hasMany(db.Groupe,{
  foreignKey: ["PromoId","Promo_nom"],
});
db.Groupe.hasMany(db.Etudiant,{
  foreignKey: ["GroupeId","PromoId","Promo_nom"],
});*/
/*db.EmploiDuTemps.belongsTo(db.Heure, {
  foreignKey:"Volume_heure",
});
db.EmploiDuTemps.belongsTo(db.Promo,{
  foreignKey: "PromoId",
});
db.EmploiDuTemps.belongsTo(db.Salle,{
  foreignKey: "SalleId",
});
db.EmploiDuTemps.belongsTo(db.EnseignantModul);
/*
db.category.hasMany(db.report, {
  foreignKey: "categoryId",
});

db.report.belongsTo(db.category);
*/

/*, {
  through: "user_reports",
});


*/
/*********************  raports/************ */
module.exports = db;