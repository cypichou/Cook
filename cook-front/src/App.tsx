import {Grid, GridItem, Show} from "@chakra-ui/react";

function App() {
    return (
        <Grid templateAreas ={{
            base: `"nav"  "main"`,
            lg: `"nav nav"  "aside main"`
        }}>
            <GridItem area='nav'>Nav</GridItem>
            <Show when={{ base: false, lg: true }}>
                <GridItem area='aside'>Aside</GridItem>
            </Show>
            <GridItem area='nav'>Nav</GridItem>
            <GridItem area='main'>Main</GridItem>
        </Grid>
    )
}

export default App


// <BrowserRouter future={{ v7_relativeSplatPath: true }}>
// <Routes>
// <Route path="/" element={<Login />} />
// </Routes>
// </BrowserRouter>
