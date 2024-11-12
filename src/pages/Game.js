import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

function createBoard(size, mines) {
  const newBoard = Array.from({ length: size }, () => 
    Array(size).fill({ mine: false, count: 0 })
  );
  let minesPlaced = 0;

  while (minesPlaced < mines) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);

    if (!newBoard[row][col].mine) {
      newBoard[row][col] = { mine: true, count: 0 };
      minesPlaced++;
      updateCounts(newBoard, row, col, size);
    }
  }
  return newBoard;
}

function updateCounts(board, row, col, size) {
  const directions = [
    [0, 1], [1, 0], [0, -1], [-1, 0],
    [1, 1], [-1, -1], [1, -1], [-1, 1]
  ];
  directions.forEach(([dx, dy]) => {
    const newRow = row + dx;
    const newCol = col + dy;
    if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size && !board[newRow][newCol].mine) {
      board[newRow][newCol] = { ...board[newRow][newCol], count: board[newRow][newCol].count + 1 };
    }
  });
}

function Game() {
  const { difficulty } = useParams();
  const [board, setBoard] = useState([]);
  const [revealed, setRevealed] = useState([]);
  const [hoveredCell, setHoveredCell] = useState({ row: -1, col: -1 });
  const [size, setSize] = useState(8);
  const [mineCount, setMineCount] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [gameMessage, setGameMessage] = useState('');

  const setupBoard = useCallback(() => {
    let newSize, mineCount;
    switch (difficulty) {
      case 'easy':
        newSize = 8;
        mineCount = 10;
        break;
      case 'medium':
        newSize = 16;
        mineCount = 40;
        break;
      case 'hard':
        newSize = 30;
        mineCount = 99;
        break;
      default:
        newSize = 8;
        mineCount = 10;
    }

    setSize(newSize);
    setMineCount(mineCount);
    const newBoard = createBoard(newSize, mineCount);
    setBoard(newBoard);
    setRevealed(Array(newSize).fill(null).map(() => Array(newSize).fill(false)));
    setGameOver(false);
    setGameMessage('');
  }, [difficulty]);

  useEffect(() => {
    setupBoard();
  }, [setupBoard]);

  const revealCell = (row, col) => {
    if (gameOver || revealed[row][col]) return;

    const newRevealed = revealed.map(row => [...row]);
    if (board[row][col].mine) {
      newRevealed.forEach((row, rowIndex) => 
        row.forEach((_, colIndex) => {
          if (board[rowIndex][colIndex].mine) {
            newRevealed[rowIndex][colIndex] = true;
          }
        })
      );
      setGameOver(true);
      setGameMessage("Game over! You hit a mine!");
    } else {
      const queue = [[row, col]];
      while (queue.length > 0) {
        const [r, c] = queue.shift();
        if (r < 0 || r >= size || c < 0 || c >= size || newRevealed[r][c]) continue;

        newRevealed[r][c] = true;

        if (board[r][c].count === 0) {
          const directions = [
            [0, 1], [1, 0], [0, -1], [-1, 0],
            [1, 1], [-1, -1], [1, -1], [-1, 1]
          ];
          directions.forEach(([dr, dc]) => queue.push([r + dr, c + dc]));
        }
      }

      setRevealed(newRevealed);
      if (newRevealed.flat().filter(Boolean).length === size * size - mineCount) {
        setGameOver(true);
        setGameMessage("Congratulations! You won!");
      }
    }

    setRevealed(newRevealed);
  };

  const handleCellClick = (row, col) => {
    if (!gameOver) revealCell(row, col);
  };

  const handleReset = () => {
    setupBoard();
  };

  const handleMouseEnter = (row, col) => setHoveredCell({ row, col });
  const handleMouseLeave = () => setHoveredCell({ row: -1, col: -1 });

  return (
    <div>
      <h2>Minesweeper - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level</h2>
      {gameMessage && <div className="game-message">{gameMessage}</div>}
      <button onClick={handleReset}>Reset</button>
      <div 
        className="board" 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(${size}, 30px)`,
          gap: '2px',
          marginTop: '10px',
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isRevealed = revealed[rowIndex][colIndex];
            const isMine = cell.mine;
            const isHovered = rowIndex === hoveredCell.row && colIndex === hoveredCell.col;
            const cellContent = isMine && isRevealed ? '💣' : (cell.count > 0 ? cell.count : '');

            const cellStyles = {
              backgroundColor: isRevealed
                ? (isMine ? '#ff4d4d' : '#99ff99') // Red for mine, green for safe cells
                : (isHovered ? '#e6e6e6' : '#d3d3d3'), // Hover color for unrevealed cells
              color: isMine ? '#fff' : '#333',
              cursor: isRevealed ? 'default' : 'pointer',
              width: '30px',
              height: '30px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid #aaa',
              fontSize: '16px',
              fontWeight: isMine ? 'bold' : 'normal',
            };

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                style={cellStyles}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                onMouseLeave={handleMouseLeave}
              >
                {isRevealed && cellContent}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Game;
