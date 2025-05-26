import {HStack, Image, Text} from "@chakra-ui/react";
import logo from "../assets/react.svg"
import { ColorModeButton } from "@/components/ui/color-mode"
import { useColorMode } from "@/components/ui/color-mode"

const NavBar = () => {
    const { toggleColorMode } = useColorMode()
    return (
        <HStack>
            <Image src={logo} alt="logo"/>
            <Text>logo</Text>
            <ColorModeButton variant="outline" onClick={toggleColorMode}>
                Toggle Mode
            </ColorModeButton>
        </HStack>
    );
};

export default NavBar;

// const $COMPONENT$ = () => {
//     return (
//         <div>
//
//         </div>
//     );
// };
//
// export default $COMPONENT$;

