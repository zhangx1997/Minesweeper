import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container" style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Welcome to Minesweeper!</h1>
      <p>Test your logic and memory by avoiding mines!</p>
      <div 
        className="button-container" 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: '30px',  /* Increased gap for better separation */
          marginTop: '20px' 
        }}
      >
        <Link to="/game/easy">
          <button 
            className="start-button" 
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#4CAF50', 
              border: 'none', 
              color: 'white', 
              cursor: 'pointer', 
              fontSize: '16px' 
            }}
          >
            Play Easy
          </button>
        </Link>
        <Link to="/game/medium">
          <button 
            className="start-button" 
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#4CAF50', 
              border: 'none', 
              color: 'white', 
              cursor: 'pointer', 
              fontSize: '16px' 
            }}
          >
            Play Medium
          </button>
        </Link>
        <Link to="/game/hard">
          <button 
            className="start-button" 
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#4CAF50', 
              border: 'none', 
              color: 'white', 
              cursor: 'pointer', 
              fontSize: '16px' 
            }}
          >
            Play Hard
          </button>
        </Link>

        {/* Apply large gap here */}
        <Link to="/rules">
          <button 
            className="rules-button" 
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#2196F3', 
              border: 'none', 
              color: 'white', 
              fontSize: '16px' 
            }}
          >
            Game Rules
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
