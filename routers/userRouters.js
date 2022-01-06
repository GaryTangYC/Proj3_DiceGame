const express = require('express')
const router = express.Router()

module.exports = (controller, auth) => {
  router.get('/', controller.root.bind(controller));
  router.post('/register', controller.createUser.bind(controller));
  router.post('/login', controller.login.bind(controller));

  return router;
}