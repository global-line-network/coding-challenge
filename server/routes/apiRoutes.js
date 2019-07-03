const express = require('express');

const log = require('../helpers/logHelper');
const { ServerError } = require('../helpers/serverHelper');
const controllers = require('../controllers/api/indexController');
const images = require('../helpers/gCloud');

const router = express.Router();
const { homeController, profileController } = controllers;

/**
 * Handles controller execution and responds to user (API version).
 * This way controllers are not attached to the API.
 * Web socket has a similar handler implementation.
 * @param promise Controller Promise.
 * @param params (req) => [params, ...].
 */
const controllerHandler = (promise, params) => async (req, res, next) => {
  const boundParams = params ? params(req, res, next) : [];
  try {
    const result = await promise(...boundParams);
    return res.json(result || { message: 'OK' });
  } catch (error) {
    return res.status(500) && next(error);
  }
};
const c = controllerHandler;

/**
 * Profile.
 */
router.post(
  '/profile/update',
  images.multer.single('image'),
  images.sendUploadToGCS,
  c(profileController.update, (req, res, next) => [req, res, next])
);

/**
 * Home.
 */
router.get('/', c(homeController.hello, (req, res, next) => [req, res, next]));
router.get('/greet/:name', c(homeController.getGreeting, req => [req.params.name]));
router.post('/greet/', c(homeController.postGreeting, req => [req.body.name]));

/**
 * Error-handler.
 */
router.use((err, req, res, _next) => {
  // Expected errors always throw ServerError.
  // Unexpected errors will either throw unexpected stuff or crash the application.
  if (Object.prototype.isPrototypeOf.call(ServerError.prototype, err)) {
    return res.status(err.status || 500).json({ error: err.message });
  }

  log.error('~~~ Unexpected error exception start ~~~');
  // log.error(req);
  log.error(err);
  log.error('~~~ Unexpected error exception end ~~~');

  return res.status(500).json({ error: err });
});

module.exports = router;
