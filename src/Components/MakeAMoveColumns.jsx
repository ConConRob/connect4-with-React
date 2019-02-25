import React from 'react';
import styled from 'styled-components';

const StyledMakeAMoveColumns = styled.div`
    position: absolute;
    width:100%;
    height: 100%;
    top:0;
    display: flex;
    justify-content: flex;
    z-index:3;

`
const  StyledMakeAMoveColumn = styled.div`
    flex:1;
    &:hover{
        background: ${props=> !props.disabled?'rgba(0,255,0,.3)':'none'}
    }
`

export default function MakeAMoveColumns({possiblePlays, playATurn}){
    function clickAction(Column, disabled){
        if(disabled){
            playATurn(Column);
        }
    }
    return(
        <StyledMakeAMoveColumns>
            {
                possiblePlays.map((possiblePlay,index) =>  (
                    <StyledMakeAMoveColumn 
                        onClick={()=>clickAction(index, possiblePlay)} 
                        key={index} 
                        className={`play-column`} 
                        disabled={ !possiblePlay } 
                    />  
                ))
            }
        </StyledMakeAMoveColumns>
    )
}