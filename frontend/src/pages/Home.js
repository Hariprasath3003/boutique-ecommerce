import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container home-centered">
      <div className="moral-section">
        <h1 className="brand-title">Boutique</h1>
        <blockquote className="fashion-moral">
          "Fashion is not necessarily about labels. It's not about brands. It's about something else that comes from within you."
          <cite>— Rachel Roy</cite>
        </blockquote>
        <p className="sub-moral">
          Style is a way to say who you are without having to speak.
        </p>
      </div>

      <div className="cta-section">
        <Link to="/login" className="btn btn-elegant">
          Enter Boutique
        </Link>
      </div>
    </div>
  );
};

export default Home;
