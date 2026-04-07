import React, { useState, useEffect } from 'react';
import { orderAPI } from '../services/api';
import '../styles/MyOrders.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await orderAPI.getOrders();
      const data = response.data;
      const ordersArray = Array.isArray(data)
        ? data
        : data.results || data.orders || [];
      setOrders(ordersArray);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  return (
    <div className="orders-container">
      <h1>My Orders</h1>

      {!Array.isArray(orders) || orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>
          <a href="/shop" className="btn">Start Shopping</a>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>Order #{order.id}</h3>
                <span className={`status status-${order.status}`}>{order.status}</span>
              </div>

              <div className="order-info">
                <div className="info-row">
                  <span>Date:</span>
                  <span>{new Date(order.created_at).toLocaleDateString()}</span>
                </div>
                <div className="info-row">
                  <span>Total:</span>
                  <span>${order.total_price}</span>
                </div>
              </div>

              <div className="order-items">
                <h4>Items:</h4>
                {order.items.map((item) => (
                  <div key={item.id} className="item-row">
                    <span>{item.product_details.name}</span>
                    <span>Size: {item.size} | Qty: {item.quantity}</span>
                    <span>${item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
