import express from 'express';
const router = express.Router();

import db from '../db.js';

// Récupérer tous les timings
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM timings');
        res.json({ message: 'Voici vos timings', rows: rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
