import {Grid, GridItem, Image} from "@chakra-ui/react";


const IngredientsListMaker = () => {
    return (
        <Grid
            templateRows={{  base: "repeat(5, 1fr)"}}
            templateColumns={{  lg: "repeat(5, 1fr)"}}
            gap={4}
        >
            <GridItem colSpan={1} rowSpan={1}>
                <Image
                    width="100%"
                    height="100%"
                />
            </GridItem>
            <GridItem colSpan={4} rowSpan={4}>
                <Image
                        width="100%"
                        height="100%"
                    />
            </GridItem>

        </Grid>
    );
};

export default IngredientsListMaker;




