import React, {Component} from 'react';

import Board from './Board'
import {SquareType} from "./Square";

interface HistoryData {
  squares: SquareType[],
}

interface GameState {
  history: HistoryData[],
  stepNumber: number,
  xIsNext: boolean,
}

class Game extends Component<any, GameState> {
  state: GameState = {
    history: [
      {
        squares: Array(9).fill('')
      }
    ],
    stepNumber: 0,
    xIsNext: true,
  };

  render() {
    const history: HistoryData[] = this.state.history;
    const current: HistoryData = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={()=> this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });

    let status: string;
    if (winner !== '') {
      status = "Winner: " + winner;
    } else {
      status = "Next Player: " + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares}
                 onClick={i => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  private handleClick(i: number): void {
    const history: HistoryData[] = this.state.history.slice(0, this.state.stepNumber + 1);
    const current: HistoryData = history[history.length - 1];
    const squares: SquareType[] = current.squares.slice();

    // すでに選択されたマスが埋まっているか、勝者が決まっていれば何もしない
    if (squares[i] !== '' || this.calculateWinner(squares) !== '') {
      return;
    }
    squares[i] = this.state.xIsNext ?
      'X' :
      'O';
    this.setState({
      history: history.concat([
        {
          squares: squares,
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  private jumpTo(step: number): void {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  };

  private calculateWinner(squares: SquareType[]): string {
    const lines: number[][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i: number = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] !== ''
        && squares[a] === squares[b]
        && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return ''
  }
}

export default Game;