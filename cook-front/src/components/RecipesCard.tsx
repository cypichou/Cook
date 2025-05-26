import type {Receipe} from "@/components/RecipesGrid.tsx";
import { Card, Image, Text} from "@chakra-ui/react";
import {baseURLconst} from "@/services/api-clients.ts";
import {useColorModeValue} from "@/components/ui/color-mode.tsx";
import TimeBadge from "@/components/TimeBadge.tsx";

interface Props {
    receipe : Receipe
}

const RecipesCard = ({receipe}:Props) => {
    const revertColor = useColorModeValue("white", "black")

    return (
        <>
            <Card.Root position="relative" width="250px" height="250px" overflow="hidden">
                <Card.Body padding="0px">
                    <Image
                        src={baseURLconst + "receipesImage/img.png"}
                        width="100%"
                        height="100%"
                        objectFit="contain" // ou "cover" selon le rendu souhaité
                    />
                </Card.Body>

                <Card.Footer
                    position="absolute"
                    bottom="0"
                    width="100%"
                    background={revertColor}
                    padding="8px"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    height="100px"
                >
                    <Text fontSize="22px">{receipe.nom}</Text>
                    <TimeBadge time={receipe.temps_de_preparation} />
                </Card.Footer>
            </Card.Root>

        </>
    );
};

export default RecipesCard;