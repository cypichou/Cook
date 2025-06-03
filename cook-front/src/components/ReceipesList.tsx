import { Box, Button, HStack, Text } from "@chakra-ui/react";
import type {Receipe} from "@/components/RecipesGrid.tsx";
import {useNavigate} from "react-router-dom";

interface RecetteBarProps {
    receipes: Receipe[];
    onValider: () => void;
}
// Ce composant affiche les recettes qui ont été séléctionnées
const ReceipesList = ({ receipes }: RecetteBarProps) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/liste");
    };

    return (
        <Box height="40px" width="100%" bg="gray.100" px={2}>
            <HStack height="100%" justifyContent="space-between">
                <Box display="flex" alignItems="center" flex="1" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis"
                >
                    {receipes.map((receipe:Receipe) => (
                        <Text key={receipe.id} mr={2} fontSize="md">
                            {receipe.nom}
                        </Text>
                    ))}
                </Box>

                <Button size="sm" height="30px" onClick={()=>{handleClick()}} whiteSpace="nowrap" colorPalette="green"
                >
                    Valider les recettes
                </Button>
            </HStack>
        </Box>
    );
};

export default ReceipesList;
