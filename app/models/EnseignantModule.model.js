

module.exports = (sequelize, Sequelize) => { 
    const EnseignantModule = sequelize.define("EnseignantModule", { 
      Id: { 
          type: Sequelize.INTEGER, 
          primaryKey: true,
          autoIncrement: true  
        }, 
        Type:{
            type:   Sequelize.ENUM, 
              values: ['Cours','TD','TP'],
          },
        FilePath:{
           type:Sequelize.BLOB('long'),
        },
        FileName:{
            type:Sequelize.STRING,
        },
        PromoID: {
          type: Sequelize.INTEGER,
          allowNull: false, // Make 'anneescolariteId' a required field
          foreignKey: true ,
          references: {
              model: 'promos',
              key: 'Id'
          }
         },
         moduleId: {
          type: Sequelize.INTEGER,
          allowNull: false, // Make 'anneescolariteId' a required field
          foreignKey: true ,
          references: {
              model: 'modules',
              key: 'Id'
          }
         },
          GroupeId: {
          type: Sequelize.INTEGER,
          allowNull: false, // Make 'anneescolariteId' a required field
          foreignKey: true ,
          references: {
            model: 'groupes',
            key: 'Id'
        }
         },

      });
      
  
      //Groupe.belongsto(SectionModel);
      return EnseignantModule;
  };





// module.exports = (sequelize, Sequelize) => { 
//     const EnseignantModule = sequelize.define("EnseignantModule", { 
//       Id: { 
//         type: Sequelize.INTEGER, 
//         primaryKey: true,
//         autoIncrement: true  
//       }, 
//         Type:{
//             type:   Sequelize.ENUM, 
//               values: ['Cours','TD','TP'],
//           },
//         FilePath:{
//            type:Sequelize.BLOB('long'),
//         },
//         FileName:{
//             type:Sequelize.STRING,
//         },
//         PromoID:{
//             type: Sequelize.INTEGER,
//             references: {
//               model: 'promos',
//               key: 'Id'
//               } 
//           },
//          GroupeId: {
//             type: Sequelize.INTEGER,
//             references: {
//               model: 'groupes',
//               key: 'Id'
//           }
//          },
//          Semestre: { 
//             type: Sequelize.ENUM,  
//             values: ['S1','S2'] ,
//           }, 
//     });
//     return EnseignantModule;
// };