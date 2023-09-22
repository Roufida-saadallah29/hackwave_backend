const db = require("../models");
const config = require("../config/auth.config");
var nodemailer = require('nodemailer');
const { Module, Promo, Groupe, Etudiant, EtudiantModule } = require("../models");
const crypto = require('crypto'); // Import the crypto module
const EnseignantModule= db.EnseignantModul;

// const { not } = require("sequelize/types/lib/operators");
// const { ROWLOCK } = require("sequelize/types/lib/table-hints");
const User = db.user;
const Enseignant= db.Enseignant;
const fileUpload = require('express-fileupload');
exports.getProf= async (req, res) => {
  Enseignant.findOne(
    {
      where:{
        userId:req.body.userId,
      }
    }
  )
  .then(x=>{

      return res.json(x);

  })
  .catch(err => {
  res.send({
    message: err.message
  });
});
  
}

exports.ajouterenseignant = (req, res) => {
    return new Promise((resolve,reject)=>{
     User.findOne({
       where:{
         email: req.body.email
       }
     }).then(usere=>{
       if (usere) {
        return res.status(404).send({
          message: "it's already exists!"
        });
       }
       else {
        var pass=(Math.random() +1).toString(36).substring(2);
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'jr_saadallah@esi.dz',
            pass: 'NFWs=3*g:t/53DK|@,}U3:1&QCK_rKk$L-XVbE9]'
          }});
        var mailOptions = {
          from: 'jr_saadallah@esi.dz',
          to: req.body.email,
          subject: 'IBN Rochd Learnning platform',
          text:  'Dear teacher, welcome to our platform, please log in with your existing email and this is your password which you can change whenever you want: ' + pass,
        };
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        })
         User.create({
          FirstName:req.body.Nom,
          LastName:req.body.Prénom,
          username: req.body.Nom+' '+req.body.Prénom,
          email: req.body.email,
          password: pass,
          role:"Enseignant",
          sexe: req.body.Genre,
          date_de_naissance: req.body.DateDeNaissance,
          Adresse: req.body.Adresse,
          phoneNumber: req.body.Numéro_telephone
         })
         
         .then(()=>{
           return User.findOne({
           where:{
            email:req.body.email,
           }
           })
          })
         .then((user) =>{
            return user.id;
           }
          ).then((useridds)=>{
           
             Enseignant.create({
              userId: useridds,
              Grade: req.body.Grade,
              civil_status: req.body.Etat_civil
            });
           resolve("done!");
           return res.send({
            message:" l'enseignant est enregistré avec success"
          })
          })
          .catch(err => {
            reject(err)
            })}
          });
        
 } );
};
exports.aeignantauto= (req, res) => {
  return new Promise((resolve,reject)=>{
  const Objs = JSON.parse(JSON.stringify(req.body));
   const oj= Object.values(Objs)
    oj.forEach((obj) => {
      User.findOne({
        where:{
          email: obj.email
        }
      }).then(usere=>{
        if (usere) {
         return res.status(404).send({
           message: "it's already exists!"
         });
        }
      else{
        var pass=(Math.random() +1).toString(36).substring(2);
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'hz.taibi@esi-sba.dz',
            pass: '$ f $ ; f @15973.0'
          }});
        var mailOptions = {
          from: 'hz.taibi@esi-sba.dz',
          to: obj.email,
          subject: 'ESI House Learnning platform',
          text:  'Dear teacher, welcome to our platform, feel free to use our EHL website, please log in with your existing email and this is your password which you can change whenever you want: ' + pass,
        };
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        })
        User.create({
          FirstName:obj.Nom,
          LastName:obj.Prénom,
          username: obj.Nom+' '+obj.Prénom,
          email: obj.email,
          password:(Math.random() + 1).toString(36).substring(7),
          role:"Enseignant",
          sexe: obj.Genre,
          date_de_naissance: obj.DateDeNaissance,
          Adresse: obj.Adresse,
          phoneNumber: obj.Numéro_telephone
          })
          .then(()=>{
            return User.findOne({
            where:{
             email:obj.email,
            }})
           }).then((usere) =>{
            Enseignant.create({
                userId: usere.id,
                Grade: obj.Grade,
                civil_status: obj.Etat_civil
              });
            resolve("done!");
            return res.send({
              message:" les enseignants sont enregistré avec success"
            })
           })
           .catch(err => {
             reject(err)
             })}
           });
        
      })})

 };
 exports.modifyUserEnse= (req, res) => {

  return new Promise((resolve,reject)=>{
      User.findOne({
          where:{
            id: req.body.id,
        }
        }).then(usr=>{
          if (!usr) {
           return res.status(404).send({
             message: "it's does not exist!"
           });
          }
        else {
           User.update({
            email: req.body.email,
            FirstName: req.body.Nom,
            LastName: req.body.Prénom,
            username: req.body.Nom+' '+ req.body.Prénom
           },{
               where:{
                  id: req.body.id
               }
           }).then(()=>{
              return User.findOne({
                  where:{
                   email:req.body.email,
                  }
                  })
                 })
                .then((user) =>{
                   return user.id;
                  }
                 ).then((useridds)=>{
                     Enseignant.update({
                      Grade: req.body.Grade,
                      civil_status: req.body.Etat_civil
                     },{
                         where:{
                             userid: useridds
                         }
                     }) ;
                     resolve("done!"); 
                   })
                  
         .catch(err => {
          reject(err)
            })}
});
  })};

  //app.use(fileUpload());

  exports.Listenseignant = (req, res) => {
    return new Promise((resolve,reject)=>{
      Enseignant.findAll({
        include: [{
          model: User,
          required: true
         }]
      })
      .then(data => {
        
        res.send(data);
        resolve("done!"); 
      }) 
        .catch(err => {
           reject(err)
            });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving teachers."
        });
      });
          } ; 
  exports.ajouterCours= (req, res) => {
    if (req.files && req.files.file) {
      // Access req.files.file safely here
      return new Promise((resolve,reject)=>{
        let uploadFile = req.files.file;
        const name = uploadFile.name;
        //const md5 = uploadFile.md5();
          // Calculate the MD5 hash of the file
        const md5sum = crypto.createHash('md5');
        md5sum.update(uploadFile.data);
        const md5Hash = md5sum.digest('hex');

        console.log('MD5 Hash:', md5Hash);


        const saveAs = `${md5Hash}_${name}`;
        if(req.body.module!= null && req.body.Promotion!= null){
        Module.findOne({
          where:{
            nom: req.body.module
          }
        }).then(modt=>{
          modid=modt.Id,
          modesem= modt.Semestre,
          modpromoid=modt.PromoID
  
          return Promo.findOne({
            where:{
              id: modpromoid
              
            }
          })}).then(promo=>{
        if(req.body.type!= null && req.body.module!= null && req.files.file!= null && req.body.Id!= null ){
        EnseignantModule.create({
          Type: req.body.type,
          FilePath: saveAs,
          FileName: name,
          ModuleId:modid,
          PromoID: modpromoid,
          EnseignantId: req.body.Id,
          Semestre:modesem
        })}
        resolve("done!");
        return res.send({
          message:" Success!!"
        })
      }).catch(err => {
        reject(err);
        res.status(500).send({
          message:
            err.message || "Can't upload this file!!"
        });
         });
      }})
    } else {
      // Handle the case where req.files or req.files.file is undefined
      return res.send({
        message:" fiiiiiiile!!"
      })
      // You may want to send an error response or take appropriate action
    }
    
  }
  exports.ajouterlesnotes= (req, res) => {
      return new Promise((resolve,reject)=>{
        const Objs = JSON.parse(JSON.stringify(req.body));
        const oj= Object.values(Objs)
        Module.findOne({
          where:{
            nom:req.body.module,
          }
        }).then(mod=>{
          modd=mod.Id;
        if(req.body.Groupe!= null){
         Promo.findOne({
          where:{
            nom:req.body.Promotion,
          }
         }).then(promo=>{
          prm=promo.Id
          return Groupe.findOne({
            where:{
              PromoId: prm,
              nom: req.body.Groupe
            }
          }).then(group=>{
            grp=group.Id
            
          })

         })
         Etudiant.findAll({
          where: {
            GroupeId: grp
          }
         }).then(etud=>{
         oj.forEach((obj) => {
          let Etudiantts = etud;
          Etudiantts.forEach((row) => {
           Etudiant.findOne({
            where:{
              Id: row.Id
            }
           }).then(ert=>{
            ZS=ert.userId;
            return User.findOne({
              where:{
                Id:ZS
              }
            }).then(npr=>{
              nm=npr.FirstName,
              pr=npr.LastName;
              if(obj.Nom==nm && obj.Prénom==pr){
              EtudiantModule.create({
                EtudiantId: row.Id,
                ModuleId:modd,
                NoteEMD1: obj.emd1,
                NoteEMD2: obj.emd2,
                NoteTD: obj.CC,
                Moyenne: obj.moyenne
              })
            }})
           })
          })
        })

        
        resolve("done");
      return res.send({message:"dones"})

         }).catch(err => {
          reject(err);
          res.status(500).send({
            message:
              err.message || "errors when doing this operation!!"
          });
           });
           }
        else{
           Etudiant.findAll({
              where: {
                Promotion: req.body.Promotion
              }
             }).then(etud=>{
             oj.forEach((obj) => {
              let Etudiantts = etud;
              Etudiantts.forEach((row) => {
               Etudiant.findOne({
                where:{
                  Id: row.Id
                }
               }).then(ert=>{
                ZS=ert.userId;
                return User.findOne({
                  where:{
                    Id:ZS
                  }
                }).then(npr=>{
                  nm=npr.FirstName,
                  pr=npr.LastName;
                  if(obj.Nom==nm && obj.Prénom==pr){
                  EtudiantModule.create({
                    EtudiantId: row.Id,
                    ModuleId:modd,
                    NoteEMD1: obj.emd1,
                    NoteEMD2: obj.emd2,
                    NoteTD: obj.CC,
                    Moyenne: obj.moyenne
                  })
                }})
               })

        })
      
      
      });
      resolve("done");
      return res.send({message:"dones"})

         }).catch(err => {
          reject(err);
          res.status(500).send({
            message:
              err.message || "errors when doing this operation!!"
          });
           });
        }
        
        })})}

exports.listnotess= (req, res) => {
  return new Promise((resolve,reject)=>{
    EtudiantModule.findOne({
      where:{
        EtudiantId: req.body.Id,
        ModuleId: req.body.ModuleId
      }
    }).then(data=>{
      resolve("done!");
      return res.send(data);
      }) 
      .catch(err => {
         reject(err)
          });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving students."
      });
  })}
exports.listemodule= (req, res) => {
  return new Promise((resolve,reject)=>{
    Module.findOne({
      where:{
        nom:req.body.module,
      }
    }).then(mod=>{
      modd=mod.Id;
       return 
    
    })
  })}

      