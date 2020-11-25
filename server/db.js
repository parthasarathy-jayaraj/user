var mongoose = require('mongoose');

module.exports = () => {
  var mongo = null;

  try {
    mongo = mongoose.connect(config.mongo.uri, config.mongo.settings);

    mongoose.connection.on('connected', function () {
      console.log('Mongoose connected');
    });

    mongoose.connection.on('error', function (err) {
      console.log('Mongoose Connection->', err, 'Could not connect to MongoDB');
    });

    mongoose.connection.on('disconnected', function () {
      console.log('Mongoose Disconnected->', 'Could not connect to MongoDB');
    });
  } catch (e) {
    console.log('Mongoose Exception->', e, 'Could not connect to MongoDB');
  }

  return mongo;
};
