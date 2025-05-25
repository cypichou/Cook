import apiClient from "@/services/api-clients.ts";

const SendForms = <T extends { [s: string]: unknown }>(
    endpoint: string,
    userdata: T,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {

    const controller = new AbortController();

    if (userdata !== undefined ) {
        if(Object.values(userdata).every((value) => value !== "")){ // pour verifier que les champs ne soient pas vides
            setIsLoading(true);

            apiClient
                .post(endpoint,  userdata )
                .then((res) => {
                    setIsLoading(false);
                    setError(false);
                    console.log(res)
                })
                .catch((e) => {
                    setIsLoading(false);
                    setError(true);
                    console.log(e)
                });
        }else{
            setError(true)
        }
        return () => controller.abort();
    }

};

export default SendForms;