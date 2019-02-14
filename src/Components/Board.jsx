import React from 'react';
import BoardPosition from './BoardPosition';
import initBoardState from './initial-board-state';
import './board.css'
export default class Board extends React.Component {
  state = {
      board: initBoardState,
  }
  render() {
    return (
      <div className="play-area">
      {
        this.state.board.map(row => {
          return (
            <div className="row">
              {
              row.map(position => {
                return <BoardPosition  stateOfPosition={position}/>
              })   
              }
            </div>
          )
        })
      }
      </div>
    )
  }
}