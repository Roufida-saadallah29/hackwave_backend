
module.exports = (sequelize, Sequelize) => { 
   const Etudiant = sequelize.define("etudiants", { 
    Id: { 
      type: Sequelize.INTEGER, 
      primaryKey: true,
      autoIncrement: true  
    }, 
    userId: { 
       type: Sequelize.INTEGER, 
       foreignKey: true 
     }, 
     GroupeId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'groupes',
        key: 'Id'
    }
     },
     registration_Number: { 
       type: Sequelize.STRING,
       unique: true, 

     }, 

     Promotion:{
      type:   Sequelize.ENUM, 
      values: ['L1', 'L2', 'L3'] ,
     },
     Specialite:{
      type:   Sequelize.ENUM, 
      values: ['Informatique', 'Management'] ,
     }

   }); 
  
   return Etudiant; 
 };
       /* PromoId: {
         type: Sequelize.INTEGER,
         foreignkey: true

         /*references: {
            model: 'Promo', 
            key: 'id', 
         }*/
      
   
  
    //userModel.hasMany(Etudiant);
    /*tudiant.belongsto(PromoModel); 
     return Etudiant;
   };*/