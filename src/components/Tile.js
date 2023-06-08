import React from 'react'

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Tile({row,squares,handleClick}) {
  return (
    <>
      <div className="board-row">
        {row.map((item) => {
          return (
            <Square
              key={item}
              value={squares[item]}
              onSquareClick={() => handleClick(item)}
            />
          );
        })}
      </div>
    </>
  )
}
