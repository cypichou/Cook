const express = require('express');
const router = express.Router();
const db = require('../db');

// recuperer toutes les recettes

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('select * from recettes');
        res.json({rows:rows});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ajouter une recette

router.post('/', async (req, res) => {
    try {
        const { nom, temps_de_preparation, consignes } = req.body;

        const [rows] = await db.query(
            'INSERT INTO recettes (nom, temps_de_preparation, consignes) VALUES (?, ?, ?)',
            [nom, temps_de_preparation, consignes]
        );

        res.json({ message: 'Recette ajoutée avec succes', id: rows.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// récupérer tous les ingrédients des recettes

router.get('/ingredients', async (req, res) => {
    try {
        const { ids } = req.body; // on attend { ids: [1, 2, 3] }

        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ error: 'Liste d’IDs invalide.' });
        }

        // Créer des placeholders dynamiques pour la requête IN (?,?,?)
        const placeholders = ids.map(() => '?').join(',');

        const [rows] = await db.query(
            `
      SELECT ing.nom,
             rec.nom AS nom_recette,
             rec_ing.quantite,
             ing.id_categorie
      FROM recettes_ingredients AS rec_ing
      LEFT JOIN ingredients AS ing ON ing.id = rec_ing.id_ingredient
      LEFT JOIN recettes AS rec ON rec.id = rec_ing.id_recette
      WHERE rec.id IN (${placeholders})
      GROUP BY rec.nom, ing.nom, rec_ing.quantite, ing.id_categorie
      `,
            ids
        );

        res.json({ message: 'Ingrédients récupérés avec succés', rows:rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// recuperer une recette grace à son id

router.get('/:id', async (req, res) => {
    try{
        const  id  = req.params.id;

        const [rows] = await db.query(
            'select * from recettes where id = (?)',[id]
        )

        res.json({ message: 'Recette id récupérée avec succes', rows:rows });

    }catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// Ajouter un ingredient à une recette (pas testé)

router.post('/ingredients', async (req, res) => {
    try{
        const {id_recette, id_ingredient, quantite} = req.body;

        await db.query("INSERT INTO recettes_ingredients (id_recette, id_ingredient, quantite) VALUES ((?), (?), (?))",
            [id_recette, id_ingredient, quantite])

        res.json({ message: 'Recette ajoutée avec succes' });

    }catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// supprimer une recette

router.delete('/', async (req, res) => {
    try{
        const  id  = req.params.id;

        await db.query('DELETE FROM recettes_ingredients WHERE id_recette = ?', [id]);
        await db.query('DELETE FROM recettes WHERE id = ?', [id]);

        res.json({ message: 'Recette supprimée avec succés' });

    }catch (err) {
        res.status(500).json({ error: err.message });
    }
})




module.exports = router;
