import {SimpleGrid, Text} from "@chakra-ui/react";
import useData from "@/hooks/useData.ts";
import RecipesCard from "@/components/RecipesCard.tsx";
import ReceipeCardSqueleton from "@/components/ReceipeCardSqueleton.tsx";
import GameCardContainer from "@/components/ReceipeCardContainer.tsx";
import ReceipeCardContainer from "@/components/ReceipeCardContainer.tsx";

export interface Receipe {
    id: number;
    nom: string;
    temps_de_preparation?: number;
    consignes?: string;
    image_url?: string;
}

interface Props {
    addReceipe: (receipe: Receipe) => void;
}

const RecipesGrid = ({addReceipe}:Props) => {

    const {data,error,isLoading} = useData<Receipe>('recettes')
    const skeletons = [1,2,3,4,5,6]

    return (
        <div>
            {error && <Text>{error}</Text>}
            {isLoading && skeletons.map(skeleton =>
                <GameCardContainer key={skeleton}>
                    <ReceipeCardSqueleton />
                </GameCardContainer>
            )}
            <SimpleGrid columns={{sm:1,md:2,lg:3,xl:5}} gap={"10px"} padding={"10px"}>
                {data.map(receipe =>
                    <ReceipeCardContainer key={receipe.id}>
                        <RecipesCard receipe={receipe} addReceipe={addReceipe} key={receipe.id} />
                    </ReceipeCardContainer>
                )}
            </SimpleGrid>
        </div>
    );
};

export default RecipesGrid;