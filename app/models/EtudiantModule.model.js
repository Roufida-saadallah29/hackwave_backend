module.exports = (sequelize, Sequelize) => { 
    const EtudiantModule = sequelize.define("EtudiantModule", { 
        Id: { 
            type: Sequelize.INTEGER, 
            primaryKey: true,
            autoIncrement: true  
          }, 
        NoteEMD1:{
            type: Sequelize.DECIMAL, 
        },
        NoteEMD2:{
            type: Sequelize.DECIMAL, 
        },
        NoteTD:{
            type: Sequelize.DECIMAL, 
        },
        Moyenne:{
            type: Sequelize.DECIMAL, 
        },
        Remarque:{
            type: Sequelize.STRING,
        },
        moduleId: {
            type: Sequelize.INTEGER,
            allowNull: false, // Make 'anneescolariteId' a required field
            references: {
                model: 'modules',
                key: 'Id'
            }
        },
        moduleName: { 
            type:Sequelize.STRING, 
          } , 
        PromoId: {
            type: Sequelize.INTEGER,
            allowNull: false, // Make 'anneescolariteId' a required field
            references: {
                model: 'promos',
                key: 'id'
            }
        },
        EtudiantId: {
            type: Sequelize.INTEGER,
            allowNull: false, // Make 'anneescolariteId' a required field
            references: {
                model: 'etudiants',
                key: 'Id'
            }
        }
    }, {
        uniqueKeys: {
          unique_note: {
            fields: ['moduleId', 'EtudiantId']
          }
        }
      }
      );
    return EtudiantModule;
};