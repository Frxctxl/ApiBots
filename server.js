const express = require('express');

const db = require('./config/connection');
const api_routes = require('./routes/api_routes');

const app = express();
const PORT = 3001;

app.use(express.json());

app.use('/api', api_routes);

db.once('open', () => {
  console.log('DB locked in');

  app.listen(PORT, () => {
    console.log('Listening on port', PORT);
  });
})

