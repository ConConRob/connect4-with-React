import React from 'react';
import PlayBoard from './PlayBoard';
import PlayButtons from './PlayButtons'
import initBoardState from './initial-board-state';
import './board.css'
export default class Board extends React.Component {
  state = {
      board: initBoardState,
      possiblePlays: [false,true,true,true,true,true,true],
      currentHeightofRows: [5,5,5,5,5,5,5],

  }

  makeAMove = (columnToPlay, player=1) => {
    this.setState(currentState=>{
      const newBoardState= currentState.board.map((rowArr,rowIndex) => {
        // look for the row that is ar the right column height
        if(rowIndex === currentState.currentHeightofRows[columnToPlay]){
          // look for the right col in the right row
          return rowArr.map((colNum, colIndex) => {
            if(colIndex === columnToPlay){
              return player;
            }
            // not right (return old value)
            return colNum;
          })
        }
        // not right (return old value)
        return rowArr;
      })
      // setting
      return {
        board: newBoardState,
      }
    })
    
  }

  render() {
    return (
      <div className="play-area">
        <PlayBoard boardState={this.state.board} />
        <PlayButtons makeAMove={this.makeAMove} possiblePlays={this.state.possiblePlays} />
      </div>
    )
  }
}