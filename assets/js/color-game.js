var cicle = 0;
let cicleMemmory = [];

document.addEventListener('DOMContentLoaded', function () {
    var startButton = document.getElementById('start-button');

    startButton.addEventListener('click', function () {
        cicle++;
        let num = Math.floor(Math.random() * 4) + 1;
        cicleMemmory.push(num);

        console.log('Ciklo numeris - ' + cicle);
        console.log('Atsitiktinis skaicius - ' + num);
        console.log('Atsitiktiniu skaicius seka - ' + cicleMemmory);

        startGame(cicleMemmory);
    });
});

//  Function to send random number to the colorBlink function so the needed button blinks right color
//  This code frame was coppyed from stackOwerflow, code by Cooper Buckingham
//  2021-07-29
//  [https://stackoverflow.com/questions/29883259/how-do-you-slow-down-the-execution-of-a-for-loop-in-javascript]

function startGame(cicleMemmory) {
    for (var i = 0; i < cicleMemmory.length; i++) {
        let num = cicleMemmory[i];
        setTimeout(function () {
            colorBlink(num);
        }, 1000 * i);
    }
}

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
    }, 500);
}