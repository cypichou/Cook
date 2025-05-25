import {Grid, GridItem} from "@chakra-ui/react";
import NavBar from "@/components/NavBar.tsx";
import RecipesGrid from "@/components/RecipesGrid.tsx";

function App() {
    return (
        <Grid templateAreas ={{
            base: `"nav"  "main"`,
            lg: `"nav nav"  "aside main"`
        }}>
            <GridItem area='nav'>
                <NavBar/>
            </GridItem>
            <GridItem area='aside' hideBelow={"lg"}>Aside</GridItem>
            <GridItem area='nav'>Nav</GridItem>
            <GridItem area='main'>
                <RecipesGrid/>
            </GridItem>
        </Grid>
    )
}

export default App


// <BrowserRouter future={{ v7_relativeSplatPath: true }}>
// <Routes>
// <Route path="/" element={<Login />} />
// </Routes>
// </BrowserRouter>
