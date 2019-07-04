const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Session = require('express-session');
const morgan = require('morgan');
const config = require('config');
const cors = require('cors');
const log = require('./helpers/logHelper');
const databases = require('./databases');
const apiRoutes = require('./routes/apiRoutes');

global.__basedir = __dirname;

// const PORT = process.env.PORT || 8000;
const PORT = 8000;

const app = express();
const server = http.createServer(app);

// Hey you! care about my order http://stackoverflow.com/a/16781554/2034015

// Databases.
databases.mongodb();
const dbSession = databases.redis(Session);
const now = new Date();
let time = now.getTime();
time += 3600 * 1000;
now.setTime(time);
// Session.
const session = Session({
  resave: false,
  saveUninitialized: true,
  key: config.get('session.key'),
  secret: config.get('session.secret'),
  store: dbSession,
  cookie: {
    httpOnly: false,
    sameSite: false,
    expires: now
  }
});
app.use(session);

// Cookies.
app.use(cookieParser());

// cors
const corsOptions = {
  origin: '*'
};
app.use(cors(corsOptions));

// Body.
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  if (!req.session) {
    log.error('Session not found (is Redis down?).');
  }
  next();
});

// Logging (debug only).
app.use(
  morgan('combined', {
    stream: {
      write: msg => log.info(msg)
    }
  })
);

// URLs.
app.use('/api', apiRoutes);

// Route not found (404)
app.use((req, res, next) =>
  res.status(404).send({
    error: 'Not found.'
  })
);
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  if (!req.session) {
    log.error('Session not found (is Redis down?).');
  }
  next();
});
server.listen(PORT);
log.info('-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-');
log.info(`🌐  API listening on port ${PORT}`);
log.info('-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-');

module.exports = server;
