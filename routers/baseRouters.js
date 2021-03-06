const express = require('express')
const router = express.Router()

module.exports = (controller, auth) => {
  router.get('/', controller.root.bind(controller));
  router.get('/game', controller.game.bind(controller));
  return router;
}