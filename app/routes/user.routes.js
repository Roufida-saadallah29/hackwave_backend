const express = require("express");
const controller= require("../controllers/user.controller");

 module.exports = function(app) {
     app.use(function(req, res, next) {
         res.header(
           "Access-Control-Allow-Headers",
           "xaccesstoken, Origin, Content-Type, Accept"
         );
         next();
     });
     app.post(
         "/api/user/SuppUser",
             controller.SuppUser
      );
     app.post(
        "/api/user/modifyUserProfile",
         controller.modifyUserProfile
     );
     app.get("/profile_picture",controller.profilepic);
     app.post(
        "/api/user/SuppUserauto",
             controller.SuppUserauto
     );
     app.post(
        "/api/user/Changermotpass",
        controller.Changermotpass
     );
     };

    