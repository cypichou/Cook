const express = require('express');
const router = express.Router();
const db = require('../db');

const db = require("../db");

router.post('/', async (req, res) => {
    try {
        const {nom, prenom, sexe, mail, mdp, activite, objectifs, calories, proteines, lipides, glucides} = req.body;

        const [rows] = await db.query(
            `INSERT INTO utilisateurs (
     nom, prenom, sexe, mail, mdp, activite, objectifs, calories, proteines, lipides, glucides
   ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                nom, prenom, sexe, mail, mdp, activite, objectifs, calories, proteines, lipides, glucides
            ]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const {id} = req.body;

        const [rows] = await db.query('select * from utilisateurs where id = ?',[id]);

        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
