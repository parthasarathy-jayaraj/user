const getAllCountries = require('./countries-model/countries.model');
const authController = require('./user-model/authenticate.model');
const registrationController = require('./user-model/registration.model');
const userController = require('./user-model/user.model');

module.exports = {
  getCountries: getAllCountries,
  authenticate: authController,
  register: registrationController,
  getUsers: userController.getAllUsers,
  getUsersById: userController.getById,
};
