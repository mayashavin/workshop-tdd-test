import "./Card.css"
// eslint-disable-next-line react/prop-types
export function Card({ title, description, image, price }) {
    return (
        <article className="card">
            <img src={image} alt={title} height={200} width={300} />
            <div className="card--details">
            <h2>{title}</h2>
            
            <p>{description}</p> 
            <div className="card--inventory">
                <div className="card--inventory-price">${price}</div>
            </div>
            </div>
            <button className="card--btn">Add to cart</button>
        </article>
    );
}