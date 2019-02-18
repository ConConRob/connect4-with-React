import React from 'react';
import PlayBoard from './PlayBoard';
import PlayButtons from './PlayButtons'
import initBoardState from './initial-board-state';

import decideOnPlay from './checkersBrain' // THE AI for this game
import './board.css'
export default class Board extends React.Component {
  state = {
      board: initBoardState,
      possiblePlays: [true,true,true,true,true,true,true],
      currentHeightofRows: [5,5,5,5,5,5,5],//5 is the bottom row 0 is the top row

  }
  // play a turn is the control of the game
  playATurn = (usersColumnToPlay) =>{
    // get the users row played
    const usersRowToPlay = this.state.currentHeightofRows[usersColumnToPlay];
    // play the users play
    this.makeAMove(usersColumnToPlay)
    // check for win
    this.isWinner(usersColumnToPlay, usersRowToPlay, 1);
    // get the computers play
    const computersPlay = decideOnPlay();
    // play the computers play
    //this.makeAMove(computersPlay, 2);
    //update the plays the user can play
    this.updatePossiblePlays();
  }

  // check if there is a winner function
  isWinner = (cP, rP, pP) => { // (colPlayed, rowPlayed, playerPlayed) 
    let fdc=0;// firstDirectCount
    let sdc=0;// secondDirectionCount
    const board = this.state.board;
      //check how matches many left========================
      if(board[rP][cP-1]===pP){
        fdc=1;
        //check next space left
        if(board[rP][cP-2]===pP){
          fdc=2;
        //check next space left
          if(board[rP][cP-3]===pP){
            fdc=3;
          //check next space left
          }
        }
      }
      //check how matches many right
      if(board[rP][cP+1]===pP){
        sdc=1;
        //check next space right
        if(board[rP][cP+2]===pP){
          sdc=2;
        //check next space right
          if(board[rP][cP+3]===pP){
            sdc=3;
          //check next space right
          }
        }
      }
      // check total
      if(fdc+sdc>=3){
        console.log("win");
      }
    // check vertical win ===========================
    //only check down because can not have any on top of current play
    //check how matches many down
    // only check if 4th row up or above
      if(rP<=2){
        if(board[rP+1][cP]===pP){
          //check next space down
          if(board[rP+2][cP]===pP){
          //check next space down
            if(board[rP+3][cP]===pP){
              console.log('win')
            }
          }
        }
      }

      
    //   //check how matches many down
    // //check positive slope win=============================
  
      //check how matches many up right
      //check how matches many down left
    //check negative slop win ===============================
      //check how matches many up left
      //check how matches many down right
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

  // update possible plays so that buttons become disabled from user
  updatePossiblePlays = () => {
    this.setState(currentState => {
      const newPossiblePlays = currentState.possiblePlays.map((possiblePlay, colIndex) => {
        if(currentState.currentHeightofRows[colIndex]<0){
          return false;
        }
        return true;
      });
      return {
        possiblePlays: newPossiblePlays
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