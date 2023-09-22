module.exports = (sequelize, Sequelize) => {
    const Module = sequelize.define("modules", { 
        Id: { 
           type: Sequelize.INTEGER, 
           primaryKey: true 
         }, 
       nom: { 
           type:Sequelize.STRING, 
         } , 
       PromoID:{
         type: Sequelize.INTEGER,
         references: {
           model: 'promos',
           key: 'Id'
           } 
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
       }); 

return Module
    }
    
    
    
    
    
    
    