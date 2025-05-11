SELECT ing.nom,
       rec.nom AS nom_recette,
       rec_ing.quantite,
       ing.id_categorie
FROM recettes_ingredients AS rec_ing
         LEFT JOIN ingredients AS ing ON ing.id = rec_ing.id_ingredient
         LEFT JOIN recettes AS rec ON rec.id = rec_ing.id_recette
WHERE rec.id IN (1,4)
GROUP BY rec.nom, ing.nom, rec_ing.quantite, ing.id_categorie;

