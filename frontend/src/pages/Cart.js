import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../styles/Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, loading, removeFromCart, updateCartItem } = useContext(CartContext);

  const handleRemoveItem = async (itemId) => {
    try {
      await removeFromCart(itemId);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleQuantityChange = async (itemId, newQuantity, size) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    try {
      await updateCartItem(itemId, newQuantity, size);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) {
    return <div className="loading">Loading cart...</div>;
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <a href="/shop" className="btn">Continue Shopping</a>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      <div className="cart-content">
        <div className="cart-items">
          {cart.items.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                {item.product_details.image && (
                  <img src={`http://localhost:8000${item.product_details.image}`} alt={item.product_details.name} />
                )}
              </div>
              <div className="item-details">
                <h3>{item.product_details.name}</h3>
                <p className="item-size">Size: {item.size}</p>
                <p className="item-price">${item.product_details.price}</p>
              </div>
              <div className="item-quantity">
                <button onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.size)}>-</button>
                <input type="number" value={item.quantity} readOnly />
                <button onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.size)}>+</button>
              </div>
              <div className="item-total">
                <p>${item.total_price}</p>
              </div>
              <button
                className="btn-remove"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${cart.total_price}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${cart.total_price}</span>
          </div>
          <button className="btn btn-checkout" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/shop')}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
