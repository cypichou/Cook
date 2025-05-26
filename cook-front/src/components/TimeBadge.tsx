import {Badge, Icon, Stack, Text} from "@chakra-ui/react";
import {IoTimerOutline} from "react-icons/io5";
import {useColorModeValue} from "@/components/ui/color-mode.tsx";

interface Props {
    time:number;
}

const TimeBadge = ({time}:Props) => {
    const color = useColorModeValue("black", "white")

    let bgColor = time >= 30 ? "red" : time >= 20 ? "yellow.500" : "green"

    return (
        <Badge background={bgColor}>
            <Stack direction="row" gap={"3px"}>
                <Icon size="sm" color={color}>
                    <IoTimerOutline/>
                </Icon>
                <Text fontSize={"14px"} display="flex" alignItems="center">{time}''</Text>
            </Stack>
        </Badge>
    );
};

export default TimeBadge;