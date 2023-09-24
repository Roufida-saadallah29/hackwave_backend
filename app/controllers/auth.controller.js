const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Report = db.report;
const Category = db.category;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("your API KEY");

const Op = db.Sequelize.Op;
const crypto = require('crypto');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signin = (req, res) => {
  
  User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      if (!user) {
        //return res.status(404).send({ message: "User Not found." });
        return res.status(200).send({
          message: "email Invalid."
        });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );



      if (!passwordIsValid) {
        return res.status(200).send({
          accessToken: null,
          //message: "Invalid Password!"
          message: "Invalid Password or Username!"
        });
      }

      //let isVerified= user.isVerified;
      //if(!isVerified) return res.status(200).send('please activate your account.');

      let isActive = user.isActive;
      if (!isActive) return res.status(200).send('your account is banned ');



      var token = jwt.sign({
        id: user.id
      }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

        res.status(200).send({
          id: user.id,
          FirstName:user.FirstName,
          LastName:user.LastName,
          username: user.username,
          email: user.email,
          role: user.role,
          date_de_naissance: user.date_de_naissance,
          Adresse:user.Adresse,
          phoneNumber: user.phoneNumber,
          accessToken: token
        });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

exports.signup = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const etoken = jwt.sign({
    username,
    email
  }, config.secret, {
    expiresIn: '20m'
  })

  if (!(req.body.password === req.body.confirmpassword)) {
    return res.status(200).send({
      accessToken: null,
      message: "Please enter same password !"
      //message: "Invalid Password or Username!"
    });
  }

  // Save User to Database
  User.create({
      FirstName:req.body.FirstName,
      LastName:req.body.LastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      emailToken: etoken,
      role:"admin",
      date_de_naissance: req.body.date_de_naissance,
      Adresse: req.body.Adresse,
      phoneNumber: req.body.phoneNumber
      
    })
       .then(()=>
      { return res.status(201).send({
        message: "Vous vous etes inscrit!, Veuillez verfiez votre email pour pouvoir vous authentifier "
      })

  
    }).catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};
