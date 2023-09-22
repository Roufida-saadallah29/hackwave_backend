

module.exports = (sequelize, Sequelize) => {
    const Groupe =sequelize.define("groupes",{
        Id: { 
            type: Sequelize.INTEGER, 
            primaryKey: true,
            autoIncrement: true  
          }, 
        nom: { 
            type:   Sequelize.ENUM, 
            values: ['G1', 'G2', 'G3'] ,
            allowNull: false, // Make 'nom' a required field
          } ,     
        PromoId: {
            type: Sequelize.INTEGER,
            allowNull: false, // Make 'anneescolariteId' a required field
            foreignKey: true ,
            references: {
                model: 'promos',
                key: 'Id'
            }
           },

        }, {
            uniqueKeys: {
              unique_nom_anneescolarite: {
                fields: ['nom', 'PromoId']
              }
            }
          });
        
    
        //Groupe.belongsto(SectionModel);
        return Groupe;
    };