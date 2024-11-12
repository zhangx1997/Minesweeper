import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav 
      className="navbar" 
      style={{
        backgroundColor: '#333',
        padding: '10px',
        display: 'flex',
        justifyContent: 'space-around',
        position: 'relative',  // Ensures navbar isn't fixed
      }}
    >
      <Link 
        to="/" 
        className="navbar-link" 
        style={{
          color: 'white',
          textDecoration: 'none',
          padding: '10px',
        }}
      >
        Home
      </Link>
      <Link 
        to="/rules" 
        className="navbar-link" 
        style={{
          color: 'white',
          textDecoration: 'none',
          padding: '10px',
        }}
      >
        Rules
      </Link>
    </nav>
  );
}

export default Navbar;
