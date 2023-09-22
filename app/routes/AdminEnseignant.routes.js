const controller= require("../controllers/Enseignant.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "xaccesstoken, Origin, Content-Type, Accept"
        );
        next();
      });
    app.post(
        "/api/Enseignant/ajouterenseignant",
        controller.ajouterenseignant
      );
      app.post(
        "/api/Enseignant/getProf",
        controller.getProf
      );
      app.post(
        "/api/Enseignant/aeignantauto",
        controller.aeignantauto
      );
      app.post(
        "/api/Enseignant/modifyUserEnse",
        controller.modifyUserEnse
      ); 
      
      app.get("/list_enseignant",controller.Listenseignant);
      app.post("/api/Enseignant/Evaluation/deposernote",controller.ajouterlesnotes);
      app.post("/api/Enseignant/deposercours",controller.ajouterCours);
      app.get("/list_note",controller.listnotess);
    };