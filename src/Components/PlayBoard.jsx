import React from 'react';
import BoardPosition from './BoardPosition';
import styled from 'styled-components';

const StyledPlayBoardRow = styled.div`
    display: flex;
    justify-content: space-evenly;
`

export default function PlayBoard({boardState}){
    return(
        <div>
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
        </div>
    )
}