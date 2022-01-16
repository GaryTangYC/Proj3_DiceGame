const express = require('express')
const router = express.Router()

module.exports = (controller) => {
  router.get('/', controller.root.bind(controller));
  router.get('/game', controller.game.bind(controller));
  // router.post('/logout', controller.logout.bind(controller));
  router.post('/startGame', controller.rollDice.bind(controller));

  return router;
}