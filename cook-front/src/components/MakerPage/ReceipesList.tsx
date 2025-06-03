import type {Receipe} from "@/components/RecipesGrid.tsx";
import {GridItem, Text} from "@chakra-ui/react";

interface Props {
    receipes:Receipe[];
}

const ReceipesList = ({receipes}:Props) => {
    return (
            <GridItem colSpan={{ base: 1, lg: 1}} rowSpan={{ base: 1, lg: 1}}>
                {receipes.map((receipe:Receipe) => (
                    <Text key={receipe.id}>{receipe.nom}</Text>
                ))}
            </GridItem>
    );
};

export default ReceipesList;