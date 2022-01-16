const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { PW_SALT_ROUND, JWT_SALT } = process.env

const BaseController = require('./baseController')

class UserController extends BaseController {
  constructor(model, db) {
    super(model, db)
  }

  async createUser(req, res) {
    const { email, password } = req.body
    try {
      const userCheck = await this.db.Users.findAll({
        where: {
          email: email
        }
      });

      if (userCheck.length > 0) {
        res.send('User Exists');
        console.log('user Exists')
        return;
      }
      const hash = await bcrypt.hash(password, Number(PW_SALT_ROUND))
      const user = await this.db.Users.create({
        email: email,
        password: hash,
        coin: 500,
      });
      const payLoad = { id: user.id, email: user.email }
      const token = jwt.sign(payLoad, JWT_SALT, { expiresIn: '2h' })
      res.cookie('userID', user.id);
      res.cookie('userName', user.email);
      res.cookie('coin', user.coin)
      return res.status(200).json({ success: true, token });

    } catch (err) {
      res.status(500).send(err);
    }
  }

  async login(req, res) {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(500).json({ msg: 'Please fill in email & Password' })
    }
    try {
      const user = await this.db.Users.findOne({
        where: { email }
      })
      if (!user) {
        return res.status(500).json({ msg: 'Email not found - please register' })
      }
      const compare = await bcrypt.compare(password, user.password)

      if (compare) {
        const payLoad = { id: user.id, email: user.email, coin: user.coin }
        const token = jwt.sign(payLoad, JWT_SALT, { expiresIn: '2h' })
        console.log('payload running')
        console.log('token')
        res.cookie('userID', user.id);
        res.cookie('userName', user.email);
        res.cookie('coin', user.coin)
        res.redirect('/game')
        // return res.status(200).json({ success: true, token });
      }
      return res.status(401).json({ error: "wrong password" })
    } catch (error) {
      console.log(error);
    }
  }

}



module.exports = UserController;