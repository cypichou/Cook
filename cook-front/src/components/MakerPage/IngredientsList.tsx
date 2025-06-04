import type {Receipe} from "@/components/RecipesGrid.tsx";
import useData from "@/hooks/useData.ts";
import {Box, Heading, SimpleGrid, Table} from "@chakra-ui/react";
import type {AxiosRequestConfig} from "axios";
import qs from 'qs';

interface Props {
    receipes:Receipe[];
}

interface Ingredient {
    "nom_ingredient": string,
    "nom_recette": string,
    "quantite": number,
    "categorie": string
}

const IngredientsList = ({receipes}:Props) => {

    const tabIngredients = receipes.map((receipe:Receipe) => receipe.id)

    const config: AxiosRequestConfig = {
        params: { ids: tabIngredients },
        paramsSerializer: {
            serialize: (params: Record<string, any>): string =>
                qs.stringify(params, { arrayFormat: 'repeat' })
        }
    };

    const {data} = useData<Ingredient>("recettes/ingredients/",config)

    const categoriesMap: Record<string, Ingredient[]> = {};

    data.forEach((ingredient:Ingredient) => {
        const { categorie } = ingredient;
        if (!categoriesMap[categorie]) {
            categoriesMap[categorie] = [];
        }
        categoriesMap[categorie].push(ingredient);
    });

    return (
        <SimpleGrid columns={{sm:1,md:2,lg:3}} gap={"100px"} padding={10}>
            {Object.entries(categoriesMap).map(([categorie, items]) => (
                <Box key={categorie} mb={8} borderRadius={"8px"} gap={"0px"} margin={0} padding={0} overflow={"hidden"}>
                    <Box background={"yellow.200"} margin={0}  h={"30px"} >
                        <Heading size="md" mb={2} pl={2}  display="flex" alignItems="center" margin={0} h={"100%"}>{categorie}</Heading>
                    </Box>
                    <Table.Root size="sm">
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader>Nom</Table.ColumnHeader>
                                <Table.ColumnHeader>Quantité</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {items.map((ingredient, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>{ingredient.nom_ingredient}</Table.Cell>
                                    <Table.Cell>{ingredient.quantite}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </Box>
            ))}
        </SimpleGrid>
    );
};

export default IngredientsList