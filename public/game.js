// Provide logout button functionality
const logoutButton = document.getElementById('logout-button');

logoutButton.addEventListener('click', async () => {

  function deleteCookies() {
    var allCookies = document.cookie.split(';');

    // The "expire" attribute of every cookie is 
    // Set to "Thu, 01 Jan 1970 00:00:00 GMT"
    for (var i = 0; i < allCookies.length; i++)
      document.cookie = allCookies[i] + "=;expires="
        + new Date(0).toUTCString();

    displayCookies.innerHTML = document.cookie;
  }
  deleteCookies()
  storage.removeItem(AuthToken);
  window.location.replace("/");
})

// Get respective messages & input by Class or ID
const getBoardClass = document.getElementsByClassName("board");
const getMessageDisplay = document.getElementById("messageDisplay")
const getSmallBetValue = document.getElementById("inputSmall")
const getBigBetValue = document.getElementById("inputBig")

const betBigButton = document.getElementById("betBigButton");
const betSmallButton = document.getElementById("betSmallButton");

const getDiceDiv = document.getElementById("dice-board")
const getDiceContainer = document.getElementById("dice-container");
const getTableContainer = document.getElementById("table");
const createDice1Img = document.createElement("img");
const createDice2Img = document.createElement("img");
const createRestartButton = document.createElement("button")

const cookieValue = document.cookie.split('; ');
const userIDCookie = cookieValue.find((row) => row.startsWith('userID=')).split('=')[1];
const coinCookie = cookieValue.find((row) => row.startsWith('coin=')).split('=')[1];


// bet Big game start
betBigButton.addEventListener('click', async () => {

  // Disabled bet button
  document.getElementById("betBigButton").disabled = true
  document.getElementById("betSmallButton").disabled = true

  disabled = true;
  const data = {
    userID: userIDCookie,
    betBig: Number(getBigBetValue.value),
    betSmall: 0,
  }

  try {
    // Send bet value to gamecontroller to apply game logic
    console.log('data', data)
    const response = await axios.post('/game/startGame', data)
    console.log('this is await res data', response.data)

    // assign var to gamestate for easeofcall
    let dice1Value = response.data.game.gameState.diceRoll.dice1
    let dice2Value = response.data.game.gameState.diceRoll.dice2
    let didPlayerWin = response.data.game.gameState.didPlayerWin

    // Create dice1 image based on dice roll from gameController
    createDice1Img.src = `/assets/dice${dice1Value}.png`
    getDiceContainer.appendChild(createDice1Img);

    // Create dice2 image based on dice roll from gameController
    createDice2Img.src = `/assets/dice${dice2Value}.png`
    getDiceContainer.appendChild(createDice2Img);

    // Update messagedisplay
    if (didPlayerWin === true) {
      getMessageDisplay.innerHTML = `You Rolled a ${dice1Value} & ${dice2Value}. You have Won! Click on the restart button to play again.`
    } else {
      getMessageDisplay.innerHTML = `You Rolled a ${dice1Value} & ${dice2Value}. You Lost =( Click on the restart button to play again.`
    }
    // Update coin value on page
    document.getElementById('coinValue').innerHTML = `💰​ Coins:​ ${coinCookie}`

  } catch (error) {
    console.log(error);
  }
})

// bet Small game start
betSmallButton.addEventListener('click', async () => {

  // Disabled bet button
  document.getElementById("betBigButton").disabled = true
  document.getElementById("betSmallButton").disabled = true

  const data = {
    userID: userIDCookie,
    betBig: 0,
    betSmall: Number(getSmallBetValue.value),
  }

  try {
    console.log('data', data)
    const response = await axios.post('/game/startGame', data)

    if (data === "error") {
      return getMessageDisplay.innerHTML = "Don't CHEAT!!!!"
    }

    // assign var to gamestate for easeofcall
    let dice1Value = response.data.game.gameState.diceRoll.dice1
    let dice2Value = response.data.game.gameState.diceRoll.dice2
    let didPlayerWin = response.data.game.gameState.didPlayerWin

    // Create dice1 image based on dice roll from gameController
    createDice1Img.src = `/assets/dice${dice1Value}.png`
    getDiceContainer.appendChild(createDice1Img);

    // Create dice2 image based on dice roll from gameController
    createDice2Img.src = `/assets/dice${dice2Value}.png`
    getDiceContainer.appendChild(createDice2Img);

    // Update messagedisplay
    if (didPlayerWin === true) {
      getMessageDisplay.innerHTML = `You Rolled a ${dice1Value} & ${dice2Value}. You have Won! Click on the restart button to play again.`
    } else {
      getMessageDisplay.innerHTML = `You Rolled a ${dice1Value} & ${dice2Value}. You Lost =( Click on the restart button to play again.`
    }

    // Update coin value on page
    console.log('coin cookie', coinCookie)
    document.getElementById('coinValue').innerHTML = `💰​ Coins:​ ${coinCookie}`

    // // Create restart button when round end
    // createRestartButton.setAttribute("type" = "button")

    getTableContainer.appendChild(createRestartButton);

  } catch (error) {
    console.log(error);
  }
})