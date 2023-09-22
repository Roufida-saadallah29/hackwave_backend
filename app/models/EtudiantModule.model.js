module.exports = (sequelize, Sequelize) => { 
    const EtudiantModule = sequelize.define("EtudiantModule", { 
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
        }
    });
    return EtudiantModule;
};