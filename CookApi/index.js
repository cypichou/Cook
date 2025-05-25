const express = require('express');
const cors = require('cors');
const app = express();


const recettesRoutes = require('./routes/recettes');
const ingredientsRoutes = require('./routes/ingredients');
const utilisateursRoutes = require('./routes/utilisateurs');
const recettePrefRoutes = require('./routes/recettePref');
const outilsRoutes = require('./routes/Outils');
const timingRoutes = require('./routes/timing');
const saisonsRoutes = require('./routes/saisons');
const categoriesRoutes = require('./routes/categorie');

app.use(cors());
app.use(express.json()); // pour les requêtes JSON, middlware

app.use('/recettes', recettesRoutes);
app.use('/ingredients', ingredientsRoutes);
app.use('/utilisateurs', utilisateursRoutes);
app.use('/recettesPref', recettePrefRoutes);
app.use('/outils', outilsRoutes);
app.use('/timings', timingRoutes);
app.use('/saisons', saisonsRoutes);
app.use('/categories', categoriesRoutes);

app.listen(3000, () => {
    console.log('API en écoute sur le port 3000 🚀');
});
