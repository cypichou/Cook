import {GridItem, Text, Button} from "@chakra-ui/react";
import { IoIosAdd,IoIosRemove } from "react-icons/io";
import type {listeQuantityReceipes} from "@/components/MakerPage/IngredientsListMaker.tsx";

interface Props {
    receipes:listeQuantityReceipes[];
    onClickAdd: (id:number) => void;
    onClickRemove: (id:number) => void;
}

const ReceipesList = ({receipes,onClickAdd,onClickRemove}:Props) => {
    return (
            <GridItem colSpan={{ base: 1, lg: 1}} rowSpan={{ base: 1, lg: 1}}>
                {receipes.map((receipe:listeQuantityReceipes) => (
                    <>
                        <Text key={receipe.id} textStyle="xl" >{receipe.nom + " " + receipe.quantite}</Text>
                        <Button onClick={()=>(onClickAdd(receipe.id))} colorPalette={"green"} variant="surface" h={"20px"}>
                            <IoIosAdd/>
                        </Button>
                        <Button onClick={()=>(onClickRemove(receipe.id))} colorPalette={"red"} variant="surface" h={"20px"}>
                            <IoIosRemove/>
                        </Button>
                    </>
                ))}
            </GridItem>
    );
};

export default ReceipesList;