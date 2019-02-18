import React from 'react';
import BoardPosition from './BoardPosition';

export default function PlayBoard({boardState}){
    return(
        <div className="play-board">
            {
              boardState.map((row, index) => {
                return (
                  <div key={index} className="play-board-row">
                    {
                    row.map((position, index)=> {
                      return <BoardPosition key={index} stateOfPosition={position}/>
                    })   
                    }
                  </div>
                )
              })
            }
        </div>
    )
}