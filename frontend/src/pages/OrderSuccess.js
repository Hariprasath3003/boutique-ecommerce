import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/OrderSuccess.css';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (location.state?.order) {
      setOrder(location.state.order);
    } else {
      navigate('/shop');
    }
  }, [location.state, navigate]);

  if (!order) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="order-success-container">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your purchase</p>

        <div className="order-details">
          <div className="detail-row">
            <span>Order ID:</span>
            <strong>#{order.id}</strong>
          </div>
          <div className="detail-row">
            <span>Total Amount:</span>
            <strong>${order.total_price}</strong>
          </div>
          <div className="detail-row">
            <span>Status:</span>
            <strong>{order.status}</strong>
          </div>
          <div className="detail-row">
            <span>Date:</span>
            <strong>{new Date(order.created_at).toLocaleDateString()}</strong>
          </div>
        </div>

        <div className="success-items">
          <h3>Order Items:</h3>
          {order.items.map((item) => (
            <div key={item.id} className="success-item">
              <span>{item.product_details.name}</span>
              <span>Size: {item.size} | Qty: {item.quantity}</span>
              <span>${item.price}</span>
            </div>
          ))}
        </div>

        <div className="success-actions">
          <button className="btn btn-primary" onClick={() => navigate('/shop')}>
            Continue Shopping
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/my-orders')}>
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
