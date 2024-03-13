let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

// want to get array in the form ['rock','paper','scissors']
const options = Array.from(choices).map(choice => choice.id); //returns ['rock','paper','scissors']

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playgame(userChoice);
    })
});

const playgame = (userChoice) => {
    // console.log(`User's Choice is : ${userChoice}`);
    
    // generate computer choice
    const compChoice = genCompChoice();
    // console.log(`Computer's Choice is : ${compChoice}`);

    gameWinner(userChoice,compChoice);
}

const genCompChoice = () => {
    const randIdx = Math.floor( (Math.random()) * 3) ;
    return options[randIdx];
}

const gameWinner = (userChoice,compChoice) => {
    if(userChoice === compChoice){
        drawGame();
    }
    else{
        let userWin = true;
        if(userChoice === options[0]) {
            userWin = compChoice === options[1] ? false:true;
        }
        else if(userChoice === options[1]) {
            userWin = compChoice === options[2] ? false:true;
        }
        else{
            userWin = compChoice === options[0] ? false:true;
        }
        showWinner(userWin,userChoice,compChoice);
    }
}

const drawGame = () => {
    msg.innerText = "Game is drawn! Play again."
    msg.style.backgroundColor = '#081b31';
}

const showWinner = (userWin,userChoice,compChoice) => {
    if(userWin){
        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = 'darkgreen';
        userScore++;
        userScorePara.innerText = userScore;
    }
    else{
        msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = 'darkred';
        compScore++;
        compScorePara.innerText = compScore;
    }
}