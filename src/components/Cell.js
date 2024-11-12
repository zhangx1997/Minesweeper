import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';

const Cell = ({ cell, x, y }) => {
  const { setGameStatus, board, setBoard } = useContext(GameContext);

  const revealCell = () => {
    if (cell.isMine) {
      setGameStatus('lost');
    } else {
      const updatedBoard = [...board];
      updatedBoard[x][y] = { ...cell, isRevealed: true };
      setBoard(updatedBoard);

      if (checkWin(updatedBoard)) {
        setGameStatus('won');
      }
    }
  };

  const checkWin = (board) => {
    return board.every(row => row.every(cell => cell.isMine || cell.isRevealed));
  };

  return (
    <div
      onClick={revealCell}
      style={{
        backgroundColor: cell.isRevealed ? (cell.isMine ? 'red' : 'lightgray') : 'gray',
        border: '1px solid black',
        width: '30px',
        height: '30px',
      }}
    >
      {cell.isRevealed && !cell.isMine && cell.mineCount > 0 ? cell.mineCount : null}
      {cell.isRevealed && cell.isMine ? '💣' : null}
    </div>
  );
};

export default Cell;

