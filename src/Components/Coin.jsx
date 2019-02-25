import React from 'react';
import styled from 'styled-components';

const StyledCoin = styled.div`
    width: 100px;
    height: 100px;
    background: ${props =>  props.stateOfPosition===1? 'green': 'red' };
    border-radius: 100px;
    margin:10px;
    opacity: 1;
    position: absolute;
    top: -50px;
    left: 0px;
`

export default function Coin({stateOfPosition}){

    return(
        <StyledCoin stateOfPosition={stateOfPosition} />
    )
}