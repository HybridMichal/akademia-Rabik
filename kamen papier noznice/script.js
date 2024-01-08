let playerScore = 0 
let computerScore = 0
let resultColumn 
let computerScoreText = computerScore
let playerScoreText = playerScore

document.addEventListener("DOMContentLoaded", function() {
    resultColumn = document.querySelector("[data-result-column]") 
    computerScoreText = document.querySelector("[data-computer-score]") 
    playerScoreText = document.querySelector("[data-your-score]") 
}) 

const choices = [
    {
        name: "k",
        beats: "n"
    },
    {
        name: "p",
        beats: "k"
    },
    {
        name: "n",
        beats: "p"
    }
] 

function randomChoice() {
    const random = Math.floor(Math.random() * choices.length) 
    return choices[random] 
}

function Winner(player, opponent) {
    return player.beats === opponent.name 
}

function play() {
    let playerInput = prompt("hráč: " + playerScore + "    \npočítač: " + computerScore + "\nvyber si kamen = k, papier = p alebo noznice = n").toLowerCase()
    const playerChoice = choices.find(selection => selection.name === playerInput) 

    const computerChoice = randomChoice() 

    const youWin = Winner(playerChoice, computerChoice) 
    const computerWin = Winner(computerChoice, playerChoice) 

    addResult(computerChoice, computerWin) 
    addResult(playerChoice, youWin) 

    if (youWin) updateScore('player') 
    if (computerWin) updateScore('computer') 

    endGame() 
    console.log(playerScore, computerScore)
}

function addResult(choice, winner) {
    const div = document.createElement("div") 
    div.innerText = choice.name 
    resultColumn.after(div) 
    // pridat highlight winnera possibly
}

function updateScore(scorer) {
    if (scorer === 'player') {
        playerScore += 1 
        playerScoreText.innerText = playerScore 
    } else if (scorer === 'computer') {
        computerScore += 1 
        computerScoreText.innerText = computerScore     
    }
    //toto != najlepsi sposob
}
function endGame() {
let reset = false 
    if (playerScore === 5) {
        reset = confirm("vyhral si, chceš hrať znova?") 
    }
    if (computerScore === 5) {
        reset = confirm("prehral si, chceš hrať znova?") 
    }

    if (reset){
        location.reload() 
    }
    // toto by sa malo runnut iba raz to este musim vymysliet
    
}
