/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import 'dotenv/config';
import express from 'express';
import * as path from 'path';
import { connectToDatabase, isDatabaseConnected } from './db';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/health', (req, res) => {
  res.send({ message: 'ok' });
});

app.get('/health/db', (req, res) => {
  const connected = isDatabaseConnected();
  res.status(connected ? 200 : 503).send({
    status: connected ? 'ok' : 'unreachable',
  });
});

const port = process.env.PORT || 3333;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/giftway';

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/health`);
});
server.on('error', console.error);

connectToDatabase(mongoUri).then(
  () => console.log(`Connected to MongoDB at ${mongoUri}`),
  (error) => console.error('Failed to connect to MongoDB:', error.message),
);
