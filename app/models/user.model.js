var bcrypt = require("bcryptjs");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    FirstName:{
      type: Sequelize.STRING
     },
    LastName:{
      type: Sequelize.STRING
     },
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true, 
    },
    password: {
      type: Sequelize.STRING,
    },
    // code:{
    //   type: Sequelize.STRING,
    // },
   role:{
    type:   Sequelize.ENUM,
    values: ['admin','Enseignant', 'Etudiant','Parent']
   },
   emailToken: { type: Sequelize.STRING},
   sexe:{
    type:   Sequelize.ENUM,
    values: ['Féminin','Masculin']
   },
   date_de_naissance:{
    type: Sequelize.DATEONLY,
  },
  Adresse:{
    type:Sequelize.STRING,
  },
   //reset password token
   resetToken: { type: Sequelize.STRING},
   phoneNumber:{
    type: Sequelize.STRING, 
  },
  profile_picture:{
    type: Sequelize.BLOB('long'), 
  },
// BLOB('long')
  isVerified: {type: Sequelize.BOOLEAN, defaultValue: false},
  isActive: {type: Sequelize.BOOLEAN, defaultValue: true}


  },
  {
    hooks: {
      beforeCreate: async (user) => {
       if (user.password) {
        const salt = await bcrypt.genSaltSync(10, 'a');
        user.password = bcrypt.hashSync(user.password, salt);
       }
      }
     },
     instanceMethods: {
      validPassword: (password) => {
       return bcrypt.compareSync(password, this.password);
      }
     }
    });

    User.prototype.validPassword = async (password, hash) => {
      return await bcrypt.compareSync(password, hash);
     }
      return User;
};
