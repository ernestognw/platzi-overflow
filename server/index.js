import Debug from 'debug';
import http from 'http';
import app from './app';
import { mongoUrl, port } from './config';
import mongoose from 'mongoose';

const debug = new Debug('platzi-overflow:root')

mongoose.Promise = global.Promise;

async function start() {
  await mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
  });

  app.listen(port, () => {
    debug(`Server running at port ${port}`)
  })

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
}

start();



