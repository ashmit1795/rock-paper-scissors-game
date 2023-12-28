//Global Scope Variables:
let userScore = 0; //Tracking the User Score
let compScore = 0; //Tracking the Computer Score
let gameTurn = 0; //Tracking the no. of turns played
let message = document.querySelector(".msg-box"); //Accessing the message box
let turn = document.querySelector("#turn"); //Accessing the turn counter box
let compChoice; //Variable for storing computer choice
let userChoice; //Variable for storing user choice

//Configuartion for computer area after computer choice is generated
let compRock = document.querySelector("#comp-Rock");
let compPaper = document.querySelector("#comp-Paper");
let compScissors = document.querySelector("#comp-Scissors");

const compConfig = (compChoice) =>{
        if (compChoice === "Rock"){
            compRock.style.backgroundColor = "#081b31";
        }else if (compChoice === "Paper"){
            compPaper.style.backgroundColor = "#081b31";
        }else if (compChoice === "Scissors"){
            compScissors.style.backgroundColor = "#081b31";
        }
    }

//Computer Choice Generation
const genCompChoice = () =>{
    let compChoices = ["Rock", "Paper", "Scissors"]
    let i = Math.floor(Math.random()*3);
    return compChoices[i];
}

//Display message for draw game
const drawGame = () =>{
    console.log("It's a draw");
    message.innerText = "It's a draw. Play  again.";
    message.style.backgroundColor = "gray";
}

//Display message for winner and score incrementer
const showWinner = (res) =>{
    if (res === true){
        //User Wins
        console.log("User Wins!")
        userScore+=1;
        let user = document.querySelector("#your-score");
        user.innerText = userScore;
        message.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
        message.style.backgroundColor = "green";
    }else if (res === false){
        //Computer Wins
        console.log("Computer Wins!")
        compScore+=1;
        let computer = document.querySelector("#comp-score");
        computer.innerText = compScore;
        message.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
        message.style.backgroundColor = "red";
    }
}

//Function to play the game
const playGame = (userChoice) =>{
    //To play the game, we need computer choice also
    compChoice = genCompChoice();
    console.log(`Computer Choice is: ${compChoice}`); //This is to check in the console

    compConfig(compChoice); //Calling the function for configurating the computer area
    if (userChoice === compChoice){
        drawGame(); //Calling the draw game function
    }else{
        let userWin = true; //Here we assumed that the user has won
        if (userChoice === "Rock"){
            //Then compChoice must be paper or scissors
            userWin = compChoice === "Paper" ? false : true;
        }else if(userChoice === "Paper"){
            //Then compChoice must be rock or scissors
            userWin = compChoice === "Scissors" ? false : true;
        }else{
            //Then userChoice must be scissors
            //Then compChoice must be rock or paper
            userWin = compChoice === "Rock" ? false : true;
        }
        //Game is played, its time to show the winner of this turn
        showWinner(userWin);
    }
}

//All Starts here:
const choices = document.querySelectorAll(".choice");
choices.forEach((choice)=>{
    // console.log(choice)
    choice.addEventListener("click", () => {
        userChoice = choice.getAttribute("id");
        gameTurn += 1;
        //Reseting the config of Computer Area after each turn
        compRock.style.backgroundColor = "#ffffff";
        compPaper.style.backgroundColor = "#ffffff";
        compScissors.style.backgroundColor = "#ffffff";
        turn.innerText = `Turn: ${gameTurn}`;
        //This is to check in the console
        console.log(`User Choice is: ${userChoice}`);

        // We've got the user choice it's time to play the game
        playGame(userChoice); 
    })
})
