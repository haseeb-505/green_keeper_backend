import express from 'express';
// import dbConnection from './sqlServerConnect/dbConnect.js';
import initializeDB from './sqlServerConnect/dbConnect.js';

const app = express();

const port = 3000

// dbConnection
initializeDB();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})