import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Minesweeper</h1>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/rules">Rules</Link>
      <Link to="/game/easy">Play Easy</Link>
      <Link to="/game/medium">Play Medium</Link>
      <Link to="/game/hard">Play Hard</Link>
    </nav>
  </header>
);

export default Header;

