/*jshint esversion: 6 */
//--------------------------------------------------------------------------------------\\
// Globar values used by multiple functions

var cycle = 0;
var cycleMemmory = [];
var gameOwer = 0;
var classic = true;
var reset = false;
var mode = false;

//--------------------------------------------------------------------------------------\\


//--------------------------------------------------------------------------------------\\
// Waiting for all DOM content to load to star using game functions

document.addEventListener('DOMContentLoaded', function () {
    startClick();
    highscoreBoardLoad();
    resetGame();
    modeSwich();
});

//--------------------------------------------------------------------------------------\\


//--------------------------------------------------------------------------------------\\
// Reseting the global values
// Waiting for the user to start the game by pressing start button
// For big and small screens

function startClick() {
    document.getElementById('current-score-big').style.fontSize = '36px';
    document.getElementById('current-score-big').innerHTML = 'START';

    document.getElementById('small-current-score').style.fontSize = '16px';
    document.getElementById('small-current-score').innerHTML = 'START';

    cycle = 0;
    cycleMemmory = [];
    gameOwer = 0;
    enableStart();
    disableColors();
    $('#start-button').off().on('click', function () {
        disableStart();
        startGame();
        mode = false;
        document.getElementById('current-score-big').innerHTML = '0';
        document.getElementById('small-current-score').innerHTML = '0';
        document.getElementById('current-score-big').style.fontSize = '';
        document.getElementById('small-current-score').style.fontSize = '';
    });
    $('#small-start-button').off().on('click', function () {
        disableStart();
        startGame();
        mode = false;
        document.getElementById('current-score-big').innerHTML = '0';
        document.getElementById('small-current-score').innerHTML = '0';
        document.getElementById('current-score-big').style.fontSize = '';
        document.getElementById('small-current-score').style.fontSize = '';
    });
}

//--------------------------------------------------------------------------------------\\


//--------------------------------------------------------------------------------------\\
// Resets the game ant any stage

function resetGame() {
    $('#reset-button').off().on('click', function () {
        cycle = 0;
        cycleMemmory = [];
        gameOwer = 0;
        reset = false;
        document.getElementById('current-score-big').innerHTML = 'START';
        document.getElementById('small-current-score').innerHTML = 'START';
        startClick();
    });
}

//--------------------------------------------------------------------------------------\\


//--------------------------------------------------------------------------------------\\
// Button disable and enable functions
// Disables start buttons for big and small screens

function disableStart() {
    document.getElementById('start-button').style.backgroundColor = 'white';
    document.getElementById('start-button').style.color = 'black';
    document.getElementById('start-button').setAttribute('disabled', 'true');

    document.getElementById('small-start-button').style.backgroundColor = 'white';
    document.getElementById('small-start-button').style.color = 'black';
    document.getElementById('small-start-button').setAttribute('disabled', 'true');
}

// Enable start buttons for big and small screens

function enableStart() {
    document.getElementById('start-button').style.backgroundColor = '';
    document.getElementById('start-button').style.color = '';
    document.getElementById('start-button').removeAttribute('disabled');

    document.getElementById('small-start-button').style.backgroundColor = '';
    document.getElementById('small-start-button').style.color = '';
    document.getElementById('small-start-button').removeAttribute('disabled');
}

// Disable color buttons for big and small screens

function disableColors() {
    document.getElementById('red-button').style.pointerEvents = 'none';
    document.getElementById('blue-button').style.pointerEvents = 'none';
    document.getElementById('green-button').style.pointerEvents = 'none';
    document.getElementById('yellow-button').style.pointerEvents = 'none';

    document.getElementById('small-red-button').style.pointerEvents = 'none';
    document.getElementById('small-blue-button').style.pointerEvents = 'none';
    document.getElementById('small-green-button').style.pointerEvents = 'none';
    document.getElementById('small-yellow-button').style.pointerEvents = 'none';
}

// Enables color buttons for big and small screens

function enableColors() {
    document.getElementById('red-button').style.pointerEvents = 'auto';
    document.getElementById('blue-button').style.pointerEvents = 'auto';
    document.getElementById('green-button').style.pointerEvents = 'auto';
    document.getElementById('yellow-button').style.pointerEvents = 'auto';

    document.getElementById('small-red-button').style.pointerEvents = 'auto';
    document.getElementById('small-blue-button').style.pointerEvents = 'auto';
    document.getElementById('small-green-button').style.pointerEvents = 'auto';
    document.getElementById('small-yellow-button').style.pointerEvents = 'auto';
}

//--------------------------------------------------------------------------------------\\


//--------------------------------------------------------------------------------------\\
// Generates random numbers from 1 to 4 and counts cycles.
// For classic makes the pattern longer
// For extreme generates new longer pattern
// Send same color pattern if user makes a mistake

function startGame() {
    let randomNum = 0;

    if (gameOwer == 0) {
        if (classic == true) {
            randomNum = Math.floor(Math.random() * 4) + 1;
            cycleMemmory.push(randomNum);
            cycle++;
        } else {
            cycleMemmory = [];
            for (; cycle >= cycleMemmory.length;) {
                randomNum = Math.floor(Math.random() * 4) + 1;
                cycleMemmory.push(randomNum);
            }
            cycle++;
        }
    }
    colorPaternBlink();
}

//--------------------------------------------------------------------------------------\\


//--------------------------------------------------------------------------------------\\
// Blinks color in an order made by startGame function

function colorPaternBlink() {
    let blink = 0;

    disableColors();

    for (let i = 0; i < cycleMemmory.length; i++) {
        let colorNum = cycleMemmory[i];
        setTimeout(function () {
            if (colorNum == 1) {
                document.getElementById('red-button').style.backgroundColor = '#ff2b1c';
                document.getElementById('small-red-button').style.backgroundColor = '#ff2b1c';
                clickSound();
            }
            if (colorNum == 2) {
                document.getElementById('blue-button').style.backgroundColor = '#1ca0ff';
                document.getElementById('small-blue-button').style.backgroundColor = '#1ca0ff';
                clickSound();
            }
            if (colorNum == 3) {
                document.getElementById('green-button').style.backgroundColor = '#1cff91';
                document.getElementById('small-green-button').style.backgroundColor = '#1cff91';
                clickSound();
            }
            if (colorNum == 4) {
                document.getElementById('yellow-button').style.backgroundColor = '#fff41c';
                document.getElementById('small-yellow-button').style.backgroundColor = '#fff41c';
                clickSound();
            }
            setTimeout(function () {
                let colorBtn = document.getElementsByClassName('color-btn');
                colorBtn[colorNum - 1].style.backgroundColor = '';
                let colorBtnSmall = document.getElementsByClassName('small-color-btn');
                colorBtnSmall[colorNum - 1].style.backgroundColor = '';
                blink++;

                if (cycle == blink) {
                    colorClickBlink();
                }
            }, 500);
        }, 1000 * i);
    }
}

//--------------------------------------------------------------------------------------\\


//--------------------------------------------------------------------------------------\\
// Adds a sound to a blink

function clickSound() {
    let audio = document.getElementById('stomp');
    audio.play();
}

//--------------------------------------------------------------------------------------\\


//--------------------------------------------------------------------------------------\\
// Makes the color blink after a click
// Send color button value to patternCheck function
// Counts how manny clicks did the user made

function colorClickBlink() {
    let colorValue = 0;
    let click = 0;
    let colorPattern = [];

    if (mode == false) {
        enableColors();
    }

    if (mode == true) {
        cycle = 0;
        cycleMemmory = [];
    }

    $('#red-button').off().on('click', function () {
        document.getElementById('red-button').style.backgroundColor = '#ff2b1c';
        clickSound();
        colorValue = 1;
        colorPattern.push(colorValue);
        click++;
        patternCheck(colorPattern, click);
        setTimeout(function () {
            document.getElementById('red-button').style.backgroundColor = '';
        }, 150);
    });

    $('#blue-button').off().on('click', function () {
        document.getElementById('blue-button').style.backgroundColor = '#1ca0ff';
        clickSound();
        colorValue = 2;
        colorPattern.push(colorValue);
        click++;
        patternCheck(colorPattern, click);
        setTimeout(function () {
            document.getElementById('blue-button').style.backgroundColor = '';
        }, 150);
    });

    $('#green-button').off().on('click', function () {
        document.getElementById('green-button').style.backgroundColor = '#1cff91';
        clickSound();
        colorValue = 3;
        colorPattern.push(colorValue);
        click++;
        patternCheck(colorPattern, click);
        setTimeout(function () {
            document.getElementById('green-button').style.backgroundColor = '';
        }, 150);
    });

    $('#yellow-button').off().on('click', function () {
        document.getElementById('yellow-button').style.backgroundColor = '#fff41c';
        clickSound();
        colorValue = 4;
        colorPattern.push(colorValue);
        click++;
        patternCheck(colorPattern, click);
        setTimeout(function () {
            document.getElementById('yellow-button').style.backgroundColor = '';
        }, 150);
    });

    $('#small-red-button').off().on('click', function () {
        document.getElementById('small-red-button').style.backgroundColor = '#ff2b1c';
        clickSound();
        colorValue = 1;
        colorPattern.push(colorValue);
        click++;
        patternCheck(colorPattern, click);
        setTimeout(function () {
            document.getElementById('small-red-button').style.backgroundColor = '';
        }, 150);
    });

    $('#small-blue-button').off().on('click', function () {
        document.getElementById('small-blue-button').style.backgroundColor = '#1ca0ff';
        clickSound();
        colorValue = 2;
        colorPattern.push(colorValue);
        click++;
        patternCheck(colorPattern, click);
        setTimeout(function () {
            document.getElementById('small-blue-button').style.backgroundColor = '';
        }, 150);
    });

    $('#small-green-button').off().on('click', function () {
        document.getElementById('small-green-button').style.backgroundColor = '#1cff91';
        clickSound();
        colorValue = 3;
        colorPattern.push(colorValue);
        click++;
        patternCheck(colorPattern, click);
        setTimeout(function () {
            document.getElementById('small-green-button').style.backgroundColor = '';
        }, 150);
    });

    $('#small-yellow-button').off().on('click', function () {
        document.getElementById('small-yellow-button').style.backgroundColor = '#fff41c';
        clickSound();
        colorValue = 4;
        colorPattern.push(colorValue);
        click++;
        patternCheck(colorPattern, click);
        setTimeout(function () {
            document.getElementById('small-yellow-button').style.backgroundColor = '';
        }, 150);
    });
}

//--------------------------------------------------------------------------------------\\


//--------------------------------------------------------------------------------------\\
// Checks if the player is clicking colors in the right pattern
// If it is in the right order start a new cycle
// If it is in the wrong order marks game over

function patternCheck(valueCheck, click) {
    if (cycleMemmory[click - 1] == valueCheck[click - 1]) {
        if (cycleMemmory.length == click && gameOwer == 0) {
            currentScore();
            disableColors();
            setTimeout(function () {
                gameOwer = 0;
                startGame();
            }, 1000);
        }
    } else {
        highscoreCheck();
        disableColors();
        gameOwer = 1;
        document.getElementById('start-button').style.backgroundColor = 'red';
        document.getElementById('start-button').style.color = 'white';
        document.getElementById('small-start-button').style.backgroundColor = 'red';
        document.getElementById('small-start-button').style.color = 'white';
        setTimeout(function () {
            startGame();
        }, 1000);
        setTimeout(function () {
            startClick();
        }, 1500 * cycle);
    }
}

//--------------------------------------------------------------------------------------\\


//--------------------------------------------------------------------------------------\\
// Functin to count curent games best score and display it in the middle
// of game area

function currentScore() {
    let scoreBg = parseInt(document.getElementById('current-score-big').innerHTML);
    document.getElementById('current-score-big').innerHTML = ++scoreBg;

    let scoreSm = parseInt(document.getElementById('small-current-score').innerHTML);
    document.getElementById('small-current-score').innerHTML = ++scoreSm;
}

//--------------------------------------------------------------------------------------\\


//--------------------------------------------------------------------------------------\\
// Swiches game modes between classic and extreme

function modeSwich() {

    document.getElementById('mode-button').addEventListener('click', function () {
        mode = true;
        if (classic == true) {
            document.getElementById('mode-button').innerHTML = 'Extriem';
            classic = false;
            startClick();
            resetGame();
        } else {
            document.getElementById('mode-button').innerHTML = 'Classic';
            classic = true;
            startClick();
            resetGame();
        }
    });

    document.getElementById('small-mode-button').addEventListener('click', function () {
        mode = true;
        if (classic == true) {
            document.getElementById('small-mode-button').innerHTML = 'Extriem';
            classic = false;
            startClick();
        } else {
            document.getElementById('small-mode-button').innerHTML = 'Classic';
            classic = true;
            startClick();
        }
    });
}

//--------------------------------------------------------------------------------------\\


//--------------------------------------------------------------------------------------\\
// Logs, checks and saves high scores made by the user
// Saves best 5 scores for eache mode in local storege
// Also saves user names
// Classic and extreme modes are loge separatly

function highscoreCheck() {
    let scoreBg = parseInt(document.getElementById('current-score-big').innerHTML);

    let claName = [];
    let clasickName = document.getElementsByClassName('highscore-classic-name');
    for (let i = 0; i < clasickName.length; i++) {
        claName.push(clasickName[i].innerHTML);
    }

    let classicScores = [];
    let clasickHighscore = document.getElementsByClassName('highscore-classic-score');
    for (let i = 0; i < clasickHighscore.length; i++) {
        classicScores.push(clasickHighscore[i].innerHTML);
    }

    if (classic == true) {
        if (scoreBg > classicScores[0]) {
            clasickHighscore[4].innerHTML = classicScores[3];
            clasickHighscore[3].innerHTML = classicScores[2];
            clasickHighscore[2].innerHTML = classicScores[1];
            clasickHighscore[1].innerHTML = classicScores[0];
            clasickHighscore[0].innerHTML = scoreBg;

            clasickName[4].innerHTML = claName[3];
            clasickName[3].innerHTML = claName[2];
            clasickName[2].innerHTML = claName[1];
            clasickName[1].innerHTML = claName[0];

            localStorage.setItem('classickNr5Score', classicScores[3]);
            localStorage.setItem('classickNr4Score', classicScores[2]);
            localStorage.setItem('classickNr3Score', classicScores[1]);
            localStorage.setItem('classickNr2Score', classicScores[0]);
            localStorage.setItem('classickNr1Score', scoreBg);

            localStorage.setItem('classickNr5Name', claName[4]);
            localStorage.setItem('classickNr4Name', claName[3]);
            localStorage.setItem('classickNr3Name', claName[2]);
            localStorage.setItem('classickNr2Name', claName[1]);

            let person = prompt('You got a highscore. Enter your name', 'Anonimus');
            if (person == null || person == "") {
                clasickName[0].innerHTML = 'Anonimus';
                localStorage.setItem('classickNr1Name', 'Anonimus');
            } else {
                clasickName[0].innerHTML = person;
                localStorage.setItem('classickNr1Name', person);
            }
        } else if (scoreBg > classicScores[1]) {
            clasickHighscore[4].innerHTML = classicScores[3];
            clasickHighscore[3].innerHTML = classicScores[2];
            clasickHighscore[2].innerHTML = classicScores[1];
            clasickHighscore[1].innerHTML = scoreBg;

            clasickName[4].innerHTML = claName[4];
            clasickName[3].innerHTML = claName[2];
            clasickName[2].innerHTML = claName[1];

            localStorage.setItem('classickNr5Score', classicScores[3]);
            localStorage.setItem('classickNr4Score', classicScores[2]);
            localStorage.setItem('classickNr3Score', classicScores[1]);
            localStorage.setItem('classickNr2Score', scoreBg);

            localStorage.setItem('classickNr5Name', claName[4]);
            localStorage.setItem('classickNr4Name', claName[3]);
            localStorage.setItem('classickNr3Name', claName[2]);

            let person = prompt('You got a highscore. Enter your name', 'Anonimus');
            if (person == null || person == "") {
                clasickName[1].innerHTML = 'Anonimus';
                localStorage.setItem('classickNr2Name', 'Anonimus');
            } else {
                clasickName[1].innerHTML = person;
                localStorage.setItem('classickNr2Name', person);
            }
        } else {
            if (scoreBg > classicScores[2]) {
                clasickHighscore[4].innerHTML = classicScores[3];
                clasickHighscore[3].innerHTML = classicScores[2];
                clasickHighscore[2].innerHTML = scoreBg;

                clasickName[4].innerHTML = claName[4];
                clasickName[3].innerHTML = claName[2];

                localStorage.setItem('classickNr5Score', classicScores[3]);
                localStorage.setItem('classickNr4Score', classicScores[2]);
                localStorage.setItem('classickNr3Score', scoreBg);

                localStorage.setItem('classickNr5Name', claName[4]);
                localStorage.setItem('classickNr4Name', claName[3]);

                let person = prompt('You got a highscore. Enter your name', 'Anonimus');
                if (person == null || person == "") {
                    clasickName[2].innerHTML = 'Anonimus';
                    localStorage.setItem('classickNr3Name', 'Anonimus');
                } else {
                    clasickName[2].innerHTML = person;
                    localStorage.setItem('classickNr3Name', person);
                }
            } else {
                if (scoreBg > classicScores[3]) {
                    clasickHighscore[4].innerHTML = classicScores[3];
                    clasickHighscore[3].innerHTML = scoreBg;

                    clasickName[4].innerHTML = claName[4];

                    localStorage.setItem('classickNr5Score', classicScores[3]);
                    localStorage.setItem('classickNr4Score', scoreBg);

                    localStorage.setItem('classickNr5Name', claName[4]);

                    let person = prompt('You got a highscore. Enter your name', 'Anonimus');
                    if (person == null || person == "") {
                        clasickName[3].innerHTML = 'Anonimus';
                        localStorage.setItem('classickNr4Name', 'Anonimus');
                    } else {
                        clasickName[3].innerHTML = person;
                        localStorage.setItem('classickNr4Name', person);
                    }
                } else {
                    if (scoreBg > classicScores[4]) {
                        clasickHighscore[4].innerHTML = scoreBg;

                        localStorage.setItem('classickNr5Score', scoreBg);

                        let person = prompt('You got a highscore. Enter your name', 'Anonimus');
                        if (person == null || person == "") {
                            clasickName[4].innerHTML = 'Anonimus';
                            localStorage.setItem('classickNr5Name', 'Anonimus');
                        } else {
                            clasickName[4].innerHTML = person;
                            localStorage.setItem('classickNr5Name', person);
                        }
                    }
                }
            }
        }
    }

    let extName = [];
    let extriemName = document.getElementsByClassName('highscore-extriem-name');
    for (let i = 0; i < extriemName.length; i++) {
        extName.push(extriemName[i].innerHTML);
    }

    let extriemScores = [];
    let extriemHighscore = document.getElementsByClassName('highscore-extriem-score');
    for (let i = 0; i < extriemHighscore.length; i++) {
        extriemScores.push(extriemHighscore[i].innerHTML);
    }

    if (classic == false) {
        if (scoreBg > extriemScores[0]) {
            extriemHighscore[4].innerHTML = extriemScores[3];
            extriemHighscore[3].innerHTML = extriemScores[2];
            extriemHighscore[2].innerHTML = extriemScores[1];
            extriemHighscore[1].innerHTML = extriemScores[0];
            extriemHighscore[0].innerHTML = scoreBg;

            extriemName[4].innerHTML = extName[3];
            extriemName[3].innerHTML = extName[2];
            extriemName[2].innerHTML = extName[1];
            extriemName[1].innerHTML = extName[0];

            localStorage.setItem('extriemNr5Score', extriemScores[3]);
            localStorage.setItem('extriemNr4Score', extriemScores[2]);
            localStorage.setItem('extriemNr3Score', extriemScores[1]);
            localStorage.setItem('extriemNr2Score', extriemScores[0]);
            localStorage.setItem('extriemNr1Score', scoreBg);

            localStorage.setItem('extriemNr5Name', claName[4]);
            localStorage.setItem('extriemNr4Name', claName[3]);
            localStorage.setItem('extriemNr3Name', claName[2]);
            localStorage.setItem('extriemNr2Name', claName[1]);

            let person = prompt('You got a highscore. Enter your name', 'Anonimus');
            if (person == null || person == "") {
                extriemName[0].innerHTML = 'Anonimus';
                localStorage.setItem('extriemNr1Name', 'Anonimus');
            } else {
                extriemName[0].innerHTML = person;
                localStorage.setItem('extriemNr1Name', person);
            }
        } else if (scoreBg > extriemScores[1]) {
            extriemHighscore[4].innerHTML = extriemScores[3];
            extriemHighscore[3].innerHTML = extriemScores[2];
            extriemHighscore[2].innerHTML = extriemScores[1];
            extriemHighscore[1].innerHTML = scoreBg;

            extriemName[4].innerHTML = extName[4];
            extriemName[3].innerHTML = extName[2];
            extriemName[2].innerHTML = extName[1];

            localStorage.setItem('extriemNr5Score', extriemScores[3]);
            localStorage.setItem('extriemNr4Score', extriemScores[2]);
            localStorage.setItem('extriemNr3Score', extriemScores[1]);
            localStorage.setItem('extriemNr2Score', scoreBg);

            localStorage.setItem('extriemNr5Name', claName[4]);
            localStorage.setItem('extriemNr4Name', claName[3]);
            localStorage.setItem('extriemNr3Name', claName[2]);

            let person = prompt('You got a highscore. Enter your name', 'Anonimus');
            if (person == null || person == "") {
                extriemName[1].innerHTML = 'Anonimus';
                localStorage.setItem('extriemNr2Name', 'Anonimus');
            } else {
                extriemName[1].innerHTML = person;
                localStorage.setItem('extriemNr2Name', person);
            }
        } else {
            if (scoreBg > extriemScores[2]) {
                extriemHighscore[4].innerHTML = extriemScores[3];
                extriemHighscore[3].innerHTML = extriemScores[2];
                extriemHighscore[2].innerHTML = scoreBg;

                extriemName[4].innerHTML = extName[4];
                extriemName[3].innerHTML = extName[2];

                localStorage.setItem('extriemNr5Score', extriemScores[3]);
                localStorage.setItem('extriemNr4Score', extriemScores[2]);
                localStorage.setItem('extriemNr3Score', scoreBg);

                localStorage.setItem('extriemNr5Name', claName[4]);
                localStorage.setItem('extriemNr4Name', claName[3]);

                let person = prompt('You got a highscore. Enter your name', 'Anonimus');
                if (person == null || person == "") {
                    extriemName[2].innerHTML = 'Anonimus';
                    localStorage.setItem('extriemNr3Name', 'Anonimus');
                } else {
                    extriemName[2].innerHTML = person;
                    localStorage.setItem('extriemNr3Name', person);
                }
            } else {
                if (scoreBg > extriemScores[3]) {
                    extriemHighscore[4].innerHTML = extriemScores[3];
                    extriemHighscore[3].innerHTML = scoreBg;

                    extriemName[4].innerHTML = extName[4];

                    localStorage.setItem('extriemNr5Score', extriemScores[3]);
                    localStorage.setItem('extriemNr4Score', scoreBg);

                    localStorage.setItem('extriemNr5Name', claName[4]);

                    let person = prompt('You got a highscore. Enter your name', 'Anonimus');
                    if (person == null || person == "") {
                        extriemName[3].innerHTML = 'Anonimus';
                        localStorage.setItem('extriemNr4Name', 'Anonimus');
                    } else {
                        extriemName[3].innerHTML = person;
                        localStorage.setItem('extriemNr4Name', person);
                    }
                } else {
                    if (scoreBg > extriemScores[4]) {
                        extriemHighscore[4].innerHTML = scoreBg;

                        localStorage.setItem('extriemNr5Score', scoreBg);

                        let person = prompt('You got a highscore. Enter your name', 'Anonimus');
                        if (person == null || person == "") {
                            extriemName[4].innerHTML = 'Anonimus';
                            localStorage.setItem('extriemNr5Name', 'Anonimus');
                        } else {
                            extriemName[4].innerHTML = person;
                            localStorage.setItem('extriemNr5Name', person);
                        }
                    }
                }
            }
        }
    }
}

//--------------------------------------------------------------------------------------\\


//--------------------------------------------------------------------------------------\\
// On page load loads all the values from local storage to the highs score bord

function highscoreBoardLoad() {

    let classicResult1Name = localStorage.getItem('classickNr1Name');
    let classicResult2Name = localStorage.getItem('classickNr2Name');
    let classicResult3Name = localStorage.getItem('classickNr3Name');
    let classicResult4Name = localStorage.getItem('classickNr4Name');
    let classicResult5Name = localStorage.getItem('classickNr5Name');

    let classicResult1Score = localStorage.getItem('classickNr1Score');
    let classicResult2Score = localStorage.getItem('classickNr2Score');
    let classicResult3Score = localStorage.getItem('classickNr3Score');
    let classicResult4Score = localStorage.getItem('classickNr4Score');
    let classicResult5Score = localStorage.getItem('classickNr5Score');

    let clasickName = document.getElementsByClassName('highscore-classic-name');
    let clasickHighscore = document.getElementsByClassName('highscore-classic-score');

    if (classicResult1Name != '-' || classicResult1Name != 'undefined') {
        clasickName[0].innerHTML = classicResult1Name;
        clasickHighscore[0].innerHTML = classicResult1Score;
    }
    if (classicResult2Name != '-' || classicResult2Name != 'undefined') {
        clasickName[1].innerHTML = classicResult2Name;
        clasickHighscore[1].innerHTML = classicResult2Score;
    }
    if (classicResult3Name != '-' || classicResult3Name != 'undefined') {
        clasickName[2].innerHTML = classicResult3Name;
        clasickHighscore[2].innerHTML = classicResult3Score;
    }
    if (classicResult4Name != '-' || classicResult4Name != 'undefined') {
        clasickName[3].innerHTML = classicResult4Name;
        clasickHighscore[3].innerHTML = classicResult4Score;
    }
    if (classicResult5Name != '-' || classicResult5Name != 'undefined') {
        clasickName[4].innerHTML = classicResult5Name;
        clasickHighscore[4].innerHTML = classicResult5Score;
    }

    let extriemResult1Name = localStorage.getItem('extriemNr1Name');
    let extriemResult2Name = localStorage.getItem('extriemNr2Name');
    let extriemResult3Name = localStorage.getItem('extriemNr3Name');
    let extriemResult4Name = localStorage.getItem('extriemNr4Name');
    let extriemResult5Name = localStorage.getItem('extriemNr5Name');

    let extriemResult1Score = localStorage.getItem('extriemNr1Score');
    let extriemResult2Score = localStorage.getItem('extriemNr2Score');
    let extriemResult3Score = localStorage.getItem('extriemNr3Score');
    let extriemResult4Score = localStorage.getItem('extriemNr4Score');
    let extriemResult5Score = localStorage.getItem('extriemNr5Score');

    let extriemName = document.getElementsByClassName('highscore-extriem-name');
    let extriemHighscore = document.getElementsByClassName('highscore-extriem-score');

    if (extriemResult1Name != '-' || extriemResult1Name != 'undefined') {
        extriemName[0].innerHTML = extriemResult1Name;
        extriemHighscore[0].innerHTML = extriemResult1Score;
    }
    if (extriemResult2Name != '-' || extriemResult2Name != 'undefined') {
        extriemName[1].innerHTML = extriemResult2Name;
        extriemHighscore[1].innerHTML = extriemResult2Score;
    }
    if (extriemResult3Name != '-' || extriemResult3Name != 'undefined') {
        extriemName[2].innerHTML = extriemResult3Name;
        extriemHighscore[2].innerHTML = extriemResult3Score;
    }
    if (extriemResult4Name != '-' || extriemResult4Name != 'undefined') {
        extriemName[3].innerHTML = extriemResult4Name;
        extriemHighscore[3].innerHTML = extriemResult4Score;
    }
    if (extriemResult5Name != '-' || extriemResult5Name != 'undefined') {
        extriemName[4].innerHTML = extriemResult5Name;
        extriemHighscore[4].innerHTML = extriemResult5Score;
    }
}

//--------------------------------------------------------------------------------------\\