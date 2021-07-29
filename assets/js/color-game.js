var cicle = 0;
var cicleMemmory = [];
var lastBlink = 0;
var buttonValue = 0;

//  The beginging of the game
//  Generates random numbers to choose a button and calculates cicles.

document.addEventListener('DOMContentLoaded', function () {
    let startButton = document.getElementById('start-button');

    startButton.addEventListener('click', function () {
        /*startButton.disabled = true;
        if (startButton.disabled == true) {
            startButton.style.backgroundColor = '';
        }*/
        document.querySelectorAll('.color-btn').forEach(colorBtn => {
            colorBtn.disabled = true;
        });
        cicle++;
        let num = 1; //Math.floor(Math.random() * 4) + 1;
        cicleMemmory.push(num);

        //console.log('Ciklo numeris - ' + cicle);
        //console.log('Atsitiktinis skaicius - ' + num);
        //console.log('Atsitiktiniu skaicius seka - ' + cicleMemmory);


        setTimeout(function () {
            startGame(cicleMemmory);
        }, 500);
    });

    colorChange();
});

//  Function to send random number to the colorBlink function so the needed button blinks right color
//  This code frame was coppyed from stackOwerflow, code by Cooper Buckingham
//  2021-07-29
//  [https://stackoverflow.com/questions/29883259/how-do-you-slow-down-the-execution-of-a-for-loop-in-javascript]

function startGame(cicleMemmory) {
    for (let i = 0; i < cicleMemmory.length; i++) {
        let num = cicleMemmory[i];
        setTimeout(function () {
            colorBlink(num);
        }, 1000 * i);
    }
}

//  Function for color blink baste on the random generated number from 1 to 4

function colorBlink(num) {
    if (num == 1) {
        document.getElementById('red-button').style.backgroundColor = 'red';
    }
    if (num == 2) {
        document.getElementById('blue-button').style.backgroundColor = 'blue';
    }
    if (num == 3) {
        document.getElementById('green-button').style.backgroundColor = 'green';
    }
    if (num == 4) {
        document.getElementById('yellow-button').style.backgroundColor = 'yellow';
    }
    setTimeout(function () {
        let colorBtn = document.getElementsByClassName('color-btn');
        colorBtn[num - 1].style.backgroundColor = '';
        lastBlink++;
        //console.log('Ciklas - ' + cicle);
        //console.log('Paskutinis bliksnis - ' + lastBlink);
        if (cicle == lastBlink) {
            lastBlink = 0;
            colorChange();
        } else {
            document.getElementById('start-button').style.backgroundColor = '';
        }
    }, 500);
}

// Function to change color for buttons on click

function colorChange() {
    document.querySelectorAll('.color-btn').forEach(colorBtn => {
        colorBtn.disabled = false;
    });

    let colorBtn = document.getElementsByClassName('color-btn');

    let redBtn = colorBtn[0];
    redBtn.addEventListener('click', function () {
        buttonValue = 1;
        redBtn.style.backgroundColor = 'red';
        colorPattern(buttonValue);
        setTimeout(function () {
            redBtn.style.backgroundColor = '';
        }, 150);
    });
    let blueBtn = colorBtn[1];
    blueBtn.addEventListener('click', function () {
        buttonValue = 2;
        blueBtn.style.backgroundColor = 'blue';
        setTimeout(function () {
            blueBtn.style.backgroundColor = '';
        }, 150);
    });
    let greenBtn = colorBtn[2];
    greenBtn.addEventListener('click', function () {
        buttonValue = 3;
        greenBtn.style.backgroundColor = 'green';
        setTimeout(function () {
            greenBtn.style.backgroundColor = '';
        }, 150);
    });
    let yellowBtn = colorBtn[3];
    yellowBtn.addEventListener('click', function () {
        buttonValue = 4;
        yellowBtn.style.backgroundColor = 'yellow';
        setTimeout(function () {
            yellowBtn.style.backgroundColor = '';
        }, 150);
    });
}

function colorPattern(buttonValue) {
    let i = cicleMemmory;


    if (i[0] == buttonValue) {
        console.log(i);
        i.shift();
        console.log(i);
        console.log('Teisingai');
        colorChange()
        console.log(cicleMemmory);
    } else {
        document.querySelectorAll('.color-btn').forEach(colorBtn => {
            colorBtn.disabled = true;
        });
        console.log('Neteisigai');
    }
}