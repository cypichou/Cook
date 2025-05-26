import express from 'express';
const router = express.Router();

import db from '../db.js';

// Ajouter un nouvel outil
router.post('/', async (req, res) => {
    try {
        const { nom } = req.body;
        await db.query("insert into outils (nom) values (?)", [nom]);
        res.json({ message: 'Outil ajouté avec succès' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Récupérer un outil pour une recette
router.get('/recettes/', async (req, res) => {
    try {
        const { id_recette } = req.body;
        const [rows] = await db.query(
            "select outils.nom from recette_outils as ro left join outils on outils.id_outil = ro.id_outil where ro.id_recette = (?)",
            [id_recette]
        );
        res.json({ message: 'Voici vos outils', rows: rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Récupérer les outils
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query("select * from outils");
        res.json({ message: 'Voici vos outils', rows: rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
