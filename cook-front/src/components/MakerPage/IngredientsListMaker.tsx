import { Grid, GridItem, Text} from "@chakra-ui/react";
import type {Receipe} from "@/components/RecipesGrid.tsx";
import ReceipesList from "@/components/MakerPage/ReceipesList.tsx";
import IngredientsList from "@/components/MakerPage/IngredientsList.tsx";

interface Props {
    receipes:Receipe[];
}

const IngredientsListMaker = ({receipes}:Props) => {
    return (
        <Grid
            templateRows={{  base: "repeat(2, 5fr)", lg: "repeat(1, 2fr)"}}
            templateColumns={{ base: "repeat(1, 2fr)",  lg: "repeat(5, 1fr)"}}
            gap={4}
        >

            <ReceipesList receipes={receipes}/>

            <GridItem colSpan={{ base: 1, lg: 4}} rowSpan={{ base: 4, lg: 1}}>

                <IngredientsList receipes={receipes}/>

            </GridItem>

        </Grid>
    );
};

export default IngredientsListMaker;




