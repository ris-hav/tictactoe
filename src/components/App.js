import React, { useState, useEffect } from "react";
import Tile from "./Tile";

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const row = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const [count, setCount] = useState(0);

  function handleClick(i) {
    if (calculateWinner(squares) != null || squares[i] !== null) {
      return;
    }
    setCount(count + 1);
    console.log(count);

    const nextSquares = squares.slice(); //filling up squares with X & O
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }
  function handleNewClick() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setCount(0);
  }

  const winner = calculateWinner(squares);
  let status;

  if (winner !== null) {
    status = "Winner: " + winner;
  } else {
    if (count === 9) {
      status = "Draw";
    } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }
  }

  return (
    <div>
      <h1>Tic-Tac-Toe</h1>
      <div
        className={`status ${
          (status === "Draw" || status.includes("Winner")) && "animated"
        }`}
        style={{
          color:
            status === "Draw"
              ? "orange"
              : status.includes("Winner") && "#79c464",
        }}
      >
        {status}
      </div>

      {row.map((item, index) => {
        return <Tile row={item} squares={squares} handleClick={handleClick} />;
      })}

      {(winner !== null || status === "Draw") && (
        <button className="new-game" onClick={handleNewClick}>
          Start new game
        </button>
      )}
      <button
        className="reset"
        onClick={handleNewClick}
        style={{
          display: (status === "Draw" || status.includes("Winner")) && "none",
        }}
      >
        Reset
      </button>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
