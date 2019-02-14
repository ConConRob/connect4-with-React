import React from 'react';

export default function PlayButtons({makeAMove, possiblePlays}) {
    function clickAction(Column){
        makeAMove(Column);
    }
    return (
        <div className="play-buttons">
        {
            possiblePlays.map((possiblePlay, index) => {
                return (
                    <button onClick={()=>clickAction(index)} key={index} className={`play-button ${!possiblePlay&& 'disabled'}`}>{`Play Column ${index+1}`}</button>
                )
            })
        }
        </div>
        
    )
}
