import React, { useState, useEffect } from 'react';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import '../styles/Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productAPI.getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shop-container">
      <div className="shop-header">
        <div className="fashion-quote">
          <blockquote>
            "Fashion is not necessarily about labels. It's not about brands. It's about something else that comes from within you."
            <cite>— Rachel Roy</cite>
          </blockquote>
        </div>
        <h1>Discover Your Style</h1>
        <p>Elegant fashion pieces for the modern individual</p>
      </div>

      {loading ? (
        <div className="loading">Curating the perfect pieces...</div>
      ) : products.length === 0 ? (
        <div className="no-products">No products available at the moment</div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
