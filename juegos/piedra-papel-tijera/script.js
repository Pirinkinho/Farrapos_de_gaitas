
let playerScore = 0;
let computerScore = 0;

function playGame(playerChoice) {
    const choices = ['piedra', 'papel', 'tijera'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    let result = '';

    if (playerChoice === computerChoice) {
        result = '🤝 Empate!';
    } else if (
        (playerChoice === 'piedra' && computerChoice === 'tijera') ||
        (playerChoice === 'papel' && computerChoice === 'piedra') ||
        (playerChoice === 'tijera' && computerChoice === 'papel')
    ) {
        result = `✅ Ganaste! ${playerChoice} vence a ${computerChoice}.`;
        playerScore++;
    } else {
        result = `❌ Perdiste! ${computerChoice} vence a ${playerChoice}.`;
        computerScore++;
    }

    document.getElementById('result').textContent = result;
    document.getElementById('score').textContent = `Jugador: ${playerScore} | Computadora: ${computerScore}`;
}
