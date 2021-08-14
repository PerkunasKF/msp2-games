// Globar values used by multiple functions

var cycle = 0;
var cycleMemmory = [];
var gameOwer = 0;
var classic = true;

document.addEventListener('DOMContentLoaded', function () {
    console.log('Pakrautas');
    startClick();
    modeSwich();
})

function startClick() {
    cycle = 0;
    cycleMemmory = [];
    gameOwer = 0;
    enableStart();
    disableColors();
    $('#start-button').off().on('click', function () {
        disableStart();
        startGame();
        document.getElementById('current-score-big').innerHTML = '0';
    });
    $('#small-start-button').off().on('click', function () {
        disableStart();
        startGame();
        document.getElementById('current-score-big').innerHTML = '0';
    });
}

/*function startTutorial() {
    document.getElementById('turorial-icon').addEventListener('click', function () {
        document.getElementById('current-score-big').innerHTML = '';
        cycle = 0;
        cycleMemmory = [];
        gameOwer = 0;
        tutorial = true;
        redClick = false;
        blueClick = false;
        greenClick = false;
        disableStart();
        tutorialExplain();
    });
    document.getElementById('small-turorial-icon').addEventListener('click', function () {
        document.getElementById('current-score-big').innerHTML = '';
        cycle = 0;
        cycleMemmory = [];
        gameOwer = 0;
        tutorial = true;
        redClick = false;
        blueClick = false;
        greenClick = false;
        enableStart();
        AnimationIncres();
    });
}*/


// Disables start button

function disableStart() {
    document.getElementById('start-button').style.backgroundColor = 'white';
    document.getElementById('start-button').style.color = 'black';
    document.getElementById('start-button').setAttribute('disabled', 'true');

    document.getElementById('small-start-button').style.backgroundColor = 'white';
    document.getElementById('small-start-button').style.color = 'black';
    document.getElementById('small-start-button').setAttribute('disabled', 'true');
}

// Enable start button

function enableStart() {
    document.getElementById('start-button').style.backgroundColor = '';
    document.getElementById('start-button').style.color = '';
    document.getElementById('start-button').removeAttribute('disabled');

    document.getElementById('small-start-button').style.backgroundColor = '';
    document.getElementById('small-start-button').style.color = '';
    document.getElementById('small-start-button').removeAttribute('disabled');
    //document.getElementById('start-button').removeAttribute("disabled");
    //$(`#start-button`).prop('disabled', false);
    //document.getElementById('start-button').removeAttribute('disabled');
    //$('#start-button').prop('disabled', false);
}

// Disable color buttons

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

// Enables color buttons

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

// Generates random numbers from 1 to 4 and counts cycles.

function startGame() {
    let randomNum = 0;
    console.log(classic);

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

    //Test
    console.log('------------------------')
    console.log('Ciklas - ' + cycle);
    console.log('Naujas skaitmuo - ' + randomNum);
    console.log('Skaiciu seka - ' + cycleMemmory);

    colorPaternBlink();
}

// Blinks color in a random order

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

// Adds a sound to a blink

function clickSound() {
    let audio = document.getElementById('stomp');
    audio.play();
}

// Makes the color blink after a click

function colorClickBlink() {
    let colorValue = 0;
    let click = 0;
    let colorPattern = [];

    enableColors();

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

// Checks if the player is clicking colors in the right pattern

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
        highScore();
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

// Functin to count curent games best performance

function currentScore() {
    let scoreBg = parseInt(document.getElementById('current-score-big').innerHTML);
    document.getElementById('current-score-big').innerHTML = ++scoreBg;

    let scoreSm = parseInt(document.getElementById('small-current-score').innerHTML);
    document.getElementById('small-current-score').innerHTML = ++scoreSm;
}

// Function to log highes score made

function highScore() {
    let scoreBg = parseInt(document.getElementById('current-score-big').innerHTML);
    let highscoreBg = parseInt(document.getElementById('high-score-big').innerHTML);
    if (highscoreBg < scoreBg) {
        document.getElementById('high-score-big').innerHTML = scoreBg;
    }

    let highscoreSm = parseInt(document.getElementById('small-high-score').innerHTML);
    if (highscoreSm < scoreBg) {
        document.getElementById('small-high-score').innerHTML = scoreBg;
    }
    console.log(highscoreSm);
}

function modeSwich() {

    document.getElementById('mode-button').addEventListener('click', function () {
        if (classic == true) {
            document.getElementById('mode-button').innerHTML = 'Extriem';
            classic = false;
            startClick();
        } else {
            document.getElementById('mode-button').innerHTML = 'Classic';
            classic = true;
            startClick();
        }
    });

    document.getElementById('small-mode-button').addEventListener('click', function () {
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

// Blinks start button for the tutorial

/*function AnimationIncres() {
    disableStartBlink = false;

    for (let i = 0; i < 1000; i++) {
        setTimeout(function () {
            if (tutorial == true) {
                $('#start-button').off().on('click', function () {
                    disableStartBlink = true;
                    turorialColorBlink();
                    disableStart();
                });
                $('#small-start-button').off().on('click', function () {
                    disableStartBlink = true;
                    turorialColorBlink();
                    disableStart();
                });
            }
            if (Number.isInteger(i / 2) && disableStartBlink == false) {
                document.getElementById('start-button').style.borderColor = '#fff';
                document.getElementById('small-start-button').style.borderColor = '#fff';
            } else {
                if (disableStartBlink == false)
                    document.getElementById('start-button').style.borderColor = '';
                    document.getElementById('small-start-button').style.borderColor = '';
            }
        }, 400 * i);
    }
}

function turorialColorBlink() {
    let colorNum = ['1', '2', '3'];
    let colorRepeat = false;
    let button = 1;

    document.getElementById('start-button').style.borderColor = '';
    document.getElementById('small-start-button').style.borderColor = '';

    for (let i = 0; i < colorNum.length; ++i) {
        setTimeout(function () {
            if (colorNum[i] == 1) {
                document.getElementById('red-button').style.backgroundColor = '#ff2b1c';
                document.getElementById('small-red-button').style.backgroundColor = '#ff2b1c';
                clickSound();
            }
            if (colorNum[i] == 2) {
                document.getElementById('blue-button').style.backgroundColor = '#1ca0ff';
                document.getElementById('small-blue-button').style.backgroundColor = '#1ca0ff';
                clickSound();
            }
            if (colorNum[i] == 3) {
                document.getElementById('green-button').style.backgroundColor = '#1cff91';
                document.getElementById('small-green-button').style.backgroundColor = '#1cff91';
                clickSound();
            }
            setTimeout(function () {
                let colorBtn = document.getElementsByClassName('color-btn');
                colorBtn[i].style.backgroundColor = '';
                let colorBtnSmall = document.getElementsByClassName('small-color-btn');
                colorBtnSmall[i].style.backgroundColor = '';
                if (colorNum[i] == 3) {
                    colorRepeat = true;
                    if (colorRepeat == true) {
                        enableColors();
                        colorClickBlink();
                        for (let i = 0; i < 1000; i++) {
                            if (tutorial == true) {
                                setTimeout(function () {
                                    console.log(i);
                                    let inte = Number.isInteger(i / 2);
                                    if (inte == true && button == 1 && redClick == false) {
                                        document.getElementById('red-button').style.borderColor = '#fff';
                                        document.getElementById('small-red-button').style.borderColor = '#fff';
                                    } else {
                                        if (inte == false && redClick == false) {
                                            document.getElementById('red-button').style.borderColor = '';
                                            document.getElementById('small-red-button').style.borderColor = '';
                                        }
                                    }
                                    if (inte == true && button == 3 && blueClick == false) {
                                        document.getElementById('blue-button').style.borderColor = '#fff';
                                        document.getElementById('small-blue-button').style.borderColor = '#fff';
                                    } else {
                                        if (inte == false && blueClick == false) {
                                            document.getElementById('blue-button').style.borderColor = '';
                                            document.getElementById('small-blue-button').style.borderColor = '';
                                        }
                                    }
                                    if (inte == true && button == 5 && greenClick == false) {
                                        document.getElementById('green-button').style.borderColor = '#fff';
                                        document.getElementById('small-green-button').style.borderColor = '#fff';
                                    } else {
                                        if (inte == false && greenClick == false) {
                                            document.getElementById('green-button').style.borderColor = '';
                                            document.getElementById('small-green-button').style.borderColor = '';
                                        }
                                    }
                                    button++;
                                    if (button == 6) {
                                        button = 1;
                                    }
                                }, 500 * i);
                            }
                        }
                    }
                }
            }, 500);
        }, 1000 * i);
    }
}

function turorialCheck(valueCheck, click) {
    let buttonPattern = ['1', '2', '3'];
    if (buttonPattern[click - 1] == valueCheck[click - 1]) {
        setTimeout(function () {
            if (valueCheck[click - 1] == 1) {
                redClick = true;
            }
            if (valueCheck[click - 1] == 2) {
                blueClick = true;
            }
            if (valueCheck[click - 1] == 3) {
                greenClick = true;
                location.reload();
            }
        }, 500);
    }
}*/

// --------------------------------------------------------------------

/*var gameOwer = 0;
var cycle = 0;
var cycleMemmory = [];

document.addEventListener('DOMContentLoaded', function () {
    $('#start-button').off().on('click', function () {
        document.getElementById('start-button').style.backgroundColor = 'grey';
        disableStart();
        setTimeout(function () {
            startGame();
        }, 500);
    });
});


// Disables start button

function disableStart() {
    $("#start-button").click(function () {
        document.getElementById('start-button').style.pointerEvents = 'none';
    });
}

function disableColors() {
    $("#red-button").click(function () {
        document.getElementById('red-button').style.pointerEvents = 'none';
    });
    $("#blue-button").click(function () {
        document.getElementById('blue-button').style.pointerEvents = 'none';
    });
    $("#green-button").click(function () {
        document.getElementById('green-button').style.pointerEvents = 'none';
    });
    $("#yellow-button").click(function () {
        document.getElementById('yellow-button').style.pointerEvents = 'none';
    });
}

function startGame() {
    console.log(gameOwer);

    let blink = 0;

    //Random number from 1 to 4 generator and cycle counter
    let randomNum = Math.floor(Math.random() * 4) + 1;
    if (gameOwer == 0) {
        cycleMemmory.push(randomNum);
        cycle++;
    }

    //Testing console.log outputs
    console.log('------');
    console.log('Ciklas - ' + cycle)
    console.log('Naujas skaicius - ' + cycleMemmory[cycle - 1]);
    console.log('Saiciu seka - ' + cycleMemmory);
    if (gameOwer == 0) {
        console.log('Zaidimas tesiasi');
    } else(console.log('Zaidimas baigtas'));

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
                    colorClickBlink();
                }
            }, 500);
        }, 1000 * i);
    }
}

//  Function for button color change after click

function colorClickBlink() {
    let buttonValue = 0;
    let valueCheck = [];
    let click = 0;

    $('#red-button').off().on('click', function () {
        document.getElementById('red-button').style.backgroundColor = '#ff2b1c';
        clickSound();
        setTimeout(function () {
            document.getElementById('red-button').style.backgroundColor = '';
        }, 150);
        buttonValue = 1;
        click++;
        valueCheck.push(buttonValue);
        patternCheck(valueCheck, click);
    });

    $('#blue-button').off().on('click', function () {
        document.getElementById('blue-button').style.backgroundColor = '#1ca0ff';
        clickSound()
        setTimeout(function () {
            document.getElementById('blue-button').style.backgroundColor = '';
        }, 150);
        buttonValue = 2;
        click++;
        valueCheck.push(buttonValue);
        patternCheck(valueCheck, click);
    });

    $('#green-button').off().on('click', function () {
        document.getElementById('green-button').style.backgroundColor = '#1cff91';
        clickSound()
        setTimeout(function () {
            document.getElementById('green-button').style.backgroundColor = '';
        }, 150);
        buttonValue = 3;
        click++;
        valueCheck.push(buttonValue);
        patternCheck(valueCheck, click);
    });

    $('#yellow-button').off().on('click', function () {
        document.getElementById('yellow-button').style.backgroundColor = '#fff41c';
        clickSound()
        setTimeout(function () {
            document.getElementById('yellow-button').style.backgroundColor = '';
        }, 150);
        buttonValue = 4;
        click++;
        valueCheck.push(buttonValue);
        patternCheck(valueCheck, click);
    });
}

// Function to check if the player is clicking the color patern correctly

function patternCheck(valueCheck, click) {
    if (cycleMemmory[click - 1] == valueCheck[click - 1]) {
        if (cycleMemmory.length == click && gameOwer == 0) {
            //currentScore();
            disableColors();
            setTimeout(function () {
                gameOwer = 0;
                startGame();
            }, 750);
        }
    } else {
        //highScore();
        disableColors();
        gameOwer = 1;
        setTimeout(function () {
            startGame();
        }, 750);
    }
}

function clickSound() {
    let audio = document.getElementById('stomp');
    audio.play();
}

// ------------------------------------------------------------------------

/*
// Start the function after the DOM content is fully loaded.
// Counts cycles and cycle number pater, check if the start game button is presst.

document.addEventListener('DOMContentLoaded', function () {
    //document.querySelectorAll('.color-btn').forEach(colorBtn => {
    //    colorBtn.disabled = true;
    //});
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
                    //document.querySelectorAll('.color-btn').forEach(colorBtn => {
                    //    colorBtn.disabled = false;
                    //});
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
}

function enableStart () {
    
}

function disableStart () {
    
}

function enableColors () {
    
}

function disableColor () {
    
}
*/