import React from 'react';

export default function BoardPosition({stateOfPosition}) { 
    // stateOfPosition 0=empty 1=human 2=computer
    return (
        <div className={`position position-state-${stateOfPosition}`}></div>
    )
}