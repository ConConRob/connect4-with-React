import React from 'react';
import styled from 'styled-components';
export default function PlayButtons({playATurn, possiblePlays}) {
    function clickAction(Column){
        playATurn(Column);
    }
    return (
        <div className="play-buttons">
        {
            possiblePlays.map((possiblePlay, index) => {
                return (
                    <button onClick={()=>clickAction(index)} key={index} className={`play-button`} disabled={ !possiblePlay } >{`Play Column ${index+1}`}</button>
                )
            })
        }
        </div>
        
    )
}
