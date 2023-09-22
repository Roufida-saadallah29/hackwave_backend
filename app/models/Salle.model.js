module.exports = (sequelize, Sequelize) => {
    const Salle =sequelize.define("salles",{
        SalleNom:{
            type: Sequelize.STRING,
            primaryKey: true
        },

        Type: { 
            type: Sequelize.STRING,            
          }, 
        Capacité:{
            type: Sequelize.INTEGER,
        }
        });

        return Salle;
    };