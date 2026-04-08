import axios from 'axios';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  process.env.REACT_APP_API_URL ||
  'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register/', data),
  login: (username, password) => api.post('/auth/login/', { username, password }),
  logout: () => api.post('/auth/logout/'),
};

export const productAPI = {
  getAllProducts: () => api.get('/products/all_products/'),
  getAdminProducts: () => api.get('/products/user_products/'),
  createProduct: (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('sizes', data.sizes);
    formData.append('image', data.image);
    return api.post('/products/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  updateProduct: (id, data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('sizes', data.sizes);
    if (data.image) {
      formData.append('image', data.image);
    }
    return api.patch(`/products/${id}/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  deleteProduct: (id) => api.delete(`/products/${id}/`),
};

export const cartAPI = {
  getCart: () => api.get('/cart/get_cart/'),
  addItem: (productId, quantity, size) =>
    api.post('/cart/add_item/', { product_id: productId, quantity, size }),
  removeItem: (itemId) => api.delete('/cart/remove_item/', { data: { item_id: itemId } }),
  updateItem: (itemId, quantity, size) =>
    api.post('/cart/update_item/', { item_id: itemId, quantity, size }),
  clearCart: () => api.delete('/cart/clear_cart/'),
};

export const orderAPI = {
  getOrders: () => api.get('/orders/'),
  getAllOrders: () => api.get('/orders/admin_orders/'),
  createOrder: () => api.post('/orders/create_order/'),
  updateOrderStatus: (id, status) =>
    api.patch(`/orders/${id}/update_status/`, { status }),
};

export default api;
