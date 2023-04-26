'use strict';
/*
The Pick Game

This game app is to reinforce your knowledge and skills with DOM and Events.

Demo:  https://pig-game-v2.netlify.app/

This is a two player game.

The current Player rolls the dice, an image of a random die face is shown,
    and the value on the die is added to the player's current score
which is shown by the number in the 'CURRENT' box.

The player may roll as many times as they choose.

Whenever the player rolls a one, the player's current score is reset to 
zero and the game play passes to the other player.

This is the motivation for a player selecting "HOLD".  
When the player selects "HOLD", the current score is added to the total score
which is shown as a large number under 'PLAYER 1' or 'PLAYER 2.
The current score is reset to zero.And the game passes to the other player.

The first player to reach 100 points then wins the game.

There is also a way of resetting the game.If the 'NEW GAME' button is pressed,
    the dice will disappear and all the scores are set back to zero.


Included in this starter is a flowchart which is a not-too-detailed
visualization of the structure of the application.
On left side of the flowchart, the yellow represents the possible 
actions that the user can take.
Flowing from each action is the representation of what happens in the application.

*/

//Get elements from html script
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

const resetButton = document.querySelector(".btn--new");
const rollButton = document.querySelector(".btn--roll");
const holdButton = document.querySelector(".btn--hold");

const currentScore0 = document.getElementById("current--0");
const currentScore1 = document.getElementById("current--1");

const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");

const imgRoll = document.querySelector(".dice");


//Make everything 0 at the beginning
currentScore0.textContent = 0;
score0.textContent = 0;
currentScore1.textContent = 0;
score1.textContent = 0;

let activePlayer = false;  //0
let holdClicked = false;
let gameRunning = true;



// generates random dice
rollButton.onclick = randomDice;




function randomDice() {
    let min = 1;
    let max = 7;
    
    let randomNum = Math.floor(Math.random() * (max - min) + min);
    
    imgRoll.setAttribute("src", `dice-${randomNum}.png`);

    let current = document.getElementById(`current--${Number(activePlayer)}`);
    current.textContent = Number(randomNum) + Number(current.textContent);

    if (randomNum === 1) {
        switchPlayer();
    }


}

//current = (currentPlayer % 2) true = 1 ann false = 0
// switches active player between player 0 and player 1
function switchPlayer() {
    if (!player1.classList.contains("player--active")) {
        player0.classList.remove("player--active");
        player1.classList.add("player--active");
        
        activePlayer = true; //1
        currentScore0.textContent = 0;

    } else if (player1.classList.contains("player--active")) {
        player0.classList.add("player--active");
        player1.classList.remove("player--active");
        
        activePlayer = false; //0
        currentScore1.textContent = 0;
    }
}



// hold button updates score
holdButton.onclick = holdUpdate; 



function holdUpdate() {
    //holdClicked = true;
    let totalScore = document.getElementById(`score--${Number(activePlayer)}`);
    let current2 = document.getElementById(`current--${Number(activePlayer)}`);

    totalScore.textContent = Number(totalScore.textContent) + Number(current2.textContent);
    switchPlayer();

    if (totalScore.textContent >= 100) {
        winner();
    }
}


//Reset Button
resetButton.onclick = reset;

function reset() {
    //console.log("hi");
    score0.textContent = 0;
    currentScore0.textContent = 0;

    score1.textContent = 0;
    currentScore1.textContent = 0;    

    holdButton.onclick = holdUpdate; 

    rollButton.onclick = randomDice;

    if (player0.classList.contains("player--winner")) {
        player0.classList.remove("player--winner");
    } else if (player1.classList.contains("player--winner")) {
        player1.classList.remove("player--winner");
    }
}


//winner condition
function winner() {
    console.log(score0.textContent);
    if (score0.textContent >= 100) {
        player0.classList.add("player--winner");
        
        //console.log(`100 player 1`);
    } else if (score1.textContent >= 100) {
        player1.classList.add("player--winner");
        
        //console.log(`100 player 2`);
    }

    holdButton.onclick = null;
    rollButton.onclick = null;
}



