const express = require('express');
const router = express.Router();
const db = require('../db');

// Récupérer toutes les categories
router.get('/', async (req, res) => {
    try{

        const [rows] = await db.query("select * from categories")

        res.json({ message: 'Voici vos categories', rows:rows });

    }catch (err) {
        res.status(500).json({ error: err.message });
    }
})

module.exports = router;
