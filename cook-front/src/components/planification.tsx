import React from 'react'
import { Button, Heading } from '@chakra-ui/react'

interface WelcomeSectionProps {
    onClick: () => void
}


const Planification: React.FC<WelcomeSectionProps> = ({onClick} )=> {
    return (
        <div style={{padding: '2rem'}}>
            <Heading color="teal.500">Bienvenue sur Cook 🍽️</Heading>
            <Button colorScheme="teal" mt="4" onClick={onClick}>
                Cuisiner
            </Button>
        </div>
    )
}

export default Planification
