import express from 'express';
const router = express.Router();
import db from '../db.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Config multer (tu peux le centraliser si tu veux)
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../receipesImage'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// recuperer toutes les recettes

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('select * from recettes');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ajouter une recette

router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { nom, temps_de_preparation, consignes } = req.body;
        const imageUrl = req.file ? `/receipesImage/${Date.now() + '-'+req.file.filename}` : `/receipesImage/img.png`;

        const [rows] = await db.query(
            'INSERT INTO recettes (nom, temps_de_preparation, consignes, image_url) VALUES (?, ?, ?, ?)',
            [nom, temps_de_preparation, consignes, imageUrl]
        );

        res.json({ message: 'Recette ajoutée avec succes', id: rows.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Récupérer tous les ingrédients des recettes

router.get('/ingredients', async (req, res) => {
    try {
        let ids = req.query.ids;

        if (!Array.isArray(ids)) ids = [ids];

        if (ids.length === 0) {
            return res.status(400).json({ error: 'Liste d’IDs invalide.', res: req.query });
        }

        // Créer des placeholders dynamiques pour la requête IN (?,?,?)
        const placeholders = ids.map(() => '?').join(',');

        const [rows] = await db.query(
            `
        SELECT
            rec.id AS id,
            JSON_ARRAYAGG(
                    JSON_OBJECT(
                            'quantite_ingredient', rec_ing.quantite,
                            'categorie', categ.nom,
                            'unite', categ.unite,
                            'id',ing.id,
                            'nom', ing.nom
                    )
            ) AS ingredients
        FROM recettes_ingredients AS rec_ing
                 LEFT JOIN ingredients AS ing ON ing.id = rec_ing.id_ingredient
                 LEFT JOIN recettes AS rec ON rec.id = rec_ing.id_recette
                 LEFT JOIN categories AS categ ON categ.id = ing.id_categorie
        WHERE rec.id IN (${placeholders})
        GROUP BY rec.id;
      `,
            ids
        );

        res.json( rows );
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

export default router;
