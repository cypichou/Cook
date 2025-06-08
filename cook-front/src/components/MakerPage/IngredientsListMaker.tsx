import { Grid, GridItem} from "@chakra-ui/react";
import type {Receipe} from "@/components/RecipesGrid.tsx";
import ReceipesList from "@/components/MakerPage/ReceipesList.tsx";
import IngredientsList, {
    type IngredientsParCategorie,
} from "@/components/MakerPage/IngredientsList.tsx";
import useData from "@/hooks/useData.ts";
import type {AxiosRequestConfig} from "axios";
import qs from "qs";
import {useEffect, useState} from "react";

interface Props {
    receipes:Receipe[];
}

export interface Ingredient {
    "nom": string,
    "quantite_ingredient": number,
    "categorie": string,
    "unite": string,
    "id":number,
}

export interface listeQuantityReceipes extends Receipe { // une recette plus la quantite
    quantite: number;
}

interface RecettesIngredients { // Ce que je recois de data
    "id": number, // id de la recette
    "ingredients": Ingredient[]
}

const IngredientsListMaker = ({receipes}:Props) => {

    //_______________________ Récupérer toutes les recettes et leurs ingrédients _______________________ //

    const tabIngredients = receipes.map((receipe:Receipe) => receipe.id)
    const config: AxiosRequestConfig = {
        params: { ids: tabIngredients },
        paramsSerializer: {
            serialize: (params: Record<string, any>): string =>
                qs.stringify(params, { arrayFormat: 'repeat' })
        }
    };
    const {data} = useData<RecettesIngredients>("recettes/ingredients/",config)

    // _______________________ Liste des recettes avec leur quantité _______________________ //

    const [listeRecette, setListeRecette]= useState<listeQuantityReceipes[]>(
        receipes.map((receipe) => ({
            id: receipe.id,
            nom: receipe.nom,
            quantite: 1,
        }))
    );
    const onClickAdd = (id: number) => {
        setListeRecette((prev) =>
            prev.map((receipe): listeQuantityReceipes => {
                if (receipe.id === id) {
                    return {
                        ...receipe,
                        quantite: receipe.quantite + 1,
                    };
                } else {
                    return receipe;
                }
            })
        );
    };
    const onClickRemove = (id: number) => {
        setListeRecette((prev) =>
        prev.map((receipe):listeQuantityReceipes => {
            if (receipe.id === id) {                                 // TODO que faire si le chiffre atteint 0
                return {...receipe, quantite: receipe.quantite - 1 };
            }else{
                return receipe;
            }
        })
        )
    }

    // _______________________ Liste des ingredients avec leur quantité _______________________ //

    const [listeIngredients, setListeIngredients] = useState<IngredientsParCategorie>({});
    function structureListeIngredients(data: RecettesIngredients[]) {

        const newObj: IngredientsParCategorie = {}

        data.forEach((recette) => {
            recette.ingredients.forEach(ingredient => {
                if(!newObj[ingredient.categorie]){
                    newObj[ingredient.categorie] = {}; // si il n'y a pas déjà la catégorie
                }

                // chercher la qtt de recette que l'utilisateur souhaite
                const recetteTrouvee = listeRecette.find((receipe:Receipe) => receipe.id==recette.id)
                const qtt_recette = recetteTrouvee ? recetteTrouvee.quantite : 0;
                // calculer la qtt de l'ingredient en fonction du nombre de plats de recettes que l'utilisateur veut
                const qqt_ingredient = qtt_recette * ingredient.quantite_ingredient
                console.log(qqt_ingredient)
                // faire l'ajout au tableau
                if(!newObj[ingredient.categorie][ingredient.nom]){ // si il l'ingrédient n'est pas encore là
                    newObj[ingredient.categorie][ingredient.nom] = {...ingredient,quantite_ingredient : qqt_ingredient } // si il n'y a pas déjà l'ingrédient
                }else{
                    newObj[ingredient.categorie][ingredient.nom] = {...ingredient,quantite_ingredient : newObj[ingredient.categorie][ingredient.nom].quantite_ingredient + qqt_ingredient } // si il n'y a pas déjà l'ingrédient
                }

            })
        })

        return newObj;
    }

    useEffect(() => {
        setListeIngredients(structureListeIngredients(data));
        console.log("Liste des recettes changées");
    }, [listeRecette,data]);

    useEffect(() => {
        console.log("Liste Ingredients changés");
    }, [listeIngredients]);
    // _______________________ Pour réactualiser la liste des ingredients _______________________ //


    return (
        <Grid templateRows={{  base: "repeat(2, 5fr)", lg: "repeat(1, 2fr)"}}
              templateColumns={{ base: "repeat(1, 2fr)",  lg: "repeat(5, 1fr)"}}
              gap={4} >

            <ReceipesList receipes={listeRecette} onClickAdd={onClickAdd} onClickRemove={onClickRemove}/>

            <GridItem colSpan={{ base: 1, lg: 4}} rowSpan={{ base: 4, lg: 1}}>

                <IngredientsList rows={listeIngredients}/>

            </GridItem>

        </Grid>
    );
};

export default IngredientsListMaker;




