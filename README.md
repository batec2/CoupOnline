# CoupOnline

CoupOnline is a web application version of the popular card game Coup. It has been developed using Vite React for the frontend, Express Node.js for the backend, and MongoDB for the database. Utilizes socket.io to facilitate communication between users and frontend. Uses cookies to remember user information.

## Link to deployment
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

## Screenshots

<img width="1420" alt="Screenshot3" src="https://github.com/batec2/CoupOnline/assets/134631360/90453df8-ea55-4c0e-8725-87e8500640b6">
<br>
<img width="420" alt="Screenshot1" src="https://github.com/batec2/CoupOnline/assets/97869609/45f4f0e6-9d0a-42ff-80a1-08ded899fc71">
<br>
<img width="420" alt="Screenshot2" src="https://github.com/batec2/CoupOnline/assets/97869609/58dbf0c1-37cf-4c09-9095-e83642c1fa27">
<br>

## Installation on local machine

1. Clone the repository:
```
git clone https://github.com/batec2/CoupOnline
```

2. Navigate to the project frontend and install dependencies and start the frontend: 
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
