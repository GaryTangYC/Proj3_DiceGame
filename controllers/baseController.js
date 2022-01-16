class BaseController {
  constructor(model, db) {
    this.model = model;
    this.db = db;
  }

  async root(req, res) {
    res.render('index');
  }

  async game(req, res) {
    res.render('game', { userID: req.cookies.userID, userName: req.cookies.userName, coin: req.cookies.coin });
  }

}

module.exports = BaseController;