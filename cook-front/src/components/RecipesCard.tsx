import type {Receipe} from "@/components/RecipesGrid.tsx";
import {Button, Card, HStack, Image, Text, VStack} from "@chakra-ui/react";
import {baseURLconst} from "@/services/api-clients.ts";
import {useColorModeValue} from "@/components/ui/color-mode.tsx";
import TimeBadge from "@/components/TimeBadge.tsx";
import {MdAdd} from "react-icons/md";
import {useState} from "react";
import { IoIosRemove } from "react-icons/io";

interface Props {
    receipe : Receipe;
    addReceipe: (receipe : Receipe) => void;
}

const RecipesCard = ({receipe, addReceipe}:Props) => {
    const revertColor = useColorModeValue("white", "black")
    const [add,setAdd] = useState<Boolean>(true)

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

                            <Button colorPalette={add?"green":"red"} color={revertColor} w="40px" h="40px" p={0} minW="unset"
                                    onClick={() => {addReceipe(receipe);setAdd(!add)}}>
                                {add?<MdAdd color={revertColor}/>:<IoIosRemove color={revertColor}/>}
                            </Button>

                        </HStack>

                        <TimeBadge time={receipe.temps_de_preparation?receipe.temps_de_preparation:0} />

                    </VStack>

                </Card.Footer>
            </Card.Root>

        </>
    );
};

export default RecipesCard;