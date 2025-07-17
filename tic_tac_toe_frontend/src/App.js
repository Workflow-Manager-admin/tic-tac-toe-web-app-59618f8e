import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import About from "./About";
import './App.css';

// Theme colors—these should match what's in App.css and the requirement
const THEME_COLORS = {
  primary: "#1976D2",
  secondary: "#424242",
  accent: "#FFC107"
};

/**
 * Returns an empty 3x3 matrix
 */
function emptyBoard() {
  return [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
}

// List of winning positions
const WINNING_LINES = [
  // Rows
  [[0, 0],[0,1],[0,2]],
  [[1, 0],[1,1],[1,2]],
  [[2, 0],[2,1],[2,2]],
  // Cols
  [[0,0],[1,0],[2,0]],
  [[0,1],[1,1],[2,1]],
  [[0,2],[1,2],[2,2]],
  // Diags
  [[0,0],[1,1],[2,2]],
  [[0,2],[1,1],[2,0]]
];

/**
 * GamePage defines the original game UI as a child component, so <App /> shell holds navigation/routing.
 */
function GamePage() {
  const [theme] = useState('light'); // Only light theme as requested
  const [board, setBoard] = useState(emptyBoard());
  const [nextPlayer, setNextPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [score, setScore] = useState({ X: 0, O: 0 });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Check for winner every move
  useEffect(() => {
    const check = checkWinner(board);
    if (check) {
      setWinner(check);
      setScore(s => ({ ...s, [check]: s[check] + 1 }));
    } else if (board.every(row => row.every(cell => cell))) {
      setIsDraw(true);
    }
  }, [board]);

  // PUBLIC_INTERFACE
  function handleCellClick(row, col) {
    if (board[row][col] || winner || isDraw) return; // Already filled or game over

    const newBoard = board.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? nextPlayer : c))
    );
    setBoard(newBoard);
    setNextPlayer(p => (p === "X" ? "O" : "X"));
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    setBoard(emptyBoard());
    setWinner(null);
    setIsDraw(false);
    setNextPlayer(winner === "O" ? "X" : "O"); // Loser (or O if draw) starts
  }

  // PUBLIC_INTERFACE
  function handleResetScore() {
    setScore({ X: 0, O: 0 });
    handleReset();
  }

  // PUBLIC_INTERFACE
  function checkWinner(b) {
    for (const line of WINNING_LINES) {
      const [a, b1, c] = line;
      const vA = b[a[0]][a[1]];
      if (vA && vA === b[b1[0]][b1[1]] && vA === b[c[0]][c[1]]) {
        return vA;
      }
    }
    return null;
  }

  // Styling for main game container
  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--bg-primary, #fff)",
    flexDirection: "column",
    padding: "36px 10px",
    transition: "background 0.3s"
  };

  // Minimal header style
  const headerStyle = {
    color: THEME_COLORS.primary,
    fontWeight: 900,
    letterSpacing: 2,
    fontSize: "2.5rem",
    margin: "0 0 1rem 0"
  };

  // Game board style
  const boardStyle = {
    display: "grid",
    gridTemplateRows: "repeat(3, 60px)",
    gridTemplateColumns: "repeat(3, 60px)",
    gap: "8px",
    margin: "0 auto",
    background: THEME_COLORS.secondary,
    borderRadius: 15,
    boxShadow: "0 2px 12px 0 rgba(25, 118, 210, 0.03)"
  };

  // Cell style
  const cellStyle = {
    background: "#fff",
    color: THEME_COLORS.primary,
    border: `2px solid ${THEME_COLORS.primary}20`,
    fontWeight: 700,
    fontSize: "2.4rem",
    borderRadius: 10,
    outline: "none",
    cursor: "pointer",
    transition: "background 0.2s"
  };

  // Minimal scoreboard style
  const scoreStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    color: THEME_COLORS.secondary,
    fontWeight: 600,
    marginTop: 18,
    marginBottom: 8
  };

  // Control button style
  const btnStyle = {
    margin: "8px 4px",
    padding: "10px 20px",
    backgroundColor: THEME_COLORS.primary,
    color: "#fff",
    border: "none",
    borderRadius: 7,
    fontWeight: 600,
    fontSize: "1rem",
    letterSpacing: 1,
    cursor: "pointer",
    boxShadow: "0 1px 5px 0 #1976D222",
    transition: "background 0.2s"
  };

  return (
    <div style={containerStyle} className="tic-tac-toe-app">
      <div style={headerStyle}>Tic Tac Toe</div>
      <div style={{
        fontSize: "1.2rem",
        marginBottom: 16,
        color: THEME_COLORS.secondary,
        fontWeight: 500
      }}>
        {winner
          ? <span style={{color: THEME_COLORS.accent}}>Winner: {winner}</span>
          : isDraw
            ? <span style={{ color: THEME_COLORS.accent }}>Draw Game!</span>
            : <>Turn: <span style={{
                color: THEME_COLORS.primary,
                fontWeight: 700
              }}>{nextPlayer}</span></>
        }
      </div>

      {/* Game Board */}
      <div style={boardStyle} aria-label="Tic Tac Toe Game Board">
        {board.map((row, rIdx) =>
          row.map((val, cIdx) => (
            <button
              key={rIdx * 3 + cIdx}
              style={cellStyle}
              onClick={() => handleCellClick(rIdx, cIdx)}
              aria-label={`Cell ${rIdx},${cIdx} (${val || "empty"})`}
              disabled={val || winner || isDraw}
            >
              {val}
            </button>
          ))
        )}
      </div>

      {/* Scoreboard */}
      <div style={scoreStyle}>
        <span style={{ color: THEME_COLORS.primary }}>
          X: {score.X}
        </span>
        <span style={{ color: THEME_COLORS.secondary }}>
          O: {score.O}
        </span>
      </div>

      {/* Controls */}
      <div style={{ marginTop: 10 }}>
        <button style={btnStyle} onClick={handleReset}>
          New Game
        </button>
        <button style={{ ...btnStyle, backgroundColor: THEME_COLORS.accent, color: "#000" }} onClick={handleResetScore}>
          Reset Score
        </button>
      </div>
    </div>
  );
}

/**
 * App shell with top navbar and main router logic.
 */
// PUBLIC_INTERFACE
function App() {
  return (
    <BrowserRouter>
      <nav
        className="navbar"
        style={{
          width: "100%",
          background: "var(--bg-secondary, #F4F6FB)",
          padding: "12px 0",
          borderBottom: "1px solid var(--border-color, #E0E6EF)",
          display: "flex",
          gap: "24px",
          alignItems: "center",
          justifyContent: "center",
          position: "sticky",
          top: 0,
          zIndex: 99,
        }}
      >
        <Link
          to="/"
          style={{
            color: "var(--primary, #1976D2)",
            textDecoration: "none",
            fontWeight: 800,
            fontSize: "1.1rem",
            letterSpacing: 1,
            marginRight: 12
          }}
        >
          Tic Tac Toe
        </Link>
        <Link
          to="/about"
          style={{
            color: "var(--text-secondary, #424242)",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: "1rem",
            letterSpacing: 1
          }}
        >
          About
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<GamePage />} />
        <Route path="/about" element={<About />} />
        {/* For anything else, redirect to / */}
        <Route path="*" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
