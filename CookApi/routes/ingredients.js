const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('select * from ingredients');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const {id} = req.body;
        const [rows] = await db.query('select * from ingredients where id = ?',[id]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const {id} = req.body;
        const [rows] = await db.query('select * from ingredients where id = ?',[id]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const {nom, proteines, glucides, lipides, calories, id_saison, id_categorie} = req.body;

        const [rows] = await db.query(
            'INSERT INTO ingredients (nom, proteines, glucides, lipides, calories, id_saison, id_categorie) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [nom, proteines, glucides, lipides, calories, id_saison, id_categorie]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
