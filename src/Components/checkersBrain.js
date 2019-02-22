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
                return -1
            }
            //check if spot doesn't have something under it 
            if (isDown(yIndex, xIndex,0)){
                return -1
            }
            // DONE filtering out unavailable plays
            // check amount in line in each direction
            let leftMatch = 0; 
            if(isLeft(yIndex,xIndex,playerNumber)){
                leftMatch=1;
                if(isLeft(yIndex,xIndex-1,playerNumber)){
                    leftMatch=2;
                    if(isLeft(yIndex,xIndex-2,playerNumber)){
                        return 999;
                    }
                }
            }
            let rightMatch =0;
            if(isRight(yIndex,xIndex,playerNumber)){
                rightMatch=1;
                if(isRight(yIndex,xIndex+1,playerNumber)){
                    rightMatch=2;
                    if(isRight(yIndex,xIndex+2,playerNumber)){
                        return 999;
                    }
                }
            } 
            if(rightMatch+leftMatch >=3){
                return 999;
            }
            let downMatch=0;
            if(isDown(yIndex,xIndex,playerNumber)){
                downMatch=1;
                if(isDown(yIndex+1,xIndex,playerNumber)){
                    downMatch=2;
                    if(isDown(yIndex+2,xIndex,playerNumber)){
                        return 999;
                    }
                }
            }
            // positive slope match 
            let upRightMatch = 0;

            if(isUpRight(yIndex,xIndex,playerNumber)){
                upRightMatch=1;
                if(isUpRight(yIndex-1,xIndex+1,playerNumber)){
                    upRightMatch=2;
                    if(isUpRight(yIndex-2,xIndex+2,playerNumber)){
                        return 999;
                    }
                }
            }
            let downLeftMatch = 0;            
            if(isDownLeft(yIndex,xIndex,playerNumber)){
                downLeftMatch=1;
                if(isDownLeft(yIndex+1,xIndex-1,playerNumber)){
                    downLeftMatch=2;
                    if(isDownLeft(yIndex+2,xIndex-2,playerNumber)){
                        return 999;
                    }
                }
            }
            if(upRightMatch+downLeftMatch >=3){
                return 999;
            }
            //negative slope
            let upLeftMatch = 0;
            if(isUpLeft(yIndex,xIndex,playerNumber)){
                upLeftMatch=1;
                if(isUpLeft(yIndex-1,xIndex-1,playerNumber)){
                    upLeftMatch=2;
                    if(isUpLeft(yIndex-2,xIndex-2,playerNumber)){
                        return 999;
                    }
                }
            }
            let downRightMatch = 0;            
            if(isDownRight(yIndex,xIndex,playerNumber)){
                downRightMatch=1;
                if(isDownRight(yIndex+1,xIndex+1,playerNumber)){
                    downRightMatch=2;
                    if(isDownRight(yIndex+2,xIndex+2,playerNumber)){
                        return 999;
                    }
                }
            }
            if(upLeftMatch+downRightMatch >=3){
                return 999;
            }
            // now try to calculate the value of it bases on how many 
            return 0;
        }) 
    )
    
    // ge the index of the best play 
    let max= 0;
    let maxXIndex;
    valueOfPlaysBoard.forEach((row, yIndex) => 
        row.forEach((spot, xIndex) => {
              //check if spot is playable
              if (spot<0){
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
    return Math.floor((Math.random()*7));
}


// for the future 
// make a function that can score each play
// make a function that uses the play scorer to check future plays
