// takes in the state of the board and returns a col to play

export default function decideOnPlay(boardState) {
    // check if you have a 4 in a line win
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
