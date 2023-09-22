const controller= require("../controllers/Etudiant.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "xaccesstoken, Origin, Content-Type, Accept"
        );
        next();
      });
    app.post(
        "/api/Etudiant/ajouteretudiant",
        controller.ajouteretudiant
      );
    app.post(
      "/api/Etudiant/getStudent",
      controller.getStudent
    );
      app.post(
        "/api/Etudiant/ajouteretudautomatique",
        controller.ajouteretudautomatique
      );
      app.post(
        "/api/Etudiant/modifyUserEtu",
        controller.modifyUserEtu
    );
    app.get("/list_etudiant",controller.Listetudiant)
    };