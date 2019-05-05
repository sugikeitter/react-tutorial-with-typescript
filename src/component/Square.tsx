import React from 'react';

export type SquareType = ('O' | 'X' | '')

interface SquareProps {
  value: SquareType;
  onClick: () => void;
}

function Square(props: SquareProps) {
  return (
    <button
      className="square"
      onClick={props.onClick}>
      {props.value}
    </button>
  )
}

export default Square;
