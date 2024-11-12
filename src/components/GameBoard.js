import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import Cell from './Cell';

const GameBoard = () => {
  const { board, gameStatus } = useContext(GameContext);

  return (
    <div>
      {gameStatus === 'lost' ? <p>Game over! You lost!</p> : null}
      {gameStatus === 'won' ? <p>Game over! You won!</p> : null}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${board.length}, 1fr)` }}>
        {board.map((row, x) =>
          row.map((cell, y) => <Cell key={`${x}-${y}`} cell={cell} x={x} y={y} />)
        )}
      </div>
    </div>
  );
};

export default GameBoard;

