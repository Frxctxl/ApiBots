const express = require('express');
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const app = express();
const PORT = 3001;

const dbname = 'transformers_db';

app.use(express.json());

async function start() {
  await client.connect();
  console.log('We locked in');

  const db = client.db(dbname);
  const abCollection = db.collection('autobots');


  app.get('/api/autobots', async (req, res) => {
    const autobots = await abCollection.find({}).toArray();

    res.json(autobots);
  });

  app.post('/api/autobots', async (req, res) => {
    const info = await abCollection.insertOne({
      name: req.body.name,
      color: req.body.color
    });

    console.log(info);
    res.json({
      message: 'Autobot rolled out!'
    })
  });

  app.listen(PORT, () => {
    console.log('Listening on port', PORT);
  });
}

start();
