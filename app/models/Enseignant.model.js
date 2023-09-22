module.exports = (sequelize, Sequelize) => { 
    const Enseignant = sequelize.define("enseignants", { 
     Id: { 
       type: Sequelize.INTEGER, 
       primaryKey: true,
       autoIncrement: true  
     }, 
     userId: { 
        type: Sequelize.INTEGER, 
        foreignKey: true 
      }, 
      Grade:{
          type: Sequelize.STRING,
      },
      civil_status:{
        type:   Sequelize.ENUM, 
        values: ['Marié','Célibataire'] ,
      }
    });
    return Enseignant;
};