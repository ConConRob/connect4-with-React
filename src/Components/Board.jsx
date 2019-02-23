import React from 'react';
import PlayBoard from './PlayBoard';
import PlayButtons from './PlayButtons'
import initBoardState from './initial-board-state';
import WinnerDisplay from './WinnerDisplay/WinnerDisplay'
import decideOnPlay from './connect4Brain' // THE AI for this game
import './board.css'

const initState= {
  board: initBoardState,
  possiblePlays: [true,true,true,true,true,true,true],
  currentHeightofRows: [5,5,5,5,5,5,5],//5 is the bottom row 0 is the top row
  winner: 0 // if winner changes to 1 or 2 depending on player
}
export default class Board extends React.Component {
  state = initState;
  // play a turn is the control of the game
  playATurn = (usersColumnToPlay) =>{
    // get the users row played
    // play the users play and checks if it was a winning move then make the computers play
    this.makeAMove(usersColumnToPlay, 1, this.computersTurn )
      
    //update the plays the user can play
    this.updatePossiblePlays();
  }

  computersTurn = (board, rowHeight) =>{
    const computersPlay = decideOnPlay(board);
    this.makeAMove(computersPlay, 2);
  }

  // check if there is a winner function if won returns player else returns 0
  isWinner = (cP, rP, pP) => { // (colPlayed ( change goes left or right), rowPlayed(change goes up or down), playerPlayed) 
    let fdc=0;// firstDirectCount
    
    let sdc=0;// secondDirectionCount
    const board = this.state.board;
      //check how many matches  left========================
      if(board[rP][cP-1]===pP){
        fdc=1;
        //check next space left
        if(board[rP][cP-2]===pP){
          fdc=2;
        //check next space left
          if(board[rP][cP-3]===pP){
            fdc=3;
          
          }
        }
      }
      //check how many matches  right
      if(board[rP][cP+1]===pP){
        sdc=1;
        //check next space right
        if(board[rP][cP+2]===pP){
          sdc=2;
        //check next space right
          if(board[rP][cP+3]===pP){
            sdc=3;
          
          }
        }
      }
      // check total
      if(fdc+sdc>=3){
        return pP;
      }
    // check vertical win ===========================
    //only check down because can not have any on top of current play
     //check how many matches  down
    // only check if 4th row up or above
      if(rP<=2){
        if(board[rP+1][cP]===pP){
          //check next space down
          if(board[rP+2][cP]===pP){
          //check next space down
            if(board[rP+3][cP]===pP){
              return pP
            }
          }
        }
      }
    // reset checks 
    fdc =0;
    sdc= 0;
    //   //check how many matches  down
    // //check positive slope win=============================
    //check how many matches  up right
      //check if can go up 1
      if(board[rP-1]){
        //check 1 right up
        if(board[rP-1][cP+1] ===pP){
          fdc=1;
          if(board[rP-2]){
            // check 2 right up
            if(board[rP-2][cP+2] === pP){
              fdc=2;
              //chack if can go up  3 
              if(board[rP-3]){
                // check 3 right up
                if(board[rP-3][cP+3]===pP){
                  fdc=3;
                }
              }
            }
          }
        }
      }
      //check how many matches  down left
      //check if can go down 1
      if(board[rP+1]){
        //check 1 left down
        if(board[rP+1][cP-1] ===pP){
          sdc=1;
          // check if can go down 2
          if(board[rP+2]){
            // check 2 left down
            if(board[rP+2][cP-2]===pP){
              sdc=2;
              //chack if can go up  3 
              if(board[rP+3]){
                // check 3 left down
                if(board[rP+3][cP-3]===pP){
                  sdc=3;
                }
              }
            }
          }
        }
      }
      if(fdc+sdc>=3){
        return pP;
      }
      // reset 
      fdc=0;
      sdc=0;
      //check negative slop win ===============================
      //check how many matches  up left
      // check 1 up
      if(board[rP-1]){
        //check 1 left up
        if(board[rP-1][cP-1] ===pP){
          fdc=1;
          if(board[rP-2]){
            // check 2 left up
            if(board[rP-2][cP-2] === pP){
              fdc=2;
              //chack if can go up  3 
              if(board[rP-3]){
                // check 3 left up
                if(board[rP-3][cP-3]===pP){
                  fdc=3;
                }
              }
            }
          }
        }
      }
      //check how many matches  down right
      if(board[rP+1]){
        //check 1 right down
        if(board[rP+1][cP+1] ===pP){
          sdc=1;
          // check if can go down 2
          if(board[rP+2]){
            // check 2 right down
            if(board[rP+2][cP+2]===pP){
              sdc=2;
              //chack if can go up  3 
              if(board[rP+3]){
                // check 3 right down
                if(board[rP+3][cP+3]===pP){
                  sdc=3;
                }
              }
            }
          }
        }
      }
      if(fdc+sdc>=3){
        return pP;
      }
      return 0;
  }
  // updates the board state and updates currentHeight of rows
  makeAMove = (columnToPlay, player=1, callBack=()=>{}) => {
    // get users row to play 
    const rowToPlay = this.state.currentHeightofRows[columnToPlay];
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
      // check if winner 
      const winner = this.isWinner(columnToPlay, rowToPlay, player);
      // setting
      return {
        board: newBoardState,
        currentHeightofRows: newCurrentHeightofRowsState,
        winner: winner
      }
    }, 
      () =>{
        if(this.state.winner===0){
          callBack(this.state.board, this.state.possiblePlays)
        }
      }
    );

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
  
  // reset the game
  resetGame = () => {
    this.setState(initState);
  }
  render() {
    return (
      <div className="play-area">
        <PlayBoard boardState={this.state.board} />
        <PlayButtons playATurn={this.playATurn} possiblePlays={this.state.possiblePlays} />
        <WinnerDisplay winner={ this.state.winner } resetGame={this.resetGame}/>
      </div>
    )
  }
}