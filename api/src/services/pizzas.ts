import { filterItems } from "./filterItems";
export interface Pizza {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

export const getPizzas = async (query?: string) => {
  //1. Fetch the pizzas from the API
  //2. Map the response to the Pizza type
  //2.1 Filter out any pizzas that are not available
  //2.2 Filter pizzas by query (by title)
  //3. Return the mapped response
  const API_URL = process.env["API_URL"];

  if (!API_URL) {
    throw new Error("API_URL is not set");
  }

  const response = await fetch(`${API_URL}/pizzas`)
    .then((res) => res.json())
    .catch((err) => {
      throw new Error("Failed to fetch pizzas");
    });

  return filterItems(response, "title", query) as Pizza[];
};
