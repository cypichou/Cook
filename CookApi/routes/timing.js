const express = require('express');
const router = express.Router();
const db = require('../db');

// Récupérer tous les timings
router.get('/', async (req, res) => {
    try{

        const [rows] = await db.query("select * from timings")

        res.json({ message: 'Voici vos timings', rows:rows });

    }catch (err) {
        res.status(500).json({ error: err.message });
    }
})

module.exports = router;
