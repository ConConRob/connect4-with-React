import React from 'react';
import styled from 'styled-components';

const StyledWinnierDisplay = styled.div`
    position: absolute;
    background: rgba(0, 0, 0, .5);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 10;
    .winner-header {
        font-size: 50px;
        font-weight: 500;
        margin-bottom: 30px;
        color:${p=>p.winner===1?"green":"red"};
        text-shadow: 2px 2px black;
    }
    .winner-reset-button{
        width: 200px;
        height: 50px;
        font-size: 20px;
        font-weight: bold;
        background:${p=>p.winner===1?"green":"red"};
        border:none;
        &:hover{
            cursor:pointer;
        }
    }
` 

export default function WinnerDisplay({winner, resetGame}){
    return (
            winner!==0 && 
            <StyledWinnierDisplay winner={winner} > 
                <h2 className={`winner-header`}>{`Player ${winner} Won!`}</h2>
                <button onClick={resetGame} className="winner-reset-button">Play Again!</button>
            </StyledWinnierDisplay>
    )
}