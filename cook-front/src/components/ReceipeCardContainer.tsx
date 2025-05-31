import type {ReactNode} from "react";
import {Box} from "@chakra-ui/react";

interface Props {
    children: ReactNode;
}

const ReceipeCardContainer = ({children}:Props) => {
    return (
        <Box width="250px" height="250px" overflow={"hidden"}>
            {children}
        </Box>
    );
};

export default ReceipeCardContainer;