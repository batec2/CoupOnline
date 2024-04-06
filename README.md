# CoupOnline
<img width="1420" alt="Screenshot3" src="https://github.com/batec2/CoupOnline/assets/134631360/90453df8-ea55-4c0e-8725-87e8500640b6">
<br>
CoupOnline is a web application version of the popular card game Coup. It has been developed using Vite React for the frontend, Express Node.js for the backend, and MongoDB for the database. Utilizes socket.io to facilitate communication between users and frontend. Uses cookies to remember user information.

## Index

- [CoupOnline](#couponline)
  - [Index](#index)
  - [Link to Deployment](#link-to-deployment)
  - [Gameplay](#gameplay)
    - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Additional Features (Future Implementations)](#additional-features-future-implementations)
  - [Screenshots](#screenshots)
  - [Installation on local machine](#installation-on-local-machine)

## Link to Deployment

[Coup Online](https://batec2.github.io/CoupOnline/)
The backend spins down when not in use, and takes about a minute to spin up before login or create account button presses are processed.

## Gameplay

CoupOnline follows the rules of the original card game Coup.

[Rules](https://www.qugs.org/rules/r131357.pdf)

### Features

- **Rooms:** Players can enter a room code and connect with others.
- **Usernames:** Players can select custom usernames when they enter the game.
- **Global Leaderboard** Players can see a global statistics.
- **Player Accounts/Profiles** Players can access their own records.
- **Gameplay Log** Players can see logs of each users turn.

## Technologies Used

- **Express Node.js**
- **React Vite**
- **MongoDB**
- **Socket.IO**

## Additional Features (Future Implementations)

- **Publishing Games:** After a game is completed, the results are published to the database.
- **Game Chat**
- **Public Lobbies**
- **Matchmaking**
- **Custom Visuals:** Including animations, card images, profile pictures, and room aesthetics.
- **Suspend/Resume Game:** Ability to pause and resume ongoing games.
- **Stepwise Replay:** Replay previous games step by step.
- **Ready Status:** Indication of player readiness for the next phase or game.

## Interface

<br>
<img width="420" alt="ScreenshotLogin" src="https://github.com/batec2/CoupOnline/assets/97869609/58dbf0c1-37cf-4c09-9095-e83642c1fa27">
<br>
Users will begin at the login page, where they can enter a registered username to login to their account. At this time, there is no password or verification system, accounts can be accessed by entering a valid username. Once logged in, a cookie will be saved into the browser session which will remember the logged in account.
<br>
<br>
<img width="420" alt="ScreenshotCreation" src="https://github.com/batec2/CoupOnline/assets/134631360/dd943578-6d48-404e-bed4-21c6687c9952">
<br>
If you do not have an account, you can click the "Create an Account" button to navigate to the account creation page. Please note that we do not utilize or require personal information, and recommend you do not use your real name or email address when creating an account. Emails must be in a valid email format (nut do not need to be a valid email) and usernames must be unique (duplicate usernames are not permitted).
<br>
<br>
<img width="240" alt="ScreenshotJoin" src="https://github.com/batec2/CoupOnline/assets/134631360/ebb8f30d-e2e4-4088-9228-cc7f61d4702c">
<img width="240" alt="ScreenshotLobby" src="https://github.com/batec2/CoupOnline/assets/134631360/14733ee0-d63c-44e5-b6dc-89354a74c09d">
<br>
Once logged in to an account, the user is brought to the join room page. From here, the user can join a lobby by entering a lobby name in the text field. When the join room button is clicked, the user will be placed in either a new or existing lobby. Once in a lobby, the user can see all players currently in the lobby. Once two or more players are in a lobby, any player can start the game by clicking the "Start Game" button.
<br>
<br>
<img width="1420" alt="Screenshot3" src="https://github.com/batec2/CoupOnline/assets/134631360/90453df8-ea55-4c0e-8725-87e8500640b6">
<br>
Once a game begins, players will be brought to the main game screen. There are six elements on the UI screen. 
<ol>
<li> Player Cards Remaining: A list of all players in the game showing the number of cards they have remaining. </li>
<li> Current Turn Info: a summary of actions taken during the current turn </li>
<li> Discarded Cards: A list showing all cards discarded during the course of the game </li>
<li> Recent Turn History: Complete history of past actions </li>
<li> Player Info: The main section a player interacts with during their turn. It shows the number of coins a player has, the cards they are holding, and actions that can be taken at the current point in the game.  </li>
<li> References: Includes a table listing all cards and actions, and a set of complete game rules. </li>
</ol>
<br>
<br>
<img width="420" alt="ScreenshotProfile" src="https://github.com/batec2/CoupOnline/assets/97869609/45f4f0e6-9d0a-42ff-80a1-08ded899fc71">
<img width="1240" alt="ScreenshotProfile" src="https://github.com/batec2/CoupOnline/assets/134631360/0ba82526-5b84-4329-8286-30af62d38983">
The hamburger menu from the top allows access to a user profile page and past game statistics page.
<br>
<br>

## Installation on local machine

1. Clone the repository:

```
git clone https://github.com/batec2/CoupOnline
```

2. Navigate to the project frontend and install dependencies and start the frontend:

- Create a .env file for the frontend with these entries

```
VITE_SERVER_URL="http://localhost:8080"
```

```
cd frontend
npm i
npm run dev
```

3. Navigate to the project backend, install dependencies and start the backend:

```
cd backend
npm i
nodemon server.js
```

4. Open your web browser and navigate to [http://localhost:5173](http://localhost:5173).
