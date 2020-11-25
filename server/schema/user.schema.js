const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let user = new Schema(
  {
    id: String,
    userName: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    gender: {type: String, enum: ['male', 'female']},
    country: {type: Object},
  },
  {collection: 'Users'}
);

module.exports = mongoose.model('Users', user);
