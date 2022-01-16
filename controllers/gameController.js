const BaseController = require('./baseController')
const { Sequelize, DataTypes, Op } = require('sequelize');

class GameController extends BaseController {
  constructor(model, db) {
    super(model, db)
  }

  async rollDice(req, res) {
    // Destructure betAmount (data received from game.js
    const { userID, betBig, betSmall } = req.body
    let betAmount = betBig + betSmall;

    // generate random number to simulate dice roll 
    function diceRoll() { return Math.ceil(Math.random() * 6) }
    const firstDiceRoll = diceRoll();
    const secondDiceRoll = diceRoll();
    const totalDiceValue = Number(firstDiceRoll + secondDiceRoll);
    console.log('1st Dice roll in controller', firstDiceRoll)
    console.log('2nd dice roll in controller', secondDiceRoll)
    console.log('total dice value in controller', totalDiceValue)

    console.log("req.body", req.body)

    // console.log("req.body", req.body)

    // Check if player win on bet by declaring conditions

    let diceIs;
    let playerBetOnBig;
    let didPlayerWin;
    let payoutAmount = 0;

    if (betBig >= 1) {
      playerBetOnBig = true;
    } else {
      playerBetOnBig = false;
    }

    if (totalDiceValue <= 6) {
      diceIs = "small";
    } else {
      diceIs = "big"
    }

    if (playerBetOnBig === true && diceIs === "big") {
      didPlayerWin = true;
      payoutAmount = Number(betBig);
    } else if (playerBetOnBig === false && diceIs === "small") {
      didPlayerWin = true;
      payoutAmount = Number(betSmall);
    } else {
      didPlayerWin = false;
    }

    // Generate gameData to be sent for DB creation in sequelize
    const gameData = {
      gameState: {
        "userID": userID,
        "diceRoll": { dice1: firstDiceRoll, dice2: secondDiceRoll },
        "totalDiceValue": totalDiceValue,
        "playerBetBig": betBig, //req.body.betBig
        "playerBetSmall": betSmall, //req.body.betSmall
        "didPlayerWin": didPlayerWin,
        "payoutAmount": payoutAmount,
      },
    };

    try {
      console.log('payoutamount console', payoutAmount)

      // get existing coin value in DB for User
      const getCoin = await this.db.Users.findOne({
        where: { id: userID }
      }).then((results) => {
        console.log('results', results)

        // Store coin value in variable to call
        const coinValue = results.coin

        // if player win, payout amount of coin bet and update DB.
        if (didPlayerWin === true) {
          let coinBalance = coinValue + payoutAmount;
          console.log('coin balance:', coinBalance)

          // Re-set value of coin in cookie
          res.cookie('coin', coinBalance)

          const updateBet = this.db.Users.update({ coin: coinBalance }, {
            where: {
              id: userID
            }
          })

        } else {
          // if player lost, less amount of bet and update DB.
          let coinBalance = coinValue - betAmount;
          console.log('coin balance:', coinBalance)
          // Re-set value of coin in cookie
          res.cookie('coin', coinBalance)

          const updateBet = this.db.Users.update({ coin: coinBalance }, {
            where: {
              id: userID
            }
          })
        }
      })

      console.log('this model', this.model)
      const game = await this.model.create(gameData);
      console.log('gameDatatoDB', gameData)

      res.send({ game })
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

}




module.exports = GameController;