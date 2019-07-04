const log = require('../helpers/logHelper');
const config = require('config');
// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb+srv://zworks:testPass@cluster0-4lww0.mongodb.net/test?retryWrites=true&w=majority';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const reconnectTimeout = config.get('database.data.reconnectTimeout');

module.exports = () => {
  const db = mongoose.connection;

  db.on('connecting', () => {
    log.dev('Connecting to MongoDB...');
  });

  db.on('error', err => {
    log.error(`MongoDB connection error: ${err}`);
    mongoose.disconnect();
  });

  db.on('connected', () => {
    log.dev('Connected to MongoDB!');
  });

  db.once('open', () => {
    log.dev('MongoDB connection opened!');
  });

  db.on('reconnected', () => {
    log.dev('MongoDB reconnected!');
  });

  db.on('disconnected', () => {
    log.error(`MongoDB disconnected! Reconnecting in ${reconnectTimeout / 1000}s...`);
    setTimeout(() => connect(), reconnectTimeout);
  });
};
