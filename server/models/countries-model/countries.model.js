const countries = require('../../data/countries.mock');

/**
 *
 * @param {*} req
 * @param {*} res
 * returns the list of contries(mock data)
 */
module.exports = (req, res) => {
  res.send(countries);
};
