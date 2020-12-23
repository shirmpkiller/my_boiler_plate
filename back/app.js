const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');

const passportConfig = require('./passport');
const db = require('./models');
const userAPIRouter = require('./routes/user');

dotenv.config(); 
const app = express();
db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);
  passportConfig();

app.use(morgan('dev'));
app.use('/', express.static('uploads'));
app.use(cors({
  origin: 'http://localhost:3060',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false, 
  },
  name: 'rnbck',
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', userAPIRouter);

app.listen(3065, () => {
  console.log('서버 실행 중!  http://localhost:3065');
});
