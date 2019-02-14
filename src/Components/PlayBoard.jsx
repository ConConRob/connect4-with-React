import React from 'react';
import BoardPosition from './BoardPosition';

export default function PlayBoard({boardState}){
    return(
        <div className="play-board">
            {
              boardState.map(row => {
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