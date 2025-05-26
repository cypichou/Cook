import express from 'express';
const router = express.Router();

import db from '../db.js';

// Récupérer toutes les saisons
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM saisons');
        res.json({ message: 'Voici vos saisons', rows: rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
