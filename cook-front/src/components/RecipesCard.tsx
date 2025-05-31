import type {Receipe} from "@/components/RecipesGrid.tsx";
import {Button, Card, HStack, Image, Text, VStack} from "@chakra-ui/react";
import {baseURLconst} from "@/services/api-clients.ts";
import {useColorModeValue} from "@/components/ui/color-mode.tsx";
import TimeBadge from "@/components/TimeBadge.tsx";
import { MdAdd } from "react-icons/md";

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
                        objectFit="cover"
                    />
                </Card.Body>

                <Card.Footer position="absolute" bottom="0" width="100%" background={revertColor} padding="8px" display="flex" justifyContent="space-between" alignItems="center" height="100px">

                    <VStack w="100%">

                        <HStack gap={0} align="center">

                            <Text fontSize="22px" flex="1" w="192px" h="60px" display="flex" alignItems="center">
                                {receipe.nom}
                            </Text>

                            <Button colorPalette="green" color={revertColor} w="40px" h="40px" p={0} minW="unset">
                                <MdAdd color={revertColor} />
                            </Button>

                        </HStack>

                        <TimeBadge time={receipe.temps_de_preparation} />

                    </VStack>

                </Card.Footer>
            </Card.Root>

        </>
    );
};

export default RecipesCard;