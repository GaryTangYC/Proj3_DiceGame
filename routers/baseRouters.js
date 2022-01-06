const express = require('express')
const router = express.Router()

module.exports = (controller, auth) => {
  router.get('/', controller.root.bind(controller));
  return router;
}