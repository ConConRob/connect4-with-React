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
    // check if you can get have a 4 in a line win
    possiblePlays.forEach((canPlay, rowIndex)=>{
        console.log(isDown(5,rowIndex, opponentPlayerNumber), rowIndex)
    })
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
