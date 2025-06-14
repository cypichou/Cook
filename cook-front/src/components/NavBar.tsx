import {HStack, Text} from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode"
import { useColorMode } from "@/components/ui/color-mode"
import TimeRadio from "@/components/TimeRadio.tsx";

const NavBar = () => {
    const { toggleColorMode } = useColorMode()
    return (
        <HStack>
            <Text>logo</Text>
            <ColorModeButton variant="outline" onClick={toggleColorMode}>
                Toggle Mode
            </ColorModeButton>
            <TimeRadio/>
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

