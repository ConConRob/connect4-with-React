import React from 'react';
import styled from 'styled-components';
import Coin from './Coin';
const StyledBoardPosition = styled.div`
        position:relative;
        width:120px; height:120px;
        @media (max-width:840px) {
            width:60px; height:60px;
        }
        margin:0;
        overflow: hidden;
    &:after{
        content:'';
        position:absolute;
        left:10px; top:10px;
        border-radius:100%;
        width:100px; height:100px;
        @media (max-width:840px) {
            left: 5px;
            top: 5px;
            width:50px; height:50px;
        }
        box-shadow: 0px 0px 0px 500px yellow;
        z-index: 2;
    }
    
`
export default function BoardPosition({stateOfPosition}) { 
    // stateOfPosition 0=empty 1=human 2=computer
    return (
        <div className='relative'><StyledBoardPosition>
            </StyledBoardPosition>
            {
                (stateOfPosition !== 0) &&  <Coin stateOfPosition={stateOfPosition}/>
             
            }
        
        </div>
        

    )
}