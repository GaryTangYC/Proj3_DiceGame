class BaseController {
  constructor(model, db) {
    this.model = model;
    this.db = db;
  }

  async root(req, res) {
    res.render('index');
  }

  async game(req, res) {
    res.render('game');
  }

}

module.exports = BaseController;