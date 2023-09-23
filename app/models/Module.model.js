module.exports = (sequelize, Sequelize) => {
    const Module = sequelize.define("modules", { 
        Id: { 
           type: Sequelize.INTEGER, 
           primaryKey: true ,
           autoIncrement: true 

         }, 
       nom: { 
           type:Sequelize.STRING,
           allowNull: false, // Make 'anneescolariteId' a required field

         } , 
       PromoID:{
         type: Sequelize.INTEGER,
         allowNull: false, // Make 'anneescolariteId' a required field
         foreignKey: true ,
         references: {
           model: 'promos',
           key: 'Id'
           },
       },
       CourEtudiee:{
         type:Sequelize.BOOLEAN,
         defaultValue:false,
       },
       Semestre: { 
           type: Sequelize.ENUM,  
           values: ['S1','S2'] ,
         },   
         VolumeCour:
         {
           type:Sequelize.TIME,
           defaultValue: '01:30:00'
         },
         VolumeTD:
         {
           type:Sequelize.TIME,
           defaultValue: '01:30:00'
         },
         VolumeTP:
         {
           type:Sequelize.TIME,
           defaultValue: '00:00:00'
         },
       }, {
        uniqueKeys: {
          unique_module: {
            fields: ['nom', 'PromoID']
          }
        }
      }); 

return Module
    }
    
    
    
    
    
    
    