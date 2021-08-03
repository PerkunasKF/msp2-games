// Start the function after the DOM content is fully loaded.
// Counts cycles and cycle number pater, check if the start game button is presst.

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.color-btn').forEach(colorBtn => {
        colorBtn.disabled = true;
    });
    startGame();
});


function startGame() {
    let gameOwer = 0;
    let cycle = 0;
    let cycleMemmory = [];
    cycleMemmory.length = 0;

    document.getElementById('start-button').disabled = false;

    let startBtn = document.getElementById('start-button');
    $('#start-button').off().on('click', function () {
        startBtn.disabled = true;

        colorBlinkPattern(cycleMemmory, cycle, gameOwer);
    });
}

//  Function to make color buttons blink baset on colorMemmory number pattern
//  This code frame was coppyed from stackOwerflow, code by Cooper Buckingham
//  2021-07-29
//  [https://stackoverflow.com/questions/29883259/how-do-you-slow-down-the-execution-of-a-for-loop-in-javascript]

function colorBlinkPattern(cycleMemmory, cycle, gameOwer) {
    document.querySelectorAll('.color-btn').forEach(colorBtn => {
        colorBtn.disabled = true;
    });
    let randomNum = Math.floor(Math.random() * 4) + 1;
    if (gameOwer == 0) {
        cycleMemmory.push(randomNum);
        cycle++;
    }
    console.log('------Ciklas------ - ' + cycle);
    console.log('Ciklos skaiciu eiga - ' + cycleMemmory);
    console.log('Dabartinis skaicius - ' + cycleMemmory[cycle - 1]);
    console.log(gameOwer);

    let blink = 0;

    for (let i = 0; i < cycleMemmory.length; i++) {
        let colorNum = cycleMemmory[i];
        setTimeout(function () {
            if (colorNum == 1) {
                document.getElementById('red-button').style.backgroundColor = '#ff2b1c';
                clickSound();
            }
            if (colorNum == 2) {
                document.getElementById('blue-button').style.backgroundColor = '#1ca0ff';
                clickSound();
            }
            if (colorNum == 3) {
                document.getElementById('green-button').style.backgroundColor = '#1cff91';
                clickSound();
            }
            if (colorNum == 4) {
                document.getElementById('yellow-button').style.backgroundColor = '#fff41c';
                clickSound();
            }
            setTimeout(function () {
                let colorBtn = document.getElementsByClassName('color-btn');
                colorBtn[colorNum - 1].style.backgroundColor = '';
                blink++;
                if (cycle == blink && gameOwer == 0) {
                    document.querySelectorAll('.color-btn').forEach(colorBtn => {
                        colorBtn.disabled = false;
                    });
                    document.getElementById('start-button').disabled = true;
                    colorClickBlink(cycleMemmory, gameOwer);
                    console.log('---');
                } else {
                    if (cycle == blink && gameOwer == 1) {
                        startGame();
                    }
                }
            }, 500);
        }, 1000 * i);
    }
}

//  Function for button color change after click

function colorClickBlink(cycleMemmory, gameOwer) {
    let colorBtn = document.getElementsByClassName('color-btn');
    let buttonValue = 0;
    let valueCheck = [];
    let click = 0;

    let redBtn = colorBtn[0];
    $('#red-button').off().on('click', function () {
        redBtn.style.backgroundColor = '#ff2b1c';
        clickSound();
        setTimeout(function () {
            redBtn.style.backgroundColor = '';
        }, 150);
        buttonValue = 1;
        click++;
        valueCheck.push(buttonValue);
        patternCheck(valueCheck, cycleMemmory, click, gameOwer);
    });

    let blueBtn = colorBtn[1];
    $('#blue-button').off().on('click', function () {
        blueBtn.style.backgroundColor = '#1ca0ff';
        clickSound()
        setTimeout(function () {
            blueBtn.style.backgroundColor = '';
        }, 150);
        buttonValue = 2;
        click++;
        valueCheck.push(buttonValue);
        patternCheck(valueCheck, cycleMemmory, click, gameOwer);
    });

    let greenBtn = colorBtn[2];
    $('#green-button').off().on('click', function () {
        greenBtn.style.backgroundColor = '#1cff91';
        clickSound()
        setTimeout(function () {
            greenBtn.style.backgroundColor = '';
        }, 150);
        buttonValue = 3;
        click++;
        valueCheck.push(buttonValue);
        patternCheck(valueCheck, cycleMemmory, click, gameOwer);
    });

    let yellowBtn = colorBtn[3];
    $('#yellow-button').off().on('click', function () {
        yellowBtn.style.backgroundColor = '#fff41c';
        clickSound()
        setTimeout(function () {
            yellowBtn.style.backgroundColor = '';
        }, 150);
        buttonValue = 4;
        click++;
        valueCheck.push(buttonValue);
        patternCheck(valueCheck, cycleMemmory, click, gameOwer);
    });
}

// Function to check if the player is clicking the color patern correctly

function patternCheck(valueCheck, cycleMemmory, click, gameOwer) {
    if (cycleMemmory[click - 1] == valueCheck[click - 1]) {
        if (cycleMemmory.length == click && gameOwer == 0) {
            currentScore();
            setTimeout(function () {
                gameOwer = 0;
                colorBlinkPattern(cycleMemmory, click, gameOwer)
            }, 750);
        }
    } else {
        highScore();
        gameOwer = 1;
        setTimeout(function () {
            colorBlinkPattern(cycleMemmory, click, gameOwer);
        }, 750);
        console.log('neteisingai');
    }
}

// Functin to count curent games best performance

function currentScore() {
    let score = parseInt(document.getElementById('current-score').innerHTML);
    document.getElementById('current-score').innerHTML = ++score;
    let scoreBg = parseInt(document.getElementById('current-score-big').innerHTML);
    document.getElementById('current-score-big').innerHTML = ++scoreBg;
}

// Function to log highes score made

function highScore() {
    let score = parseInt(document.getElementById('current-score').innerHTML);
    let highscore = parseInt(document.getElementById('high-score').innerHTML);
    if (highscore < score) {
        document.getElementById('high-score').innerHTML = score;
    }
    let scoreBg = parseInt(document.getElementById('current-score-big').innerHTML);
    let highscoreBg = parseInt(document.getElementById('high-score-big').innerHTML);
    if (highscoreBg < scoreBg) {
        document.getElementById('high-score-big').innerHTML = scoreBg;
    }
    document.getElementById('current-score').innerHTML = 0;
}

// Function to play a sound on clicking one of the color buttons and on color blink
// Audio was downloaded form [https://mixkit.co/free-sound-effects/stomp/] om 2021-08-02

function clickSound() {
    let audio = document.getElementById('stomp');
    audio.play();
    //let audio = new Audio('assets/sound/stomp-1.mp3');
    //audio.play();

    //var x = document.getElementById("myAudio").duration;
    //document.getElementById("demo").innerHTML = x;
}