let container = document.querySelector('.container');
let content = document.querySelector('.content');
let newGameContainer = document.querySelector('.new-game-container');
let newGame = document.querySelector('.new-game');
let detail;
let posY = 0;
let offset = 0;
let randomPictures;
let picturelist = ['img/bomb.gif', 'img/coin.webp', 'img/star.png'];
let count = 0;
let hearth = document.querySelectorAll('.hearth > img');
let ddum = document.querySelector('.ddum');
let coin = document.querySelector('.coin');
let result = document.querySelector('.result');
let resultSpan = document.querySelector('.result > span');
let play = document.querySelector('.play');
let menuContainer = document.querySelector('.menu-container');
let menuContainerButton = document.querySelector('.menu-cont > button');
let menuInfo = document.querySelector('.menu-info');
let moveAt = false;
let gamePosition = document.querySelectorAll('.game-position > button');
let menuCont = document.querySelector('.menu-cont');
let TimePoint = 6;
let TimePointNumbers = [5, 4, 3];
let scorePoint
// ---------------------- Audio Sound Effects Functions Start-----------------------
let coinAudio = document.querySelector('.coin-audio');
let ddumAudio = document.querySelector('.ddum-audio');
let backgroundMusic = document.querySelector('.background-music');
let bombAudio = document.querySelector('.bomb-audio');
let wolvesAudio = document.querySelector('.wolves-audio');
let selectAudio = document.querySelector('.select-audio');
let loughAudio = document.querySelector('.lough-audio');


function coinAudioSong() {
    coinAudio.currentTime = 0;
    coinAudio.play();
}

function ddumAudioSon() {
    ddumAudio.currentTime = 0;
    ddumAudio.play();
}

function startAudio() {
    wolvesAudio.currentTime = 0;
    wolvesAudio.play();
}

function bombAudioStart() {
    loughAudio.currentTime = 0;
    loughAudio.play();
    bombAudio.currentTime = 0;
    bombAudio.play();
}

function selectAudioStart() {
    selectAudio.currentTime = 0;
    selectAudio.play();
}

// ---------------------- Audio Sound Effects Functions End-------------------------

gamePosition.forEach((item, index) => {
    item.onclick = () => {
        for(let i = 0; i < gamePosition.length; i++) {
            gamePosition[i].style.pointerEvents = 'none'
        }
        selectAudioStart()
        item.style.background = 'orangered';
        item.style.color = 'white';
        item.style.boxShadow = '0 0 2px black inset'
        TimePoint = TimePointNumbers[index];
    }
})


// ---------------------- Menu Settings And Play Start-------------------------

play.onclick = () => {
    startAudio()
    document.body.style.cursor = 'none';
    menuInfo.style.display = 'none';
    play.style.transform = 'translate(-50%,-50%) scale(0)'
    moveAt = true;
    menuContainer.style.opacity = '0'
    menuContainer.style.visibility = 'hidden';
    setTimeout(() => {
        menuCont.style.display = 'none'
        foo()
        createDetail();
    }, 3000)
}

// ---------------------- Menu Settings And Play End---------------------------



function createDetail() {
    if (moveAt) {
        randomPictures = Math.round(Math.random() * 2);
        let detailLeft = Math.round(Math.random() * container.offsetWidth - 20);
        detail = document.createElement('div');
        detail.className = 'detail';
        detail.style.background = `url(${picturelist[randomPictures]})`
        container.appendChild(detail);
        detail.style.left = detailLeft + 'px'
        detail.style.top = posY + 'px';
    }
}


function foo() {
    if (moveAt) {
        let stop = setInterval(() => {
            posY += 5;
            detail.style.top = posY + 'px';
            if (posY > container.offsetHeight) {
                detail.remove()
                posY = 0;
                detail.style.top = posY + 'px';
                posY += 5;
                createDetail()
            }
            if (detail.offsetTop >= content.offsetTop - detail.offsetHeight && detail.offsetLeft - content.offsetLeft < content.offsetWidth && detail.offsetLeft - content.offsetLeft > -100) {
                if (randomPictures == 0) {
                    content.classList.add('slideUp');
                    setTimeout(() => {
                        content.classList.remove('slideUp');
                    }, 300)
                    bombAudioStart()
                    hearth[count].style.opacity = 0;
                    count++;
                    if (count == 3) {
                        resultSpan.innerText = coin.innerText;
                        localStorage.setItem('score', coin.innerText)
                        clearInterval(stop);
                        newGameContainer.style.zIndex = 5;
                        document.body.style.cursor = 'default';
                        coin.innerText = 0;
                        ddum.innerText = 0;
                    }
                } else if (randomPictures == 1) {
                    coin.innerText++;
                    coinAudioSong()
                } else {
                    ddum.innerText++;
                    ddumAudioSon()
                }
                detail.remove();
            }
        }, TimePoint)
    }
}

newGame.onclick = () => {
    backgroundMusic.currentTime = 0;
    backgroundMusic.play();
    foo()
    newGameContainer.style.zIndex = -1;
    document.body.style.cursor = 'none';
    for (let i = 0; i < hearth.length; i++) {
        hearth[i].style.opacity = 1
    }
    count = 0
}

window.onmousemove = e => {
    if (moveAt) {
        content.style.left = e.clientX + 'px';
        backgroundMusic.play();
        if (content.offsetLeft < 0) {
            content.style.left = 0
        } else if (content.offsetLeft >= container.offsetWidth - content.offsetWidth) {
            content.style.left = container.offsetWidth - content.offsetWidth + 'px'
        }
    }
}
backgroundMusic.ontimeupdate = () => {
    if (backgroundMusic.ended) {
        backgroundMusic.play();
    }
}
