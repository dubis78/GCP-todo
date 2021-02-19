const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
require('./db');

app.use(cors({ origin: '*' }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('./routes/routes'));

app.set('port', process.env.APP_PORT || 8080);

app.listen(app.get('port'),()=>{
  console.log('Server on port '+app.get('port'));
});

module.exports = app;