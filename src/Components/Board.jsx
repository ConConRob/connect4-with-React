import React from 'react';
import PlayBoard from './PlayBoard';
import PlayButtons from './PlayButtons'
import initBoardState from './initial-board-state';
import './board.css'
export default class Board extends React.Component {
  state = {
      board: initBoardState,
      possiblePlays: [false,true,true,true,true,true,true],
  }

  makeAMove = () => console.log('made move');

  render() {
    return (
      <div className="play-area">
        <PlayBoard boardState={this.state.board} />
        <PlayButtons makeAMove={this.MakeAMove} possiblePlays={this.state.possiblePlays} />
      </div>
    )
  }
}