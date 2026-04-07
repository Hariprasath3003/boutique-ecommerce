import React, { useState, useEffect } from 'react';
import { productAPI, orderAPI } from '../services/api';
import AddProductModal from '../components/AddProductModal';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (activeTab === 'products') {
      fetchProducts();
    } else if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productAPI.getAdminProducts();
      const data = response.data;
      setProducts(Array.isArray(data) ? data : data.results || data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await orderAPI.getAllOrders();
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

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productAPI.deleteProduct(id);
        setProducts(products.filter((p) => p.id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleAddProduct = async (productData) => {
    try {
      await productAPI.createProduct(productData);
      setShowAddModal(false);
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await orderAPI.updateOrderStatus(orderId, newStatus);
      fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="sidebar-brand">
            Boutique Admin
          </div>

          <nav className="sidebar-nav">
            <button
              className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <span className="nav-icon">📊</span>
              <span className="nav-label">Dashboard</span>
            </button>

            <button
              className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              <span className="nav-icon">📦</span>
              <span className="nav-label">Products</span>
            </button>

            <button
              className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <span className="nav-icon">📋</span>
              <span className="nav-label">Orders</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="admin-main">

          {/* Dashboard Content */}
          {activeTab === 'dashboard' && (
            <div className="dashboard-content">
              <div className="content-header">
                <h1>Dashboard</h1>
                <p>Overview of your store's performance</p>
              </div>
              <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Products</h3>
              <p className="stat-number">{products.length}</p>
            </div>
            <div className="stat-card">
              <h3>Total Orders</h3>
              <p className="stat-number">{orders.length}</p>
            </div>
            <div className="stat-card">
              <h3>Pending Orders</h3>
              <p className="stat-number">{orders.filter((o) => o.status === 'pending').length}</p>
            </div>
            <div className="stat-card">
              <h3>Delivered Orders</h3>
              <p className="stat-number">{orders.filter((o) => o.status === 'delivered').length}</p>
            </div>
              </div>
            </div>
          )}

          {/* Products Content */}
          {activeTab === 'products' && (
            <div className="products-content">
              <div className="content-header">
                <h1>Products</h1>
                <p>Manage listings</p>
              </div>
              <div className="products-header">
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                  Add New Product
                </button>
              </div>

              {loading ? (
                <div className="loading">Loading products...</div>
              ) : products.length === 0 ? (
                <div className="no-products">
                  <p>No products yet. Add your first product!</p>
                </div>
              ) : (
                <div className="products-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Sizes</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td>
                            {product.image && (
                              <img src={`http://localhost:8000${product.image}`} alt={product.name} />
                            )}
                          </td>
                          <td>
                            <div>
                              <strong>{product.name}</strong>
                              <p>{product.description.substring(0, 50)}...</p>
                            </div>
                          </td>
                          <td>${product.price}</td>
                          <td>{product.sizes}</td>
                          <td>
                            <button className="btn-edit">Edit</button>
                            <button
                              className="btn-delete"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Orders Content */}
          {activeTab === 'orders' && (
            <div className="orders-content">
              <div className="content-header">
                <h1>Orders</h1>
                <p>Customer orders</p>
              </div>

              {loading ? (
                <div className="loading">Loading orders...</div>
              ) : !Array.isArray(orders) || orders.length === 0 ? (
                <div className="no-orders">
                  <p>No orders yet</p>
                </div>
              ) : (
                <div className="orders-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Items</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td>#{order.id}</td>
                          <td>{order.user_username}</td>
                          <td>${order.total_price}</td>
                          <td>{order.items.length}</td>
                          <td>
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                              className="status-select"
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                            </select>
                          </td>
                          <td>{new Date(order.created_at).toLocaleDateString()}</td>
                          <td>
                            <button className="btn-view">View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddProduct}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
