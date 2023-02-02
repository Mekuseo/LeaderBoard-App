import './style.css';

const gameNameInput = document.querySelector('#name');
const gameScore = document.querySelector('#score');
const refreshBtn = document.querySelector('.refresh');
const submitBtn = document.querySelector("button[type='submit']");
const scoresList = document.querySelector('.scores-list');

let gameId = 'KO65smAxNHaw6hnLD7Hx';

// Creates a new game with the given name
const createGame = async () => {
  const response = await fetch(
    `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        name: gameNameInput.value,
        score: gameScore.value,
      }),
    },
  );
  const game = await response.json();
  gameId = game.id;
};

// Gets all scores for the current game
const getScores = async () => {
  const response = await fetch(
    `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`,
  );
  const scores = await response.json();
  const strScores = JSON.stringify(scores.result);
  const parseScores = JSON.parse(strScores);
  console.log(scores);

  scoresList.innerHTML = '';
  parseScores.forEach((score) => {
    const li = document.createElement('li');
    li.innerHTML = `Name: ${score.user} Score: ${score.score}`;
    scoresList.appendChild(li);
  });

  // reset form
  gameNameInput.value = '';
  gameScore.value = '';
};

// Saves a score for the current game
// const saveScore = async (name, score) => {
//   await fetch(
//     `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`,
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         user: name,
//         score,
//       }),
//     },
//   );
// };

refreshBtn.addEventListener('click',
  getScores);

submitBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  getScores();
  // window.location.reload();
});

createGame();
