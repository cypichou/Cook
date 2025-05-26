import {Card, Skeleton, SkeletonText} from "@chakra-ui/react";

const ReceipeCardSqueleton = () => {
    return (
        <Card.Root width="250px" height="250px">
            <Skeleton height={"200px"}/>
                <Card.Body>
                    <SkeletonText/>
                </Card.Body>
        </Card.Root>
    );
};

export default ReceipeCardSqueleton;