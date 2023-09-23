const db = require("../models");
var nodemailer = require('nodemailer');
const User = db.user;
const Etudiant= db.Etudiant;
const Promo =db.Promo;
const Groupe=db.Groupe;
const Annee=db.Annee;
const EtudiantModule=db.EtudiantModule
// const photo=require("C:/Users/LENOVO/Downloads/backend1CSProject-20220517T205521Z-001/backend1CSProject/upload/images/pic_1171831236_1.png");


exports.ajouteretudiant = (req, res) => {
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
            pass: 'mypass'
          }});
        var mailOptions = {
          from: 'jr_saadallah@esi.dz',
          to: req.body.email,
          subject: 'IBN Rochd Learnning platform',
          text:  'Dear student, welcome to our platform, please log in with your existing email and this is your password which you can change whenever you want: ' + pass,
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
         role:"Etudiant",
         sexe: req.body.Genre,
         date_de_naissance: req.body.DateDeNaissance,
         Adresse: req.body.Adresse,
         phoneNumber: req.body.Numéro_telephone
        //  profile_picture: photo
         }).then(()=>{
           return User.findOne({
           where:{
            email:req.body.email,
           }
           })
          })
         .then((user) =>{
            console.log(user);
            return user.id;
           console.log(user.id);
           }
          ).then((useridds)=>{
           
           useridd=useridds
           return Annee.findOne({
            where: {
                nom: req.body.AnnéeScolarité
              },
           })
         }).then((annee)=>{
          anneescolariteId=annee.id
           return Promo.findOne({
            where: {
              anneescolariteId : anneescolariteId ,
                nom: req.body.Promo
              },
          })}).then((promo)=>{
            promoidd=promo.id
            return Groupe.findOne({
                where: {
                    PromoId: promoidd,
                    nom: req.body.Groupe
                  },
          })}).then((groupe)=>{
            groupeidd=groupe.Id
            Etudiant.create({
             userId: useridd,
             GroupeId: groupeidd, 
             registration_Number: req.body.Numéro_inscription,
             Promotion:req.body.Promo
            });
           resolve("done!");
           return res.send({
            message:" l'étudiant  est enregistré avec success"
          })
          })
          .catch(err => {
            reject(err)
            })}
          });
        
 } );
};
exports.ajouteretudautomatique=(req, res) => {
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
      var tr=00;
      var pass=(Math.random() +1).toString(36).substring(2);
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'jr_saadallah@esi.dz',
            pass: 'mypass'

          }});
        var mailOptions = {
          from: 'jr_saadallah@esi.dz',
          to: obj.email,
          subject: 'IBN Rochd Learnning platform',
          text:  'Dear student, welcome to our platform, please log in with your existing email and this is your password which you can change whenever you want: ' + pass,
        
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
        password: (Math.random() +1).toString(36).substring(7),
        role:"Etudiant",
        sexe: obj.Genre,
        date_de_naissance: obj.DateDeNaissance,
        Adresse: obj.Adresse,
        phoneNumber: obj.Numéro_telephone,
        // profile_picture: photo
        })
        .then(()=>{
          return User.findOne({
          where:{
           email:obj.email,
          }
          })
         })
        .then((user) =>{
          return user.id
        })
        .then((useridds)=>{
         tr=useridds
         Annee.findOne({
           where: {
               nom: obj.Annee_scolaire
             },
          })
        .then((annee)=>{
          anneeScolariteid=annee.Id
          return Promo.findOne({
           where: {
               anneScorlariteeID : anneeScolariteid ,
               nom: obj.Promotion
             },
         })}).then((promo)=>{
           promoidd=promo.Id
           return Groupe.findOne({
               where: {
                   PromoId: promoidd,
                   nom: obj.Groupe
                 },
         })}).then((groupe)=>{
           groupeidd=groupe.Id
            Etudiant.create({
             userId: tr,
             GroupeId: groupeidd, 
             registration_Number: obj.Numéro_inscription,
             Promotion:obj.Promotion
           });
          }) 
          resolve("done!")
          .catch(err => {
            reject(err)
            })
        });
         
        }
    
          })
         
        })
       
        })

};

exports.modifyUserEtu= (req, res) => {

  return new Promise((resolve,reject)=>{
       if(req.body.Nom != null && req.body.Prénom != null && req.body.email!=null && req.body.Groupe !=null){
           User.update({
              FirstName: req.body.Nom,
              LastName: req.body.Prénom,
              username: req.body.Nom+' '+ req.body.Prénom,
              email: req.body.email
           },{
               where:{
                   id: req.body.id,
               }
           }).then(()=>{
            return Groupe.findOne({
              where: {
                PromoId: req.body.PromoId,
                nom: req.body.Groupe
                
           }})
           }).then(groupe=>{
            Etudiant.update({
              GroupeId : groupe.Id
            },{
              where:{
                userId: req.body.id,

              }
            })
            resolve("done!");
            return res.send({message:"les informatios sont modifiées avec success"})
           }).catch(err => {
            reject(err);
            res.status(500).send({
              message:
                err.message || "impossible d'enregistrer les modifications"
            });
             });
          }
          else if(req.body.Nom != null && req.body.Prénom == null && req.body.email==null && req.body.Groupe== null){
            User.findOne({
              where:{
                id: req.body.id,
              }
              })
             .then((usr) =>{ 
              ust=substr(usr.username,usr.FirstName)
            User.update({
              FirstName: req.body.Nom,
              username: req.body.Nom+" "+ust,
           },{
               where:{
                   id: req.body.id,
               }
          });
          resolve("done!");
          return res.send({message:"les informatios sont modifiées avec success"})
        }).catch(err => {
          reject(err);
          res.status(500).send({
            message:
              err.message || "impossible d'enregistrer les modifications"
          });
           });
       }
       else if(req.body.Nom != null && req.body.Prénom != null && req.body.email==null && req.body.Groupe== null){
        User.update({
          FirstName: req.body.Nom,
          LastName: req.body.Prénom,
          username: req.body.Nom+" "+req.body.Prénom,
       },{
           where:{
               id: req.body.id,
           }
      });
      resolve("done!");
      return res.send({message:"les informatios sont modifiées avec success"})
      .catch(err => {
        reject(err);
        res.status(500).send({
          message:
            err.message || "impossible d'enregistrer les modifications"
        });
         });
       }
       else if(req.body.Nom == null && req.body.Prénom != null && req.body.email==null && req.body.Groupe== null){
        User.findOne({
          where:{
            id: req.body.id,
          }
          })
         .then((usr) =>{ 
          ust=substr(usr.username,usr.LastName)
        User.update({
          LastName: req.body.Prénom,
          username: ust+" "+req.body.Prénom ,
       },{
           where:{
               id: req.body.id,
           }
      });
      resolve("done!");
      return res.send({message:"les informatios sont modifiées avec success"})
    }).catch(err => {
      reject(err);
      res.status(500).send({
        message:
          err.message || "impossible d'enregistrer les modifications"
      });
       });
       }
       else if(req.body.Nom == null && req.body.Prénom != null && req.body.email!=null && req.body.Groupe!= null){
        User.findOne({
          where:{
            id: req.body.id,
          }
          })
         .then((usr) =>{ 
          ust=substr(usr.username,usr.LastName)
          User.update({
          LastName: req.body.Prénom,
          username: ust+' '+ req.body.Prénom,
          email: req.body.email
       },{
           where:{
               id: req.body.id,
           }
       })}).then(()=>{
        return Groupe.findOne({
          where: {
            PromoId: req.body.PromoId,
            nom: req.body.Groupe
            
       }})
       }).then(groupe=>{
        Etudiant.update({
          GroupeId : groupe.Id
        },{
          where:{
            userId: req.body.id,

          }
        })
        resolve("done!");
        return res.send({message:"les informatios sont modifiées avec success"})
       }).catch(err => {
        reject(err);
        res.status(500).send({
          message:
            err.message || "impossible d'enregistrer les modifications"
        });
         });
      
       } 
       else if(req.body.Nom != null && req.body.Prénom == null && req.body.email!=null && req.body.Groupe!= null){
        User.findOne({
          where:{
            id: req.body.id,
          }
          })
         .then((usr) =>{ 
          ust=substr(usr.username,usr.FirstName)
          User.update({
          FirstName: req.body.Nom,
          username: req.body.Nom+" "+ust,
          email: req.body.email
       },{
           where:{
               id: req.body.id,
           }
       })}).then(()=>{
        return Groupe.findOne({
          where: {
            PromoId: req.body.PromoId,
            nom: req.body.Groupe
            
       }})
       }).then(groupe=>{
        Etudiant.update({
          GroupeId : groupe.Id
        },{
          where:{
            userId: req.body.id,

          }
        })
        resolve("done!");
       }); return res.send({message:"les informatios sont modifiées avec success"})
       .catch(err => {
        reject(err);
        res.status(500).send({
          message:
            err.message || "impossible d'enregistrer les modifications"
        });
         });
       }  
       else if(req.body.Nom == null && req.body.Prénom == null && req.body.email==null && req.body.Groupe!= null){
        Groupe.findOne({
          where: {
            PromoId: req.body.PromoId,
            nom: req.body.Groupe
            
       }
       }).then(groupe=>{
        Etudiant.update({
          GroupeId : groupe.Id
        },{
          where:{
            userId: req.body.id,

          }
        })
        resolve("done!");
        return res.send({message:"les informatios sont modifiées avec success"})
       }).catch(err => {
        reject(err);
        res.status(500).send({
          message:
            err.message || "impossible d'enregistrer les modifications"
        });
         });
      
       }
       else if(req.body.Nom == null && req.body.Prénom == null && req.body.email!=null && req.body.Groupe== null){
        User.update({
          email: req.body.email
       },{
           where:{
               id: req.body.id,
           }
       })
       resolve("done!");
      return res.send({message:"les informatios sont modifiées avec success"})
      .catch(err => {
        reject(err);
        res.status(500).send({
          message:
            err.message || "impossible d'enregistrer les modifications"
        });
         });
      }
      else if(req.body.Nom == null && req.body.Prénom == null && req.body.email!=null && req.body.Groupe!= null){
        User.update({
          email: req.body.email
       },{
           where:{
               id: req.body.id,
           }
       })
       Groupe.findOne({
        where: {
          PromoId: req.body.PromoId,
          nom: req.body.Groupe
          
     }
     }).then(groupe=>{
      Etudiant.update({
        GroupeId : groupe.Id
      },{
        where:{
          userId: req.body.id,

        }
      })
      resolve("done!");
      return res.send({message:"les informatios sont modifiées avec success"})
      }).catch(err => {
        reject(err);
        res.status(500).send({
          message:
            err.message || "impossible d'enregistrer les modifications"
        });
         });
    }
    else if(req.body.Nom != null && req.body.Prénom == null && req.body.email==null && req.body.Groupe!= null){
      User.findOne({
        where:{
          id: req.body.id,
        }
        })
       .then((usr) =>{ 
        ust=substr(usr.username,usr.FirstName)
        User.update({
        FirstName: req.body.Nom,
        username: req.body.Nom+" "+ust,
        },{
         where:{
             id: req.body.id,
         }
     })}).then(()=>{
      return Groupe.findOne({
        where: {
          PromoId: req.body.PromoId,
          nom: req.body.Groupe
          
     }})
     }).then(groupe=>{
      Etudiant.update({
        GroupeId : groupe.Id
      },{
        where:{
          userId: req.body.id,

        }
      })
      resolve("done!");
      return res.send({message:"les informatios sont modifiées avec success"})
     }).catch(err => {
      reject(err);
      res.status(500).send({
        message:
          err.message || "impossible d'enregistrer les modifications"
      });
       });
    
    }
    else if(req.body.Nom == null && req.body.Prénom != null && req.body.email==null && req.body.Groupe!= null){
      User.findOne({
        where:{
          id: req.body.id,
        }
        })
       .then((usr) =>{ 
        ust=substr(usr.username,usr.LastName)
        User.update({
        LastName: req.body.Prénom,
        username: ust+" "+req.body.Prénom,
        },{
         where:{
             id: req.body.id,
         }
     })}).then(()=>{
      return Groupe.findOne({
        where: {
          PromoId: req.body.PromoId,
          nom: req.body.Groupe
          
     }})
     }).then(groupe=>{
      Etudiant.update({
        GroupeId : groupe.Id
      },{
        where:{
          userId: req.body.id,

        }
      })
      resolve("done!");
      return res.send({message:"les informatios sont modifiées avec success"})
     }).catch(err => {
      reject(err);
      res.status(500).send({
        message:
          err.message || "impossible d'enregistrer les modifications"
      });
       });
    
    }
    else if(req.body.Nom != null && req.body.Prénom == null && req.body.email!=null && req.body.Groupe== null){
      User.findOne({
        where:{
          id: req.body.id,
        }
        })
       .then((usr) =>{ 
        ust=substr(usr.username,usr.FirstName)
        User.update({
        FirstName: req.body.Nom,
        username: req.body.Nom+" "+ust,
        email: req.body.email
        },{
         where:{
             id: req.body.id,
         }
     })
     resolve("done!");
     return res.send({message:"les informatios sont modifiées avec success"})
    }).catch(err => {
      reject(err);
      res.status(500).send({
        message:
          err.message || "impossible d'enregistrer les modifications"
      });
       });
   
  }
  else if(req.body.Nom == null && req.body.Prénom != null && req.body.email!=null && req.body.Groupe== null){
    User.findOne({
      where:{
        id: req.body.id,
      }
      })
     .then((usr) =>{ 
      ust=substr(usr.username,usr.LastName)
      User.update({
      LastName: req.body.Prénom,
      username: ust+" "+ req.body.Prénom,
      email: req.body.email
      },{
       where:{
           id: req.body.id,
       }
   })
   resolve("done!"); 
   return res.send({message:"les informatios sont modifiées avec success"})
  }).catch(err => {
    reject(err);
    res.status(500).send({
      message:
        err.message || "impossible d'enregistrer les modifications"
    });
     });

}
  })}
exports.Listetudiant = (req, res) => {
    return new Promise((resolve,reject)=>{
      Etudiant.findAll({ 
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
            err.message || "Some error occurred while retrieving students."
        });
      });
          } ; 


  
exports.getStudent= async (req, res) => {
  Etudiant.findOne(
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

exports.consulterNotes= async (req, res) => {
  Etudiant.findOne(
    {
      where:{
        Id:req.body.EtudiantId,
      }
    }
  )
  .then(etud=>{

    Groupe.findOne(
      {
        where:{
          PromoId:etud.GroupeId,
        }
      }
    )
    .then(grp=>{
  
      EtudiantModule.findAll (
        {
          where:{
            PromoId:grp.PromoId,
            EtudiantId:req.body.EtudiantId
          }
        }
      )
      .then(notes=>{
        
          return res.json(notes);
    
      })
      .catch(err => {
      res.send({
        message: err.message
      });
    });
  
    })
    .catch(err => {
    res.send({
      message: err.message
    });
  });
  })
  .catch(err => {
  res.send({
    message: err.message
  });
});
  
}
exports.getStudentGroupe = async (req, res) => {
    try {
      const students = await Etudiant.findAll({
        where: {
          GroupeId: req.body.GroupeId,
        },
      });

      const userPromises = students.map(async (student) => {
        const user = await User.findOne({
          where: {
            id: student.userId,
          },
        });
        return {
          FirstName: user.FirstName,
          LastName: user.LastName,
          EtudiantId: student.Id,
          module: req.body.module,
          emd1: 0,
          emd2: 0,
          CC: 0,
          remarque:""
        };

      });
      // const users = students.map((student) => ({
      //   FirstName: student.user.FirstName,
      //   LastName: student.user.LastName,
      //   EtudiantId: student.Id,
      // }));
      const users = await Promise.all(userPromises);

      return res.json(users);
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  };
