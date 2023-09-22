
module.exports = (sequelize, Sequelize) => { 
  const Promo = sequelize.define("promos", { 
    id: { 
      type: Sequelize.INTEGER, 
      primaryKey: true,
      autoIncrement: true 
    }, 
    nom: { 
      type: Sequelize.ENUM, 
      values: ['L1', 'L2', 'L3'],
      allowNull: false, // Make 'nom' a required field
    }, 
    specialite: { 
      type: Sequelize.ENUM, 
      values: ['Informatique', 'Management'],
      allowNull: false, // Make 'nom' a required field
    }, 
    anneescolariteId: {
      type: Sequelize.INTEGER,
      allowNull: false, // Make 'anneescolariteId' a required field
      foreignKey: true ,
      references: {
        model: 'annees',
        key: 'Id'
      } 
    }
  }, {
    uniqueKeys: {
      unique_nom_anneescolarite: {
        fields: ['nom', 'anneescolariteId','specialite']
      }
    }
  }); 
  
  return Promo;
};
