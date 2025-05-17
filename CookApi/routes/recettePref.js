const express = require('express');
const router = express.Router();
const db = require('../db');

// Ajouter une recette préférée à un utilisateur
router.post('/', async (req, res) => {
    try{
        const  {utilisateur_id, recette_id}  = req.body;

        const [rows] = await db.query('INSERT INTO utilisateurs_recettes VALUES ( ?, ?)',[utilisateur_id, recette_id]);

        res.json({ message: 'Recette ajoutée avec succés' });

    }catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// récupérer les recettes préférées d'un utilisateur
router.get('/:id', async (req, res) => {
    try{
        const  utilisateur_id  = req.params.id;

        const [rows] = await db.query('SELECT * FROM utilisateurs_recettes WHERE utilisateur_id=(?)',[utilisateur_id]);

        res.json({ message: 'Voici les recettes mon bg',rows:rows,oulllaa:req.params.id });

    }catch (err) {
        res.status(500).json({ error: err.message });
    }
})


module.exports = router;
