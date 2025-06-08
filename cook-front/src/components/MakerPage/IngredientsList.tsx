import {Box, Button, Heading, SimpleGrid, Table} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import type {Ingredient} from "@/components/MakerPage/IngredientsListMaker.tsx";
import {use, useEffect} from "react";

export type IngredientsParCategorie = Record<string, Ingredients>;
type Ingredients = Record<string, Ingredient>;

interface IngredientsListProps {
    rows: IngredientsParCategorie;
}

const IngredientsList = ({ rows }: IngredientsListProps) => {

    const colorRef: Record<string,string> = { // TODO mettre un petit logo aussi
        "Viande":"red.100",
        "Légume":"green.100",
        "Poisson":"blue.100",
        "Fruit":"orange.100",
        "Féculent":"teal.100",
        "Oléagineux":"yellow.100",
        "Produit laitier":"cyan.100",
        "Epices":"pink.100"
    }

    useEffect(() => {
        //console.log(rows);
    }, []);

    return (
        <SimpleGrid columns={{sm: 1, md: 2, lg: 3}} gap={"100px"} padding={10}>
            {Object.keys(rows).map((categorie) => (
                <Box key={categorie} mb={8} borderRadius={"8px"} gap={"0px"} margin={0} padding={0} overflow={"hidden"}>
                    <Box background={colorRef[categorie]?colorRef[categorie]:"grey.200"} margin={0}  h={"30px"} >
                        <Heading size="md" mb={2} pl={2}  display="flex" alignItems="center" margin={0} h={"100%"}>
                            {categorie}
                        </Heading>
                    </Box>
                    <Table.Root size="sm">
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader>Nom</Table.ColumnHeader>
                                <Table.ColumnHeader>Quantité</Table.ColumnHeader>
                                <Table.ColumnHeader>Suprr</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {Object.values(rows[categorie]).map((ingredient) =>
                                    <Table.Row key={categorie + "-" + ingredient.id}>
                                        <Table.Cell>{ingredient.nom}</Table.Cell>
                                        <Table.Cell>{ingredient.quantite_ingredient + " " + ingredient.unite}</Table.Cell>
                                        <Table.Cell m={0} p={0}>
                                            <Button
                                                h={"30px"}
                                                w={"30px"}
                                                color={"gray.300"}
                                                variant="ghost"
                                            >
                                                <MdDelete />
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                            )}
                        </Table.Body>
                    </Table.Root>
                </Box>
            ))}
        </SimpleGrid>
    );
};

export default IngredientsList