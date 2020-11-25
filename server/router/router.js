const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('graceful-fs');
const path = require('path');
const jwtkeys = {
  public: fs.readFileSync(path.resolve(__dirname, '../config/secret-keys/public.key')),
  private: fs.readFileSync(path.resolve(__dirname, '../config/secret-keys/private.key')),
};

const model = require('../models');

router.post('/authenticate', model.authenticate);

router.post('/users/register', model.register);

router.get('/api/countries', model.getCountries);

router.get('/api/users/:username', model.getUsersById);

/**
 * Middleware to parse token and verify with jwt key.
 */
router.use('/api', (req, res, next) => {
  var token = req.body.authorization || req.query.authorization || req.headers['authorization'];

  if (token) {
    jwt.verify(token, jwtkeys.public, {clockTolerance: 180}, (error, decoded) => {
      if (error) {
        return res.status(401).json({
          error,
          success: false,
          message: 'Invalid: Failed to authenticate token.',
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(401).send({
      success: false,
      status: 401,
      message: 'Unauthorized User! Check your credentials.',
    });
  }
});

router.get('/api/users', model.getUsers);

module.exports = router;
