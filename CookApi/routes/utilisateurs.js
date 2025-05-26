import express from 'express';
const router = express.Router();

import db from '../db.js';

router.post('/', async (req, res) => {
    try {
        const {
            nom,
            prenom,
            sexe,
            mail,
            mdp,
            activite,
            objectifs,
            calories,
            proteines,
            lipides,
            glucides
        } = req.body;

        const [rows] = await db.query(
            `INSERT INTO utilisateurs (
                nom, prenom, sexe, mail, mdp, activite, objectifs, calories, proteines, lipides, glucides
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                nom,
                prenom,
                sexe,
                mail,
                mdp,
                activite,
                objectifs,
                calories,
                proteines,
                lipides,
                glucides
            ]
        );

        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await db.query('SELECT * FROM utilisateurs WHERE id = ?', [id]);

        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
