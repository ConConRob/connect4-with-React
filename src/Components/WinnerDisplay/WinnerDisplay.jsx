import React from 'react';
import './winnerDisplay.css';
export default function WinnerDisplay({winner, resetGame}){
    return (
            winner!==0 && 
            <div className="winner-display"> 
                <h2 className={`winner-header winner${winner}`}>{`Player ${winner} Won!`}</h2>
                <button onClick={resetGame} className="winner-reset-button">Play Again!</button>
            </div>
    )
}