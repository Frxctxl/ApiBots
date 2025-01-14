require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const db = require('./config/connection');
const api_routes = require('./routes/api_routes');
const auth_routes = require('./routes/auth_routes');

const app = express();
const PORT = 3001;

app.use(express.static('../client'));

app.use(cookieParser());

app.use(express.json());

app.use('/api', api_routes);
app.use('/api/auth', auth_routes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'))
})

db.once('open', () => {
  console.log('DB locked in');

  app.listen(PORT, () => {
    console.log('Listening on port', PORT);
  });
})

