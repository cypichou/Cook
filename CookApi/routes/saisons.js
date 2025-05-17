const express = require('express');
const router = express.Router();
const db = require('../db');

// Récupérer toutes les saisons
router.get('/', async (req, res) => {
    try{

        const [rows] = await db.query("select * from saisons")

        res.json({ message: 'Voici vos saisons', rows:rows });

    }catch (err) {
        res.status(500).json({ error: err.message });
    }
})

module.exports = router;
