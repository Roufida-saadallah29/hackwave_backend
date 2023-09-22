module.exports = (sequelize, Sequelize) => { 
  const Annee = sequelize.define("annees", { 
    id: { 
      type: Sequelize.INTEGER, 
      primaryKey: true,
      autoIncrement: true 
    }, 
    nom: { 
      type: Sequelize.STRING, 
      allowNull: false, // Make 'nom' a required field
      unique: true, // Make 'nom' unique
    }, 
  }); 
  
  return Annee;
};

     