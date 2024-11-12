import React from 'react';

const Rules = () => (
  <div>
    <h2>Game Rules</h2>
    <p>The goal is to uncover all safe cells without hitting a mine!</p>
    <ul>
      <li>Click on a cell to reveal it.</li>
      <li>A number shows how many mines are adjacent to that cell.</li>
      <li>If you click on a mine, you lose.</li>
    </ul>
  </div>
);

export default Rules;

