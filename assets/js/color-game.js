// Start the function after the DOM content is fully loaded.
// Counts cycles and cycle number pater, check if the start game button is presst.

document.addEventListener('DOMContentLoaded', function () {
    startGame();
});


function startGame() {
    let gameOwer = 0;
    let cycle = 0;
    let cycleMemmory = [];
    cycleMemmory.length = 0;

    document.getElementById('start-button').disabled = false;
    document.querySelectorAll('.color-btn').forEach(colorBtn => {
        colorBtn.disabled = true;
    });

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
    document.querySelectorAll('.color-btn').forEach(colorBtn => {
        colorBtn.disabled = true;
    });

    for (let i = 0; i < cycleMemmory.length; i++) {
        let colorNum = cycleMemmory[i];
        setTimeout(function () {
            if (colorNum == 1) {
                document.getElementById('red-button').style.backgroundColor = 'red';
            }
            if (colorNum == 2) {
                document.getElementById('blue-button').style.backgroundColor = 'blue';
            }
            if (colorNum == 3) {
                document.getElementById('green-button').style.backgroundColor = 'green';
            }
            if (colorNum == 4) {
                document.getElementById('yellow-button').style.backgroundColor = 'yellow';
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
                    colorClickBlink(cycleMemmory);
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

function colorClickBlink(cycleMemmory) {
    let colorBtn = document.getElementsByClassName('color-btn');
    let buttonValue = 0;
    let valueCheck = [];
    let click = 0;

    let redBtn = colorBtn[0];
    $('#red-button').off().on('click', function () {
        redBtn.style.backgroundColor = 'red';
        setTimeout(function () {
            redBtn.style.backgroundColor = '';
        }, 150);
        buttonValue = 1;
        click++;
        valueCheck.push(buttonValue);
        patternCheck(valueCheck, cycleMemmory, click);
    });

    let blueBtn = colorBtn[1];
    $('#blue-button').off().on('click', function () {
        blueBtn.style.backgroundColor = 'blue';
        setTimeout(function () {
            blueBtn.style.backgroundColor = '';
        }, 150);
        buttonValue = 2;
        click++;
        valueCheck.push(buttonValue);
        patternCheck(valueCheck, cycleMemmory, click);
    });

    let greenBtn = colorBtn[2];
    $('#green-button').off().on('click', function () {
        greenBtn.style.backgroundColor = 'green';
        setTimeout(function () {
            greenBtn.style.backgroundColor = '';
        }, 150);
        buttonValue = 3;
        click++;
        valueCheck.push(buttonValue);
        patternCheck(valueCheck, cycleMemmory, click);
    });

    let yellowBtn = colorBtn[3];
    $('#yellow-button').off().on('click', function () {
        yellowBtn.style.backgroundColor = 'yellow';
        setTimeout(function () {
            yellowBtn.style.backgroundColor = '';
        }, 150);
        buttonValue = 4;
        click++;
        valueCheck.push(buttonValue);
        patternCheck(valueCheck, cycleMemmory, click);
    });
}

function patternCheck(valueCheck, cycleMemmory, click) {
    if (cycleMemmory[click - 1] == valueCheck[click - 1]) {
        if (cycleMemmory.length == click) {
            document.querySelectorAll('.color-btn').forEach(colorBtn => {
                colorBtn.disabled = true;
            });
            setTimeout(function () {
                gameOwer = 0;
                colorBlinkPattern(cycleMemmory, click, gameOwer)
            }, 750);
        }
    } else {
        gameOwer = 1;
        setTimeout(function () {
            colorBlinkPattern(cycleMemmory, click, gameOwer);
        }, 750);
        console.log('neteisingai');
    }
}