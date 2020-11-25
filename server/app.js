const express = require('express');
const path = require('path');

global.config = require('./config/' + process.env.NODE_ENV + '.config.js');
global.db = global.db ? global.db : require('./db.js')();

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./router/router');

const port = config.port || 2000;
const DIST_DIR = path.join(__dirname, '../dist');

app.use(
  bodyParser.json({
    limit: '15mb',
    type: 'application/json',
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '15mb',
    type: 'application/x-www-form-urlencoding',
  })
);

app.use(cors());
app.use(express.static(DIST_DIR));
app.use('/', router);
/**
 * The below two lines is for serving the base html file for every request to this server, so that the result of the url will be handled by react routing.
 */
app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html')); // EDIT
});

app.listen(port, function () {
  console.log('App listening on port: ' + port);
});
