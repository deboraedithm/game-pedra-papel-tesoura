const startBtn = document.getElementById('start-game');
const welcomeScreen = document.getElementById('welcome-screen');
const gameArea = document.getElementById('game-area');
const playerScore = document.getElementById('player-score');
const computerScore = document.getElementById('computer-score');
const message = document.getElementById('message');
const playerChoiceImg = document.getElementById('player-choice-img');
const computerChoiceImg = document.getElementById('computer-choice-img');
const choices = document.querySelectorAll('.choice');
const playAgainBtn = document.getElementById('play-again');
const ageModal = document.getElementById('age-modal');
const ageInput = document.getElementById('age-input');
const confirmAgeBtn = document.getElementById('confirm-age');

// Variáveis do jogo
let pScore = 0;
let cScore = 0;
let canPlay = false;

// Imagens das escolhas
const images = {
    pedra: "midia/rock.svg",
    papel: "midia/paper.svg",
    tesoura: "midia/scissors.svg"
};

// Eventos principais
startBtn.addEventListener('click', () => showAgeModal());
confirmAgeBtn.addEventListener('click', checkAge);
playAgainBtn.addEventListener('click', resetRound);

// Adiciona evento para cada escolha
choices.forEach(choice => {
    choice.addEventListener('click', () => {
        if (!canPlay) return;
        playGame(choice.id);
    });
});

// Verifica a idade
function checkAge() {
    const age = parseInt(ageInput.value);
    
    if (isNaN(age) || age <= 0) {
        alert("Por favor, insira uma idade válida!");
        return;
    }
    
    if (age < 18) {
        alert("Você é menor de idade e não pode jogar.");
    } else {
        canPlay = true;
        startGame();
    }
    
    ageModal.style.display = "none";
}

// Mostra o modal de idade
function showAgeModal() {
    ageModal.style.display = "flex";
}

// Inicia o jogo
function startGame() {
    welcomeScreen.classList.add('hidden');
    gameArea.classList.remove('hidden');
}

// Lógica do jogo
function playGame(playerChoice) {
    canPlay = false;
    
    // Escolha do computador
    const options = ['pedra', 'papel', 'tesoura'];
    const computerChoice = options[Math.floor(Math.random() * 3)];
    
    // Mostra as escolhas
    updateChoiceDisplay(playerChoice, computerChoice);
    
    // Determina o vencedor após delay
    setTimeout(() => {
        getWinner(playerChoice, computerChoice);
        canPlay = true;
        playAgainBtn.classList.remove('hidden');
    }, 1000);
}

// Mostra as imagens das escolhas
function updateChoiceDisplay(playerChoice, computerChoice) {
    // Limpa e adiciona escolha do jogador
    playerChoiceImg.innerHTML = `<img src="${images[playerChoice]}" alt="${playerChoice}">`;
    
    // Animação para o computador
    computerChoiceImg.innerHTML = '';
    computerChoiceImg.classList.add('shake');
    
    setTimeout(() => {
        computerChoiceImg.classList.remove('shake');
        computerChoiceImg.innerHTML = `<img src="${images[computerChoice]}" alt="${computerChoice}">`;
    }, 500);
}

// Verifica quem ganhou
function getWinner(player, computer) {
    // Caso de empate
    if (player === computer) {
        message.textContent = "Empate!";
        message.className = 'draw';
        return;
    }
    
    // Verificação de vitória
    const isPlayerWinner = 
        (player === 'pedra' && computer === 'tesoura') ||
        (player === 'papel' && computer === 'pedra') ||
        (player === 'tesoura' && computer === 'papel');
    
    if (isPlayerWinner) {
        message.textContent = "Você venceu!";
        message.className = 'win';
        pScore++;
        playerScore.textContent = pScore;
    } else {
        message.textContent = "Computador venceu!";
        message.className = 'lose';
        cScore++;
        computerScore.textContent = cScore;
    }
}

// Reseta para nova rodada
function resetRound() {
    playerChoiceImg.innerHTML = '';
    computerChoiceImg.innerHTML = '';
    message.textContent = '';
    message.className = '';
    playAgainBtn.classList.add('hidden');
}