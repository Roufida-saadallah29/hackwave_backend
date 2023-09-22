
var DataTypes = require('sequelize/lib/data-types');
module.exports = (sequelize, Sequelize) => { 
    const EmploiDeTemps = sequelize.define("emploiDeTemps", { 
    Id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true
      }, 

    GroupeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'groupes',
          key: 'Id'
      }
    },
    ModuleId:{
        type: Sequelize.INTEGER,
        references: {
          model: 'modules',
          key: 'Id'
      }
    },
    Type:{
        type: Sequelize.ENUM,
        values: ['cour','TD','TP'] ,
    },
    SalleID:{
        type: Sequelize.STRING,
        references: {
          model: 'salles',
          key: 'SalleNom'
      }       
    },
    Jour:{
        type:   Sequelize.ENUM, 
        values: ['Dimanche','Lundi', 'Mardi','Mercredi','Jeudi','Vendredi','Samedi'] ,
    },
    hourDebut: {
        type: DataTypes.TIME,
       // defaultValue: '00:00:00',
    },
    hourFin: {
        type: DataTypes.TIME,
        //defaultValue: '00:00:00',
    },
    EnseignantId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'enseignants',
          key: 'Id'
      }
    },

});
   
    return EmploiDeTemps;
  };
