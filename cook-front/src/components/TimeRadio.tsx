
import { Button, Menu, Portal, useCheckboxGroup } from "@chakra-ui/react"
import {IoTimerOutline} from "react-icons/io5";
import { useState} from "react";

const TimeRadio = () => {
    const group = useCheckboxGroup({ defaultValue: items.map(item => item.value) });
    const [times, setTimes] = useState<string[]>(["10", "20", "30"]);

    const handleToggle = (value: string) => {
            if (times.includes(value)) {
                setTimes(times.filter((item) => item !== value)) ;
            } else {
                setTimes([...times, value]) ;
            }
    }


    return (
        <Menu.Root closeOnSelect={false} >
            <Menu.Trigger asChild>
                <Button variant="outline" size="sm">
                    <IoTimerOutline/> Time
                </Button>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content>
                        <Menu.ItemGroup>
                            <Menu.ItemGroupLabel>Time</Menu.ItemGroupLabel>
                            {items.map(({ title, value }) => (
                                <Menu.CheckboxItem
                                    key={value}
                                    value={value}
                                    checked={group.isChecked(value)}
                                    onCheckedChange={() => {
                                        group.toggleValue(value);
                                        handleToggle(value);
                                    }}
                                >
                                    {title}
                                    <Menu.ItemIndicator  />
                                </Menu.CheckboxItem>
                            ))}
                        </Menu.ItemGroup>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    )
}

const items = [
    { title: "10min", value: "10" },
    { title: "20min", value: "20" },
    { title: "30min", value: "30" },
]


export default TimeRadio;
