import {useEffect, useState} from "react";
import apiClient from "@/services/api-clients.ts";
import {Text} from "@chakra-ui/react";

interface receipes {
    rows:receipe[]
}

interface receipe {
    id: number;
    nom: string;
    temps_de_preparation: number;
    consignes: string;
}

const RecipesGrid = () => {
    const [receipes, setReceipes] = useState<receipes>({rows:[]})
    const [error, setError] = useState('')

    useEffect(() => {
        apiClient.get<receipes>('/recettes')
            .then(res => setReceipes(res.data))
            .catch(err => setError(err.message))
    },[])

    return (
        <div>
            {error && <Text>{error}</Text>}
            <ul>
                {receipes.rows.map(receipe =>
                    <li key={receipe.id}>{receipe.nom}</li>
                )}
            </ul>
        </div>
    );
};

export default RecipesGrid;