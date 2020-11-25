const Users = require('../../schema/user.schema');

/**
 * finds if the user with username exists, if yes, it updates the record , otherwise, it will insert a new record
 * upsert: true is the key here.
 */
const registrationController = async (req, res) => {
  const filter = {userName: req.body.username};
  const update = req.body;

  let result = await Users.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true,
    rawResult: true,
  });

  res.send(result);
};

module.exports = registrationController;
