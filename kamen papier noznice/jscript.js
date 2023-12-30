var playerScore = 0;
var computerScore = 0;


function begin() {
var playerChoice = prompt("   hráč: " + playerScore + "   počítač: " + computerScore + "\nvyber si kamen = k, papier = p alebo noznice = n");
var computerChoice = Math.random();

// RNG

    if (computerChoice <0.34) {
        computerChoice = "k";
    } else if (computerChoice <=0.67){
        computerChoice = "p";
    } else computerChoice = "n";

// comparing

    var  compare = function (player,computer){
        if(player === computer){
            alert ("hráč-" + player + "                                počítač-" + computer + "\nremíza");
            computerScore == computerScore ++;
            playerScore == playerScore ++;
            return 0;
        }
        if(player === "k"){
            if(computer === "n"){
                alert ("hráč-" + player + "                                počítač-" + computer + "\nkameň vyhráva")
                playerScore == playerScore ++;
            }
            else{
                alert ("hráč-" + player + "                                počítač-" + computer + "\npapier vyhráva")
                computerScore == computerScore ++;
            }
        }
        if(player === "p"){
            if(computer === "k"){
                alert  ("hráč-" + player + "                                počítač-" + computer + "\npapier vyhráva")
                playerScore == playerScore ++;
            }
            else{
                alert  ("hráč-" + player + "                                počítač-" + computer + "\nnoznice vyhrávajú")
                computerScore == computerScore ++;
            }
        }
        if(player === "n"){
            if(computer === "k"){
                alert ("hráč-" + player + "                                počítač-" + computer + "\nkameň vyhráva")
                playerScore == playerScore ++;
            }
            else{
                alert  ("hráč-" + player + "                                počítač-" + computer + "\nnožnice vyhrávajú")
                computerScore == computerScore ++;
            }
        }
    };
    compare(playerChoice,computerChoice)
    var info = [playerChoice, playerScore, computerChoice, computerScore];
    console.log(info);
        















}