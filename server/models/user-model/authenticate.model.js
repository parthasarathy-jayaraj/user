const jwt = require('jsonwebtoken');
const fs = require('graceful-fs');
const path = require('path');
const jwtkeys = {
  public: fs.readFileSync(path.resolve(__dirname, '../../config/secret-keys/public.key')),
  private: fs.readFileSync(path.resolve(__dirname, '../../config/secret-keys/private.key')),
};
const Users = require('../../schema/user.schema');

/**
 * User login authentication check
 * check if the user exists, if not, throws error
 * if user exist, check for the password, if not, throw password mismatch
 * otherwise, generates JWT secret token for the user to login to dashboard which will used for all other api's starting with /api
 */
const authController = (req, res) => {
  let data = req.body;
  Users.findOne({userName: data.username}, function (err, user) {
    if (!err) {
      if (user) {
        var loginUser = {
          username: user.userName,
          password: user.password,
        };

        if (loginUser.password === data.password) {
          var token = jwt.sign(loginUser, jwtkeys.private, {
            issuer: 'admin',
            subject: 'admin-id',
            audience: 'localhost',
            algorithm: 'RS256',
            expiresIn: 60 * 60,
          });
          res.status(200).send({
            success: true,
            message: 'Enjoy your token!',
            token: token,
            user: loginUser,
          });
        } else {
          res.status(401).send({success: false, message: 'Incorrect Password ! Please check'});
        }
      } else {
        res.status(401).send({success: false, message: 'Authentication failed. You are unauthorized to view this page ! Please Register !'});
      }
    } else {
      res.status(400).send({
        error: err,
      });
    }
  });
};

module.exports = authController;
