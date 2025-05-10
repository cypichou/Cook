const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('select * from recettes where id = 1');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { nom, temps_de_preparation, consignes } = req.body;

        const [rows] = await db.query(
            'INSERT INTO recettes (nom, temps_de_preparation, consignes) VALUES (?, ?, ?)',
            [nom, temps_de_preparation, consignes]
        );

        res.json({ message: 'Recette ajoutée avec succès', id: rows.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
