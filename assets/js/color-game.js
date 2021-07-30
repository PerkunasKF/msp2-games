// Start the function after the DOM content is fully loaded.
// Counts cycles and cycle number pater, check if the start game button is presst.

document.addEventListener('DOMContentLoaded', function () {
    let cycle = 0;
    var cycleMemmory = [];

    document.querySelectorAll('.color-btn').forEach(colorBtn => {
        colorBtn.disabled = true;
    });

    let startBtn = document.getElementById('start-button');
    startBtn.addEventListener('click', function () {
        startBtn.disabled = true;

        let randomNum = Math.floor(Math.random() * 4) + 1;
        cycleMemmory.push(randomNum);
        cycle++;

        console.log('------Ciklas------ - ' + cycle);
        console.log('Ciklos skaiciu eiga - ' + cycleMemmory);

        colorBlinkPattern(cycleMemmory, cycle);
    });
});

//  Function to make color buttons blink baset on colorMemmory number pattern
//  This code frame was coppyed from stackOwerflow, code by Cooper Buckingham
//  2021-07-29
//  [https://stackoverflow.com/questions/29883259/how-do-you-slow-down-the-execution-of-a-for-loop-in-javascript]

function colorBlinkPattern(cycleMemmory, cycle) {
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
                if (cycle == blink) {
                    document.querySelectorAll('.color-btn').forEach(colorBtn => {
                        colorBtn.disabled = false;
                    });
                    document.getElementById('start-button').disabled = false;
                    colorClickBlink(cycleMemmory);
                    console.log('---');
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
    //valueCheck.length = 0;
    //console.log(valueCheck);
    let click = 0;

    let redBtn = colorBtn[0];
    $('#red-button').off().on('click', function () {
        redBtn.style.backgroundColor = 'red';
        setTimeout(function () {
            redBtn.style.backgroundColor = '';
        }, 150);
        buttonValue = 1;
        click++;
        console.log('click');
        valueCheck.push(buttonValue);
        patternCheck(valueCheck, cycleMemmory);
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
        patternCheck(valueCheck, cycleMemmory);
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
        patternCheck(valueCheck, cycleMemmory);
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
        patternCheck(valueCheck, cycleMemmory);
    });

    let startBtn = document.getElementById('start-button');
    startBtn.addEventListener('click', function () {
        valueCheck.length = 0;
    })
}

function patternCheck(valueCheck, cycleMemmory) {
    console.log('Skaiciu eile - ' + cycleMemmory);
    console.log('Miktu paspaudimo eile - ' + valueCheck);
}