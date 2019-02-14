import React from 'react';
import PlayBoard from './PlayBoard';
import initBoardState from './initial-board-state';
import './board.css'
export default class Board extends React.Component {
  state = {
      board: initBoardState,
  }
  render() {
    return (
      <div className="play-area">
        <PlayBoard boardState={this.state.board} />
      </div>
    )
  }
}