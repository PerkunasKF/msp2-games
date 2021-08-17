<h1 align="center">
  Simon Says Solor Game
</h1>
  
<h2 align="center">
  How long can you go!?
</h2>
  
<div align="center">
  Simon says color game is a memory game in which player follows the color pattern that is shown. After each correctly followed round the color patter gets longer and longer: how long will you go?

[View the live project here](https://perkunaskf.github.io/msp2-games/)

</div>

## Table of contents
1. [UX](#UX)
    1. [Project Goals](#Project-Goals)
    2. [User Stories](#User-Stories)
    3. [Development Planes](#Development-Planes)
2. [Features](#Features)
3. [Issues and Bugs](#Issues-and-Bugs)
4. [Technologies Used](#Technologies-Used)
     1. [Main Languages Used](#Main-Languages-Used)
     2. [Frameworks, Libraries & Programs Used](#Frameworks-Libraries-&-Programs-Used)
5. [Testing](#Testing) ☞ **[Testing.md](TESTING.md)**
6. [Deployment](#Deployment)
     1. [Deploying on GitHub Pages](#Deploying-on-GitHub-Pages)
     2. [Forking the Repository](#Forking-the-Repository)
     3. [Creating a Clone](#Creating-a-Clone)
7. [Credits](#Credits)
     1. [Audio](#Audio) ☞ **[Credits.md](CREDITS.md)**
     2. [Code](#Code)
8. [Acknowledgements](#Acknowledgements)
***

![Blank! Responsiveness]responsivnes mock up image

***

## UX 
### Project Goals
The primary goal of "Simon Says Color Game" is to provide a web-based interactive game that is entertaining and usis the original "Simon (game)" made by: Ralph H. Baer and Howard J. Morrison. Gamme is designe to test and train players memmory skills.

This is the second of four Milestone Projects that the developer must complete during their Full Stack Web Development Program at The Code Institute. 

The main requirements were to design, develop and implement a dynamic front-end web application using **HTML5**, **CSS3** and **JavaScript**.

#### Player Goals
The player is looking for:
- A fun game to play.
- Instructions on how to play the game.
- An intuitive interface.
- A track of their achievements in the game.

#### Developer Goals
The Developer is looking to:
- Create a fun game to pass the time.
- Demonstrate their skills in software development, using newly learned languages and libraries.
- Deploy a project on their portfolio.

### User Stories
**As a player, I want to:**

1. Intuitive controls.
2. Have a score counter and a high score board to see how well am I doing.
3. Get a visual feedback to see when the game starts and when it is over.
4. Provide feedback to the developer to improve the game.
5. Get easy to find and understand instruction on how to play the game.

### Development Planes

To create and design a web-based interactive game, the developer distinguished the necessary functionality of the game and how it would answer to the user stories:

<strong>1. <u>Strategy</u></strong>

Broken into two categories, the website will focus on the following target audiences:
- **Roles:**
     - New Players
     - Current Players
     - Returning Players

- **Demographic:**
     - Chalenge lovers
     - Age 5 years and up

The website needs to enable the **user** to:
- Find instructions with ease
- Choose their preferred game mode
- Be able to see theirs or someone else high score
- Provide feedback to the developer

With these goals in mind, a strategy table was created:

![Strategy Table] Strategijos lentele

<strong>2. <u>Scope</u></strong>

A scope was defined to clearly identify what needed to be done to align features with the strategy:
- **Content Requirements**
     - The user will be looking for:
          - Easy to find instruction
          - Current accumulated score
          - High score board
          - Appealing game environment
- **Functionality Requirements**
     - The user will be able to:
          - Responsive game design
          - Clearly defined interactive elements
          - Clearly define game area
          - Toggle between game modes
          - Send feedback to the developer

<strong>3. <u>Structure</u></strong>

The entire game was fitted in one page for ease of use and all information is easily reached true the main page. The **hierarchial tree structure**:

![Site Map] Prideti informacijos medi

<strong>4. <u>Skeleton</u></strong>

Wireframe mockup was created in a [Figma Workspace](https://www.figma.com/file/vt1vlEaqolTvRzSvSoxpvp/Color-Game?node-id=0%3A1 "Link to Blank! Figma Workspace"). The original design was not kept because it provided to high on a screen so some of the information was not usable. Also the design was too plain and not as appealing.

     ![Main Page] Prideti modelio paveiksla

[Back to top ⇧](#table-of-contents)

## Features
All features are responsive and intuitive:
- **Reset** - On the top left corner there is an icon witch will reset the game any time the player wishes.
- **Tutorial** - On the top right corner there is an icon witch will open tutorial container with the game instructions and other game features.
- **Start/Score/Game Over** - In the middle of the screen there is the game area with four colors and the start, start button changes into the current score holder after the game starts. And changes into the game over indicator after the player make a mistake.
- **Classic/Extreme** - On the left side of the screen there is a mode button after click the game mode changes from classic to extreme.
- **High score** - On the right side of the screen there is a better high score achieved indicator also functions as a button to open high score board.
- **Feedback** - On the bottom left corner there is and icon which will open feedback forum after clicking it.

[Back to top ⇧](#table-of-contents)

## Issues and Bugs 
The developer ran into a number of issues during the development of the game, with the noteworthy ones listed below, along with solutions.

**All color blink at once** - At the early stages of the game development, developer ran into a bug where all colors blink at once. The console log testing message was showing the correct number pattern (every color had a number assigned for faster bug tracking), But the color would flash at once. A solution was found on https://stackoverflow.com/ (Also new feature learned). The code is going fast and so the color seem to blink at the same time, by adding **setTimeout** functions to the for loop developer manage to get all the color to blink in 0,5 s intervals.

**Same color patter blink only once** - After getting the same color in a row, more than once, the color only blinks ones. The solution was to add a **setTimeout** function after the entire loop, seen the color blink starts without a pause. Now, after each blink there is a 0.5 s delay before the color blink.

**Answer Eco** - After clicking the color button you would get multiple same values. A solution was found on https://stackoverflow.com/. Add a Jquarry functionality to the button witch would save only one click and send only one value ($('#id').off().on()('click', function(){})).

**After wrong answer double patter** - After clicking the wrong color two color patterns would start. The problem was that game start function would start simultaneously at the game over pattern. Simply adding one extra if statement fixed this problem.

**Sound not playing on a hosted page** - While implementing a sound for color blinks, a bug occurred where there was no sound on the hosted page, but he previews page was playing the sound. After careful inspection of the code problem was found on the directory link, there was one extra '/' at the beginning of the directory ink.

**After mistake Start button not clickable** - After game over palter the start button would not reset and be clickable again. The problem was in the index.html file. The button was put inside the red button div witch is disabled before the start of the game. So after disabling the div the start button would become disabled as well. Moved the start button to it own container, that fixed the problem.

**Game loads on top of the screen** - In higher screen game would load on top of the screen. The solution was to make a container witch was fixed to the middle of the screen and put all of the content inside the container.

