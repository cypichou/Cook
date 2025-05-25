import {Text} from "@chakra-ui/react";
import useData from "@/hooks/useData.ts";

// interface receipes{
//     rows:receipe[];
// }

interface receipe {
    id: number;
    nom: string;
    temps_de_preparation: number;
    consignes: string;
}

const RecipesGrid = () => {

    const {data,error} = useData<receipe>('recettes')

    return (
        <div>
            {error && <Text>{error}</Text>}
            <ul>
                {data.map(receipe =>
                    <li key={receipe.id}>{receipe.nom}</li>
                )}
            </ul>
        </div>
    );
};

export default RecipesGrid;