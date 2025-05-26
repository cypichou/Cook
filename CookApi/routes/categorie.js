import express from 'express';
const router = express.Router();

import db from '../db.js';

// Récupérer toutes les catégories
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query("select * from categories");
        res.json({ message: 'Voici vos categories', rows: rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
