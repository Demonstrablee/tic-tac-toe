/*----- constants -----*/
 
const winningCombos = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6], [1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];

const squares = Array.from(document.getElementsByClassName('square')); // this will correspond to the board array


/*----- app's state (variables) -----*/

let board; // corresponds to the actual displayed board and stores where the x's go
let turn = 'X'
let winMarker;

/*----- cached element references -----*/
/*----- event listeners -----*/
document.getElementById('reset-button').addEventListener('click',resetGame);
document.getElementById('board').addEventListener('click', handleTurn) // i guess the click is just passed into the function implicitly

/*----- functions -----*/

function init() { board = ['', '', '','', '', '','', '', ''];}; //be sure to call the init function!init();


function render(){
    board.forEach((mark,index)=>{squares[index].textContent = mark}); 
    /* implicitly passes each element in board and its index in to inner func which takes that index
    and mark placed in the array board, and updates screen content to reflect the array 
    */
     
    
    switch (winMarker){
        case 'T':
            document.getElementById('current-turn-text').textContent =" It's A TIE "; //adjust text for players turn
            break;
        case 'O':
            document.getElementById('current-turn-text').textContent = turn + " wins!!!"; //adjust text for players turn
            break;
        case 'X':
            document.getElementById('current-turn-text').textContent = turn + " wins!!!"; //adjust text for players turn
            break;
        default:
            document.getElementById('current-turn-text').textContent = turn + "'s Turn To Go"; //adjust text for players turn
            break;
    }

}


function handleTurn(event){
    let squareIndex = squares.findIndex((square)=> {return square === event.target}) // and each element from squares is passed implicitly into square to find what was clicked
    
    board[squareIndex] = turn; // stores where the mark will go for the board

    winMarker = getWinner(); // see if there is a winner and get the marker og the player who won
    //console.log(winMarker);

    // console.log(squareIndex);
    console.log(board);

     
   
    render();
    turn = (turn === 'X') ? 'O': 'X'; // switches the current player turn
    
}

function getWinner(){ // checks if someone won
    let playerMarker = null;

    winningCombos.forEach(function(combo, index){
        if (board[combo[0]] && (board[combo[0]] === board[combo[1]]) && (board[combo[0]] === board[combo[2]])) {
            playerMarker = board[combo[0]]; // the x or the o player marker
            console.log(playerMarker); // if someone wins print the winner
        }
    });
  
            
    if (playerMarker) {
        return playerMarker; 
      } else if (board.includes('')) {return null // if there's an empty space, return null (no winner yet)
      } else {return 'T' // no winner and no empty spaces? That's a tie!
    
    }

      
}


function resetGame(){
    turn = 'X'; // make X first player again to go first!
    winMarker = null;
    init(); // empty array storing marks
    render(); // update screen so that there are no marks
    console.clear();
}



 
init();