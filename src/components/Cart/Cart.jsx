import "./Cart.css"
const CartItem = () => {
    return (
        <article className="cart__list-item">
            <span data-testid="title">1. Item title</span>
            <span data-testid="price">$10</span> x
            <span data-testid="quantity">1</span>
            <span data-testid="total">= $10</span>
            <button className="cart__list-item--remove">Remove</button>
        </article>
    )
}

export const Cart = () => {
    const inCart = 0;
    const showCartDetails = false;
    
    return (
        <div className="cart">
            <span className="cart__total" role="button">Cart: {inCart}</span>
            {showCartDetails && (
                <div className="cart__list">
                    {inCart === 0 ? (
                        <p>No item in cart</p>
                    ) : (
                        <div>
                            <p>In your cart:</p>
                            <ul>
                                <li className="cart__list-item">
                                    <CartItem />
                                </li>
                            </ul>
                            <div className="separator"></div>
                            <button data-testid="remove-all">Remove all</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}