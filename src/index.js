import './style.css';

const gameNameInput = document.querySelector('#name');
const gameScore = document.querySelector('#score');
const refreshBtn = document.querySelector('.refresh');
const submitBtn = document.querySelector("button[type='submit']");
const scoresList = document.querySelector('.scores-list');

let gameId = 'Z2FtZXM6Y2FzdGxl';

// Creates a new game with the given name
const createGame = async () => {
  const name = gameNameInput.value;
  const score = gameScore.value;
  const response = await fetch(
    `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        name,
        score,
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
  console.log(scores);

  if (Array.isArray(scores)) {
    scores.forEach((score) => {
      const li = document.createElement('li');
      li.innerHTML = `Name: ${score.user} Score: ${score.score}`;
      scoresList.appendChild(li);
    });
  } else {
    Object.keys(scores).forEach((key) => {
      const score = scores[key];
      const li = document.createElement('li');
      li.innerHTML = `Name: ${score.user} Score: ${score.score}`;
      scoresList.appendChild(li);
    });
  }
};

// Saves a score for the current game
const saveScore = async (name, score) => {
  await fetch(
    `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: name,
        score,
      }),
    },
  );
};

refreshBtn.addEventListener('click', getScores);
submitBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  const nameInput = document.querySelector('#name');
  const scoreInput = document.querySelector('#score');
  await saveScore(nameInput.value, scoreInput.value);
  getScores();
});

createGame();
