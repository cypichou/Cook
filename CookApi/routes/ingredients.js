import express from 'express';
const router = express.Router();

import db from '../db.js';

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('select * from ingredients');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('select * from ingredients where id = ?', [id]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { nom, proteines, glucides, lipides, calories, id_saison, id_categorie } = req.body;
        const [rows] = await db.query(
            'INSERT INTO ingredients (nom, proteines, glucides, lipides, calories, id_saison, id_categorie) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [nom, proteines, glucides, lipides, calories, id_saison, id_categorie]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
