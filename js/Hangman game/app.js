const wordContainer = document.querySelector('.js-word-container'),
        popup = document.querySelector('.js-popup'),
        tooltip = document.querySelector('.js-tooltip'),
        correctLetters = [],
        wrongLetters = [],
        wrongWrapper = document.querySelector('.js-wrong-word-container'),
        wrongLettersContainer = document.querySelector('.js-wrong-letters'),
        hiddenFigure = document.querySelectorAll('.hidden-figure'),
        playAgainBtn = document.querySelector('.js-play-btn'),
        body = document.querySelector('.main');

let selectedWord = '',
    counter = 6,
    popupMessage = document.querySelector('.js-game-popup__text'),
    popupImg = document.querySelector('.js-popup-img');

function getRandomWords() {
    fetch('https://random-word-api.herokuapp.com/word?number=1')
        .then(response => response.json())
        .then(data => {
            const words = [...data];
            selectedWord = words[Math.floor(Math.random() * words.length)];
            this.initHiddenWord();
        });
}

function initHiddenWord() {
    wordContainer.innerHTML = `
        ${selectedWord.split('').map(letter =>
            `<span class="letters">
                ${correctLetters.includes(letter) ? letter : ''}
            </span>`
        ).join('')} `;

    const innerWord = wordContainer.innerText.replace(/\n/g, '');

    if(innerWord === selectedWord) {
        popupMessage.innerText = 'Congratulations! You are won!';
        popupImg.src = './images/win.png';
        popup.style.display = 'flex';
        body.classList.add('main-shadow');

    }
}

function showTootltip() {
    tooltip.classList.add('shown');

    setTimeout(()=> {
        tooltip.classList.remove('shown')
    }, 2000);
}

function updateWrongLetters() {
    wrongLettersContainer.innerText = wrongLetters;
    wrongWrapper.style.display = 'flex';
    hiddenFigure[wrongLetters.length - 1].style.display = 'flex';
    
    if(counter > 1) {
        counter --;  
    }else {
        popupMessage.innerText = `Sorry, you are lost. Hidden word is ${selectedWord}`;
        popup.style.display = 'flex'; 
        popupImg.src = './images/loss.png';
        body.classList.add('main-shadow');
        counter = 0;  
    }
}

window.addEventListener('keydown', (e)=> {
    if(counter === 0) return

    if(e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                initHiddenWord();
            }else {
                showTootltip();
            }
        }else {
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWrongLetters();
            }else {
                showTootltip();
            }
        }
    }
});

playAgainBtn.addEventListener('click', ()=> {
    document.location.reload(true);
});

getRandomWords();