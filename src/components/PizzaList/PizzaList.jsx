import { SearchBox } from "../SearchBox/SearchBox";
import { usePizzas } from "../../hooks/usePizzas";
import { Card } from "../Card/Card";
import "./PizzaList.css";

export const PizzaList = () => {
    const { pizzas } = usePizzas(); 
    return (
        <section className="pizza-list">
            <h1>Pizzas</h1>
            <SearchBox label="Search for pizza" placeholder="By title" />
            <ul className="pizza-list-wrapper">
                {pizzas.map((pizza) => (
                    <li key={pizza.id}>
                        <Card {...pizza} />
                    </li>
                ))}
            </ul>
        </section>
    );
};