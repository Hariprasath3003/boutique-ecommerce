import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes_list ? product.sizes_list[0] : 'M');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleAddToCartClick = () => {
    setShowModal(true);
  };

  const handleConfirmAddToCart = async () => {
    setLoading(true);
    try {
      await addToCart(product.id, quantity, selectedSize);
      alert('Product added to cart successfully!');
      setShowModal(false);
    } catch (error) {
      alert('Failed to add to cart. Please login first.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSize(product.sizes_list ? product.sizes_list[0] : 'M');
    setQuantity(1);
  };

  return (
    <>
      <div className="product-card">
        <div className="product-info">
          <h3>{product.name}</h3>
          <p className="product-description">{product.description.substring(0, 120)}...</p>

          <div className="product-footer">
            <span className="product-price">${product.price}</span>
            <button
              className="btn btn-add-cart"
              onClick={handleAddToCartClick}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add to Cart</h3>
              <button className="modal-close" onClick={handleCloseModal}>×</button>
            </div>

            <div className="modal-body">
              <div className="product-summary">
                <h4>{product.name}</h4>
                <p className="product-price">${product.price}</p>
              </div>

              <div className="form-group">
                <label>Size:</label>
                <div className="sizes-list">
                  {product.sizes_list && product.sizes_list.map((size) => (
                    <button
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Quantity:</label>
                <div className="quantity-control">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <input type="number" value={quantity} readOnly />
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>

              <div className="modal-total">
                <span>Total: ${(product.price * quantity).toFixed(2)}</span>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleCloseModal}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleConfirmAddToCart}
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Confirm Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
