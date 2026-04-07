import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, token, isAdmin, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const cartItemCount = cart?.items?.length || 0;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
  Boutique
</Link>

        <div className="navbar-menu">
          {!token ? (
            <div className="nav-links">
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </div>
          ) : isAdmin ? (
            <div className="nav-links">
              <Link to="/admin" className="nav-link">Admin Panel</Link>
              <Link to="/shop" className="nav-link">Shop</Link>
              <button onClick={handleLogout} className="nav-link logout">Logout</button>
            </div>
          ) : (
            <div className="nav-links">
              <Link to="/shop" className="nav-link">Shop</Link>
              <Link to="/my-orders" className="nav-link">My Orders</Link>
              <Link to="/cart" className="nav-link cart-link">
                Cart
                {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
              </Link>
              <button onClick={handleLogout} className="nav-link logout">Logout</button>
            </div>
          )}
        </div>

        {user && (
          <div className="user-info">
            <span className="user-name">{user.username}</span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
