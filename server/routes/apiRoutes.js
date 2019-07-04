const express = require('express');

const log = require('../helpers/logHelper');
const { ServerError } = require('../helpers/serverHelper');
const controllers = require('../controllers/api/indexController');
const images = require('../helpers/gCloud');

const router = express.Router();
const { userController, profileController } = controllers;

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
 * User.
 */
router.post('/users', images.multer.single('avatar'), images.sendUploadToGCS, c(userController.create, (req, res, next) => [req, res, next]));
router.get('/users', c(userController.all, (req, res, next) => [req, res, next]));
router.put('/users/:id', c(userController.update, req => [req]));
router.delete('/users/:id', c(userController.remove, req => [req.params.id]));

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
