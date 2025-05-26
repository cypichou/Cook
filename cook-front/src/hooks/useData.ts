import {useEffect, useState} from "react";
import apiClients from "@/services/api-clients.ts";
import {type AxiosRequestConfig, CanceledError} from "axios";

const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {

    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        // Création d'un AbortController pour permettre l'annulation de la requête en cas de démontage du composant
        const controller = new AbortController();

        setLoading(true); // Active l'état de chargement
        apiClients
            .get<T[]>(endpoint, { signal: controller.signal, ...requestConfig }) // Envoie la requête avec la configuration fournie
            .then((res) => {
                setData(res.data);
                // console.log(res);
                setLoading(false);
            })
            .catch((err) => {
                // Vérifie si l'erreur est due à une annulation; si oui, on ignore l'erreur
                if (err instanceof CanceledError) return;
                setError(err.message);
                setLoading(false);
            });

        // Fonction de nettoyage pour annuler la requête en cas de démontage du composant
        return () => controller.abort();
    }, deps ? [...deps] : []);

    return { data, error, isLoading };
};

export default useData;
