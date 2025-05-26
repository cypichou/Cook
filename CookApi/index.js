import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import recettesRoutes from './routes/recettes.js';
import ingredientsRoutes from './routes/ingredients.js';
import utilisateursRoutes from './routes/utilisateurs.js';
import recettePrefRoutes from './routes/recettePref.js';
import outilsRoutes from './routes/Outils.js';
import timingRoutes from './routes/timing.js';
import saisonsRoutes from './routes/saisons.js';
import categoriesRoutes from './routes/categorie.js';
import db from './db.js';

const app = express();

// Pour gérer __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Stockage des images
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'receipesImage'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json()); // pour les requêtes JSON

// Routes API
app.use('/recettes', recettesRoutes);
app.use('/ingredients', ingredientsRoutes);
app.use('/utilisateurs', utilisateursRoutes);
app.use('/recettesPref', recettePrefRoutes);
app.use('/outils', outilsRoutes);
app.use('/timings', timingRoutes);
app.use('/saisons', saisonsRoutes);
app.use('/categories', categoriesRoutes);

// Servir les images
app.use('/receipesImage', express.static(path.join(__dirname, 'receipesImage')));

app.listen(3000, () => {
    console.log('API en écoute sur le port 3000 🚀');
});
