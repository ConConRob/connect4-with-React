import React from 'react';
import styled from 'styled-components';

const StyledBoardPosition = styled.div`
        position:relative;
        width:120px; height:120px;
        margin:0;
        overflow:hidden;
    &:after{
        content:'';
        position:absolute;
        left:10px; top:10px;
        border-radius:100%;
        width:100px; height:100px;
        box-shadow: 0px 0px 0px 2000px yellow;
    }
    
`
export default function BoardPosition({stateOfPosition}) { 
    // stateOfPosition 0=empty 1=human 2=computer
    return (
        <StyledBoardPosition>
            {
                (stateOfPosition !== 0) &&  <div className={`position position-state-${stateOfPosition}`}></div>
             
            }
        </StyledBoardPosition>
    )
}