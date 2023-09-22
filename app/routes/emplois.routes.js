const controller= require("../controllers/EmploiDeTemps.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "xaccesstoken, Origin, Content-Type, Accept"
        );
        next();
      });
      app.post("/EmploiDeTemps/ajoutersalle",controller.ajouterSalle);
      app.post("/EmploiDeTemps/afficherListeModule",controller.afficherListeModule);
      app.post("/EmploiDeTemps/afficherListeSalles",controller.afficherListeSalles);
      app.post("/EmploiDeTemps/ajouterSeance",controller.ajouterSeance);
      app.post("/EmploiDeTemps/afficherListeEnseignants",controller.afficherListeEnseignants);
      app.post("/EmploiDeTemps/afficherListeType",controller.afficherListeType);
    }