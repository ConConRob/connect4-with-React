import React from 'react';
import {TweenMax} from 'gsap';
import styled from 'styled-components';

const StyledCoin = styled.div`
    width: 100px;
    height: 100px;
    background: ${props =>  props.stateOfPosition===1? 'green': 'red' };
    border-radius: 100px;
    margin:10px;
    opacity: 1;
    position: absolute;
`

export default class Coin extends React.Component{

    componentDidMount(){
        TweenMax.fromTo(this.coin, .8, { top: -1000}, { top: 0});
    }

    render(){
        return(
            <StyledCoin
                ref={node => (this.coin = node)}
                 stateOfPosition={this.props.stateOfPosition} 
            />
        )
    }

}