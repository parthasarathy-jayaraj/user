const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let countrySchema = new Schema(
  {
    id: String,
    name: String,
    short_name: String,
  },
  {collection: 'Users'}
);

module.exports = mongoose.model('countries', countrySchema);
