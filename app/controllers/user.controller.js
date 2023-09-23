const db = require("../models");
const config = require("../config/db.config");
var bcrypt = require("bcryptjs");
const User = db.user;


exports.SuppUser = (req, res) => {

    return new Promise((resolve,reject)=>{
        User.findOne({
          where:{
            id: req.body.id,
            username: req.body.username,
            email: req.body.email
        }
        }).then(usr=>{
          if (!usr) {
           return res.status(404).send({
             message: "it's does not exist!"
           });
          }
        else { 
           User.destroy({
            where:{
              username: req.body.username,
              email: req.body.email
          }
          })
          resolve("done!");}}) 
           .catch(err => {
              reject(err)
                })
    
   
    })};
      

exports.modifyUserProfile= (req, res) => {

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
                  
                      if(req.body.Numéro_telephone != null){
                        usr.update({
                          phoneNumber: req.body.Numéro_telephone
                         },{
                             where:{
                                 userid: useridds
                             }
                         })
                      }
                    

                      
                       resolve("done!"); 
              }}) .catch(err => {
              reject(err)
                
    });
      })};
     

exports.Changermotpass= (req, res) => {
        return new Promise((resolve,reject)=>{
          User.findOne({
            where:{
              id:req.body.id
            }

          }).then(usr=>{
            const salt =  bcrypt.genSaltSync(10, 'a');
            if(bcrypt.compareSync(req.body.ancientmotdepasse,usr.password)){
             if(req.body.nouveaumotdepasse == req.body.confirmemotdepasse){
              usr.update({
                password: bcrypt.hashSync(req.body.confirmemotdepasse,salt)
              },{
                where:{
                  id:req.body.id
             }})
             res.send({
              message:"votre mot de passe a changé avec sucssess"
             })
             }
             else{
              return res.status(500).send({
                message:"confirme mot de passe diffrent from nouveau mot de passe"
             })
            }}
            else{
              return res.status(500).send({
                message:" ancient mot de passe incorrect"
             })
            }
            resolve("done!"); 
          }) 
          .catch(err => {
             reject(err)
              });
          
          })

        }