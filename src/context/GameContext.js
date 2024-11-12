import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [difficulty, setDifficulty] = useState('easy');
  const [board, setBoard] = useState([]);
  const [gameStatus, setGameStatus] = useState('in-progress'); // 'won', 'lost'
  const [mineCount, setMineCount] = useState(10);

  return (
    <GameContext.Provider
      value={{
        difficulty,
        setDifficulty,
        board,
        setBoard,
        gameStatus,
        setGameStatus,
        mineCount,
        setMineCount,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

