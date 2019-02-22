// takes in the state of the board and returns a col to play

// const  initBoardState = [
//     [0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0],
// ]
const playerNumber=2;
const opponentPlayerNumber=1;

export default function decideOnPlay(boardState, possiblePlays) {
    //TOOLS
    function isRight(colPos, rowPos,player){
        if(boardState[colPos][rowPos+1]===player){
            return true;
        }
        return false;
    }
    function isLeft(colPos, rowPos, player){
        if(boardState[colPos][rowPos-1]===player){
            return true;
        }
        return false;
    }
    function isDown(colPos, rowPos, player){
        if(boardState[colPos+1] && boardState[colPos+1][rowPos]===player){
            return true;
        }
        return false;
    }
    function isUp(colPos, rowPos, player){
        if(boardState[colPos-1] && boardState[colPos-1][rowPos]===player){
            return true;
        }
        return false;
    }
    function isUpRight(colPos, rowPos, player){
        if(boardState[colPos-1] && boardState[colPos-1][rowPos+1]===player){
            return true;
        }
        return false;
    }
    function isUpLeft(colPos, rowPos, player){
        if(boardState[colPos-1] && boardState[colPos-1][rowPos-1]===player){
            return true;
        }
        return false;
    }
    function isDownRight(colPos, rowPos, player){
        if(boardState[colPos+1] && boardState[colPos+1][rowPos+1]===player){
            return true;
        }
        return false;
    }
    function isDownLeft(colPos, rowPos, player){
        if(boardState[colPos+1] && boardState[colPos+1][rowPos-1]===player){
            return true;
        }
        return false;
    }
    // for every  spot calculate a score depending on  how many in a row
    // if can't play spot give a score of -1 
    const valueOfPlaysBoard = boardState.map((row, yIndex) => 
        row.map((spot, xIndex) => {        
            //check if spot is filled
            if (spot!==0){
                return -99999
            }
            //check if spot doesn't have something under it 
            if (isDown(yIndex, xIndex,0)){
                return -99999
            }
            // DONE filtering out unavailable plays
            // get value base on computers players

            const valueBasedOnMe = getValueOfSpot(xIndex, yIndex, playerNumber, 1.5);
            const valueBaseOnOtherPlayer =getValueOfSpot(xIndex, yIndex, opponentPlayerNumber, 1);
            const valueBaseOnUnplayedSpace = getValueOfSpot(xIndex, yIndex, 0 , 0.5);
            return   valueBasedOnMe + valueBaseOnOtherPlayer;
        }) 
    )

    function getValueOfSpot(xIndex, yIndex, checkFor, multiplier){
        let leftMatch = 0; 
        if(isLeft(yIndex,xIndex,checkFor)){
            leftMatch=1;
            if(isLeft(yIndex,xIndex-1,checkFor)){
                leftMatch=2;
                if(isLeft(yIndex,xIndex-2,checkFor)){
                    return 999;
                }
            }
        }
        let rightMatch =0;
        if(isRight(yIndex,xIndex,checkFor)){
            rightMatch=1;
            if(isRight(yIndex,xIndex+1,checkFor)){
                rightMatch=2;
                if(isRight(yIndex,xIndex+2,checkFor)){
                    return 999;
                }
            }
        } 
        const horizontal = rightMatch+leftMatch;
        if( horizontal >=3){
            return 999;
        }
        let vertical=0;
        if(isDown(yIndex,xIndex,checkFor)){
            vertical=1;
            if(isDown(yIndex+1,xIndex,checkFor)){
                vertical=2;
                if(isDown(yIndex+2,xIndex,checkFor)){
                    return 999;
                }
            }
        }
        // positive slope match 
        let upRightMatch = 0;

        if(isUpRight(yIndex,xIndex,checkFor)){
            upRightMatch=1;
            if(isUpRight(yIndex-1,xIndex+1,checkFor)){
                upRightMatch=2;
                if(isUpRight(yIndex-2,xIndex+2,checkFor)){
                    return 999;
                }
            }
        }
        let downLeftMatch = 0;            
        if(isDownLeft(yIndex,xIndex,checkFor)){
            downLeftMatch=1;
            if(isDownLeft(yIndex+1,xIndex-1,checkFor)){
                downLeftMatch=2;
                if(isDownLeft(yIndex+2,xIndex-2,checkFor)){
                    return 999;
                }
            }
        }
        const positiveSlope= upRightMatch+downLeftMatch;
        if( positiveSlope >=3){
            return 999;
        }
        //negative slope
        let upLeftMatch = 0;
        if(isUpLeft(yIndex,xIndex,checkFor)){
            upLeftMatch=1;
            if(isUpLeft(yIndex-1,xIndex-1,checkFor)){
                upLeftMatch=2;
                if(isUpLeft(yIndex-2,xIndex-2,checkFor)){
                    return 999;
                }
            }
        }
        let downRightMatch = 0;            
        if(isDownRight(yIndex,xIndex,checkFor)){
            downRightMatch=1;
            if(isDownRight(yIndex+1,xIndex+1,checkFor)){
                downRightMatch=2;
                if(isDownRight(yIndex+2,xIndex+2,checkFor)){
                    return 999;
                }
            }
        }
        const negativeSlope = upLeftMatch+downRightMatch
        if(negativeSlope >= 3){
            return 999;
        }
        // now try to calculate the value of it bases on how many in row in each direction
        //
        const playValue= vertical*multiplier + horizontal*multiplier + positiveSlope*multiplier + negativeSlope*multiplier;
        return playValue;
    }
    
    
    
    
    console.table(valueOfPlaysBoard)
    // get the index of the best play 
    let max= 0;
    let maxXIndex;
    valueOfPlaysBoard.forEach((row, yIndex) => 
        row.forEach((spot, xIndex) => {
              //check if spot is playable
              if (spot === -99999){
                return
            }
            // check if highest score to play
            if(spot>=max){
                max=spot;
                maxXIndex=xIndex;
            }
        })
        )      
    console.log(maxXIndex)

    // check if you can get have a 4 in a line win
    // possiblePlays.forEach((canPlay, rowIndex)=>{
    //     console.log(isDownLeft(4,rowIndex, opponentPlayerNumber), rowIndex)
    // })
    // check  if you need to stop other player's 4 in a line win
    // check if you need to stop other player's 2 turn win 
    // check if you can play for a 2 turn win 
    // if first turn play middle 
    // make set cases for early game and mix in random to make it so it doesn't follow a pattern

    // make a random play
    return maxXIndex;
}


// for the future 
// make a function that can score each play
// make a function that uses the play scorer to check future plays
