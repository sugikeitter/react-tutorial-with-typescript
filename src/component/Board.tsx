import React, {Component} from 'react';
import Square, {SquareType} from "./Square";

interface BoardProps {
  squares: SquareType[];
  onClick: (n: number) => void;
}

class Board extends Component<BoardProps> {

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquares(0, 2)}
        </div>
        <div className="board-row">
          {this.renderSquares(3, 5)}
        </div>
        <div className="board-row">
          {this.renderSquares(6, 8)}
        </div>
      </div>
    )
  }

  private renderSquares(start: number, end: number) {
    let res = [];
    for (let i: number = start; i <= end; i++) {
      res.push(this.renderSquare(i));
    }
    return res;
  }

  private renderSquare(n: number) {
    return (
      <Square
        value={this.props.squares[n]}
        onClick={() => this.props.onClick(n)}/>
    );
  }
}

export default Board;
