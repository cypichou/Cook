const express = require('express');
const app = express();
const recettesRoutes = require('./routes/recettes');

app.use(express.json()); // pour les requêtes JSON

app.use('/recettes', recettesRoutes);

app.listen(3000, () => {
    console.log('API en écoute sur le port 3000 🚀');
});
