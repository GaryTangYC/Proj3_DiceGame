// Getting the app started
require('dotenv').config();
const { PORT } = process.env

// Express setup
const express = require('express');
const app = express();
const path = require('path');
// Set cookie parser
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override');

// Set express view engine to render ejs template
app.set('view engine', 'ejs');
// Bind cookie parser middleware to parse cookies in requests
app.use(cookieParser());
// Bind Express middleware to parse request bodies for POST requests
app.use(express.urlencoded({ extended: false }));
// Bind method override middleware to parse PUT and DELETE requests sent as POST requests
app.use(methodOverride('_method'));
// Set static folder
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// import Routers
const userRouter = require('./routers/userRouters')
const gameRouter = require('./routers/gameRouters')

// Import Controllers
const UserController = require('./controllers/userController')
const GameController = require('./controllers/gameController')

// Import Models
const db = require('./models')

// Import middlewares
const auth = require('./middlewares/auth')

// Initialize Controllers
const userController = new UserController(db.Users, db)
const gameController = new GameController(db.Games, db)

// app.get('/', (req, res) => res.render('index'))
// Initialize routers
app.use('/', userRouter(userController));
// app.use('/register', userRouter(userController, auth));
// app.use('/login', userRouter(userController, auth));
app.use('/game', gameRouter(gameController));

// app.post('/startGame', gameRouter(gameController));

app.listen(PORT, () => console.log(`App is listening on ${PORT}`))