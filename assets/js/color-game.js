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

        startGame(cicleMemmory, cicle);
    });
});

function startGame(cicleMemmory, cicle) {
    let i = 0;
    while (cicle > 0) {
        let num = cicleMemmory[i];
        i++;

        if (num == 1) {
            document.getElementById('red-button').style.backgroundColor = 'red';
            setTimeout(function () {
                document.getElementById('red-button').style.backgroundColor = ''
            }, 500);
        } else {
            if (num == 2) {
                document.getElementById('blue-button').style.backgroundColor = 'blue';
                setTimeout(function () {
                    document.getElementById('blue-button').style.backgroundColor = ''
                }, 500);

            } else {
                if (num == 3) {
                    document.getElementById('green-button').style.backgroundColor = 'green';
                    setTimeout(function () {
                        document.getElementById('green-button').style.backgroundColor = ''
                    }, 500);

                } else {
                    if (num == 4) {
                        document.getElementById('yellow-button').style.backgroundColor = 'yellow';
                        setTimeout(function () {
                            document.getElementById('yellow-button').style.backgroundColor = ''
                        }, 500);

                    }
                }
            }
        }
        console.log(num);
        cicle--;
    }
}