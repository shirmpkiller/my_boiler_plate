const dotenv = require('dotenv'); 

dotenv.config();

module.exports = {
  development: {
    username: 'root',
    password: process.env.DB_PASSWORD,//db 비번
    database: 'boilerplate',//db 아름
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'boilerplate',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'boilerplate',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
