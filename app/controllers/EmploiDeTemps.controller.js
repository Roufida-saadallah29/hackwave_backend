const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Salle=db.Salle;
const Module = db.Module;
const Promo =db.Promo;
const EmploiDeTemps =db.EmploiDeTemps;
const Sequelize = require('sequelize');
const op = Sequelize.Op;
var DataTypes = require('sequelize/lib/data-types');
const { Enseignant } = require("../models");

exports.afficherListeSalles=async(req,res)=>{

    Salle.findAll({
     where: {
       Type:req.body.type,
     },
     attributes: ['SalleNom'], 
    })
    .then(salles=>{
    var arr=[];
    salles.forEach(element => {
      arr.push(element.SalleNom);
    });
    return res.json(arr)  
    })
    .catch(err => {
      res.send({
        message: err.message
      });
    });
    }


exports.ajouterSalle = async (req, res) => {
    Salle.findOne({
        where: {
           SalleNom: req.body.SalleNom,
        }
      })
      .then(salle=>{
        if(!salle)
        {
         Salle.create({
          SalleNom: req.body.SalleNom,
          Type:req.body.Type,
         });
         res.send(salle);}
        else
         res.send({message:"this salle exist"})
      })
      .catch(err => {
        res.status(500).send({
          message: err.message
        });
      });
}



exports.afficherListeModule= async (req,res)=>{
    Module.findAll({

   where: {
     Semestre:req.body.Semestre,
     PromoID:req.body.PromoID,     
   },
  })
  .then(modules=>{
  var arr=[];
  modules.forEach(element => {
    arr.push({nomModule:element.nom,ModuleId:element.Id});
  });
  return res.json(arr)  
  })
  .catch(err => {
    res.send({
      message: err.message
    });
  });
  }


exports.afficherListeType= async (req, res) => {
  Module.findOne(
   {
     where:{
       nom:req.body.nom,
       Semestre:req.body.Semestre,
       PromoID:req.body.PromoID,
     }
   }
 )
 .then(x=>{
   if(x.CourEtudiee)
   {
     return res.json(["TD","TP"]);
   }
   else
   { return res.json(["cour","TD","TP"]);}
 })
 .catch(err => {
  res.send({
    message: err.message
  });
});
 
}
exports.afficherListeGroupe= async (req, res) => {
  const x=await EmploiDeTemps.findAll(
    {
      where:{
       Type:req.body.Type,
       ModuleId:req.body.ModuleId,   
      },
      attributes: ['EnseignantId'], 
    
    });
    var arr2=[];
    x.forEach(element => {
      arr2.push(element.EnseignantId);
    });
  Module.findOne(
   {
     where:{
       nom:req.body.nom,
       Semestre:req.body.Semestre,
       PromoID:req.body.PromoID,
     }
   }
 )
 .then(x=>{
   if(x.CourEtudiee)
   {
     return res.json(["TD","TP"]);
   }
   else
   { return res.json(["cour","TD","TP"]);}
 })
 .catch(err => {
  res.send({
    message: err.message
  });
});
 
}
exports.afficherListeEnseignants= async (req, res) => {
  const x=await EmploiDeTemps.findAll(
    {
      where:{
        [op.or]: [
      {hourDebut:{[op.gte]:req.body.hourDebut,[op.lt]:req.body.hourFin}},
      {hourFin:{[op.gt]:req.body.hourDebut,[op.lte]:req.body.hourFin}}
      ]},
      attributes: ['EnseignantId'], 
    
    });
    var arr2=[];
    x.forEach(element => {
      arr2.push(element.EnseignantId);
    });
    var arr=[];
    Enseignant.findAll({
     where: {
        Id: {[op.notIn]: arr2},       
      },  
      //attributes: ['userId'], 
     })
     .then(async enseignants=>{
      for (const element of enseignants) {
        const y=await User.findOne({
          where: {
            Id: element.userId,       
          },
      //    attributes: ['Id','username'],
        })
         await arr.push({userID:element.userId, username:y.username,EnseignantId:element.Id});

      }
     return res.json(arr)  
     })
     .catch(err => {
       res.send({
         message: err.message
       });
     });
}


exports.ajouterSeance = async (req, res) => {

EmploiDeTemps.create({
  GroupeId: req.body.GroupeId,
  ModuleId: req.body.ModuleId,
  Type: req.body.Type,
  SalleID: req.body.SalleID,
  Jour: req.body.Jour,
  hourDebut:req.body.hourDebut,
  hourFin:req.body.hourFin,
  EnseignantId:req.body.EnseignantId
})
.then(async seance => {
  res.status(201).send({
    seance
  });

})
.catch(err => {
  res.status(500).send({
    message: err.message
  });
});}


