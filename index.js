const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const api = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', api);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
