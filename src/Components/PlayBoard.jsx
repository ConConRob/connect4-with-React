import React from 'react';
import BoardPosition from './BoardPosition';
import MakeAMoveColumns from './MakeAMoveColumns';
import styled from 'styled-components';

const StyledPlayBoard = styled.div`
  box-shadow: 2px 2px 1px black;
`

const StyledPlayBoardRow = styled.div`
  display: flex;
  justify-content: space-evenly;
`

export default function PlayBoard({boardState,  possiblePlays, playATurn}){
    return(
        <StyledPlayBoard>
            {
              boardState.map((row, index) => {
                return (
                  <StyledPlayBoardRow key={index} >
                    {
                    row.map((position, index)=> {
                      return <BoardPosition key={index} stateOfPosition={position}/>
                    })   
                    }
                  </StyledPlayBoardRow>
                )
              })
            }
          <MakeAMoveColumns
            possiblePlays={possiblePlays}
            playATurn={playATurn}
          />
        </StyledPlayBoard>
    )
}