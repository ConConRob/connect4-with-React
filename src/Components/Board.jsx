import React from 'react';
import PlayBoard from './PlayBoard';
import PlayButtons from './PlayButtons'
import initBoardState from './initial-board-state';

import decideOnPlay from './checkersBrain'
import './board.css'
export default class Board extends React.Component {
  state = {
      board: initBoardState,
      possiblePlays: [false,true,true,true,true,true,true],
      currentHeightofRows: [5,5,5,5,5,5,5],//5 is the bottom row 0 is the top row

  }
  playATurn = (usersColumnToPlay) =>{
    // play the users play
    this.makeAMove(usersColumnToPlay)
    // check for win

    // get the computers play
    const computersPlay = decideOnPlay();
    console.log(computersPlay)
    // play the users play
    this.makeAMove(computersPlay, 2);
  }


  // updates the board state and updates currentHeight of rows
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
      // set the new height of rows
      const newCurrentHeightofRowsState = currentState.currentHeightofRows.map((currentHeight, colNum) => {
        if(colNum === columnToPlay){
          return currentHeight-1;
        }
        return currentHeight;
      })
      // setting
      return {
        board: newBoardState,
        currentHeightofRows: newCurrentHeightofRowsState
      }
    })
    
  }

  render() {
    return (
      <div className="play-area">
        <PlayBoard boardState={this.state.board} />
        <PlayButtons playATurn={this.playATurn} possiblePlays={this.state.possiblePlays} />
      </div>
    )
  }
}