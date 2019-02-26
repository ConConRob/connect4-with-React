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


const basedOnMeMultiplier = 3;
const basedOnMeOneMatchScore = 1;
const basedOnMeTwoMatchScore = 2;
const basedOnMeThreeMatchScore = 9999;

const basedOnOppenentMultiplier = 2;
const basedOnOppenentOneMatchScore = .5;
const basedOnOppenentTwoMatchScore = 2;
const basedOnOppenentThreeMatchScore = 999;

const basedOnNoPlayMultiplier = 1;
const basedOnNoPlayOneMatchScore = 1;
const basedOnNoPlayTwoMatchScore = 2;
const basedOnNoPlayThreeMatchScore = 2;

export default function decideOnPlay(boardState) {
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
    // function isUp(colPos, rowPos, player){
    //     if(boardState[colPos-1] && boardState[colPos-1][rowPos]===player){
    //         return true;
    //     }
    //     return false;
    // }
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
    function getScore(numberMatches,oneMatchScore,twoMatchScore,threeMatchScore){
        if(numberMatches===1){
            return oneMatchScore
        }else if(numberMatches===2){
            return twoMatchScore
        }else if(numberMatches>=3){
            return threeMatchScore
        }
        return 0;
    }
    // for every  spot calculate a score depending on  how many in a row
    // if can't play spot give a score of -99999
    let valueOfPlaysBoard = boardState.map((row, yIndex) => 
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

            const valueBasedOnMe = getValueOfSpot(xIndex, yIndex, playerNumber, basedOnMeMultiplier, basedOnMeOneMatchScore, basedOnMeTwoMatchScore, basedOnMeThreeMatchScore);
            const valueBaseOnOtherPlayer =getValueOfSpot(xIndex, yIndex, opponentPlayerNumber, basedOnOppenentMultiplier, basedOnOppenentOneMatchScore, basedOnOppenentTwoMatchScore, basedOnOppenentThreeMatchScore);
            const valueBaseOnUnplayedSpace = getValueOfSpot(xIndex, yIndex, 0 , basedOnNoPlayMultiplier, basedOnNoPlayOneMatchScore, basedOnNoPlayTwoMatchScore, basedOnNoPlayThreeMatchScore);
            return   valueBasedOnMe + valueBaseOnOtherPlayer + valueBaseOnUnplayedSpace;
        }) 
    )
    function getValueOfSpot(xIndex, yIndex, checkFor, multiplier=1,oneMatchScore=1,twoMatchScore=2,threeMatchScore=3){
        let leftMatch = 0; 
        if(isLeft(yIndex,xIndex,checkFor)){
            leftMatch=1;
            if(isLeft(yIndex,xIndex-1,checkFor)){
                leftMatch=2;
                if(isLeft(yIndex,xIndex-2,checkFor)){
                    leftMatch=3;
                }
            }
        }
        let rightMatch =0;
        if(isRight(yIndex,xIndex,checkFor)){
            rightMatch=1;
            if(isRight(yIndex,xIndex+1,checkFor)){
                rightMatch=2;
                if(isRight(yIndex,xIndex+2,checkFor)){
                    rightMatch=3;
                }
            }
        } 
        const horizontalScore = getScore(rightMatch+leftMatch,oneMatchScore,twoMatchScore,threeMatchScore);

    
        let vertical=0;
        if(isDown(yIndex,xIndex,checkFor)){
            vertical=1;
            if(isDown(yIndex+1,xIndex,checkFor)){
                vertical=2;
                if(isDown(yIndex+2,xIndex,checkFor)){
                    vertical=3;
                }
            }
        }
        const  verticalScore = getScore(vertical,oneMatchScore,twoMatchScore,threeMatchScore);
        // positive slope match 
        let upRightMatch = 0;

        if(isUpRight(yIndex,xIndex,checkFor)){
            upRightMatch=1;
            if(isUpRight(yIndex-1,xIndex+1,checkFor)){
                upRightMatch=2;
                if(isUpRight(yIndex-2,xIndex+2,checkFor)){
                    upRightMatch=3;
                }
            }
        }
        let downLeftMatch = 0;            
        if(isDownLeft(yIndex,xIndex,checkFor)){
            downLeftMatch=1;
            if(isDownLeft(yIndex+1,xIndex-1,checkFor)){
                downLeftMatch=2;
                if(isDownLeft(yIndex+2,xIndex-2,checkFor)){
                    downLeftMatch=3;
                }
            }
        }
        const  positiveSlopeScore = getScore(upRightMatch+downLeftMatch,oneMatchScore,twoMatchScore,threeMatchScore);
 
        //negative slope
        let upLeftMatch = 0;
        if(isUpLeft(yIndex,xIndex,checkFor)){
            upLeftMatch=1;
            if(isUpLeft(yIndex-1,xIndex-1,checkFor)){
                upLeftMatch=2;
                if(isUpLeft(yIndex-2,xIndex-2,checkFor)){
                   upLeftMatch=3;
                }
            }
        }
        let downRightMatch = 0;            
        if(isDownRight(yIndex,xIndex,checkFor)){
            downRightMatch=1;
            if(isDownRight(yIndex+1,xIndex+1,checkFor)){
                downRightMatch=2;
                if(isDownRight(yIndex+2,xIndex+2,checkFor)){
                   downRightMatch=3;
                }
            }
        }
        const  negativeSlopeScore = getScore(upLeftMatch+downRightMatch,oneMatchScore,twoMatchScore,threeMatchScore);
        // now try to calculate the value of it bases on how many in row in each direction
        //
        const playValue= verticalScore*multiplier + horizontalScore*multiplier + positiveSlopeScore*multiplier + negativeSlopeScore*multiplier;
        return playValue;
    }
    // get the index of the highest score best play 
    let max= 0;
    let maxXIndex;
    let maxYIndex;
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
                maxYIndex=yIndex;
            }
        })
    )
    // check if maxXIndex results in lose
        const canPlayItValue = getValueOfSpot(maxXIndex, maxYIndex, opponentPlayerNumber,1,0,0,9999);
        // const checkBoard = JSON.parse(JSON.stringify(boardState))
        // checkBoard[maxYIndex][maxXIndex]= playerNumber;
        if(canPlayItValue>0){
            valueOfPlaysBoard[maxXIndex][maxYIndex] = -99999;
            max= 0;
            maxXIndex = 0;
            maxYIndex = 0;
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
                        maxYIndex=yIndex;
                    }
                })
            )
        }

    return maxXIndex;
}
