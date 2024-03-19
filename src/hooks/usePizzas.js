import { useEffect, useState } from "react";

export const usePizzas = () => {
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchPizzas = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("api/search");
            console.log(response)

            if (!response.ok) {
                throw new Error("Failed to fetch pizzas");
            }

            const data = await response.json();
            setPizzas(data);
        } catch (err) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchPizzas();
    }, []);

    return {
        pizzas,
        isLoading,
        isError,
    }
}