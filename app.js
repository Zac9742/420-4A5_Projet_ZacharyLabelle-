const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

const coursRoutes = require("./routes/cours-routes");
const profsRoutes = require("./routes/profs-routes");
const etudiantsRoutes = require("./routes/etudiants-routes");
const HttpErreur = require("./models/http-erreur");

const app = express();

app.use(bodyParser.json());

app.use("/api/cours", coursRoutes);
app.use("/api/profs", profsRoutes);
app.use("/api/etudiants", etudiantsRoutes);

app.use((requete, reponse, next) => {
  return next(new HttpErreur("Route non trouvée", 404));
});

app.use((error, requete, reponse, next) => {
  if (reponse.headerSent) {
    return next(error);
  }
  reponse.status(error.code || 500);
  reponse.json({
    message: error.message || "Une erreur inconnue est survenue",
  });
});

mongoose
.connect("mongodb+srv://zaclabelle:UxeIvlR0PKO6sZ1Y@cluster0.xnr8wrk.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    app.listen(5000)
    console.log("Connexion à la base de données réussie");
})
.catch(erreur => {
    console.log(erreur);
});

//app.listen(5000);