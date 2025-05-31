import {Grid, GridItem} from "@chakra-ui/react";
import NavBar from "@/components/NavBar.tsx";
import RecipesGrid, {type Receipe} from "@/components/RecipesGrid.tsx";
import ReceipesList from "@/components/ReceipesList.tsx";
import {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IngredientsListMaker from "@/components/IngredientsListMaker.tsx";


function App() {

    const[receipesList, setReceipesList] = useState<Receipe[]>([]);

    const handleToggle = (value: Receipe) => {
        console.log(receipesList.includes(value));
        if (receipesList.includes(value)) {
            setReceipesList(receipesList.filter((item) => item !== value)) ;
        } else {
            setReceipesList([...receipesList, value]) ;
        }
    }

    return (

        <Router>

            <Grid templateAreas ={{
                base: `"nav"  "main"`,
                lg: `"nav nav" "aside main"`
            }}>
                <GridItem area='nav'><NavBar/></GridItem>

            {/*// composant afficher en fonction de l'url*/}
            <Routes>
                <Route path="/" element={
                    <GridItem area='main'>
                        <ReceipesList receipes={receipesList} onValider={() => console.log("Validé")} />
                        <RecipesGrid addReceipe={handleToggle}/>
                    </GridItem>
                } />
                <Route path="/liste" element={<IngredientsListMaker />} />
            </Routes>

                <GridItem area='aside' hideBelow={"lg"}>Aside</GridItem>

            </Grid>

        </Router>

    )


}



export default App



