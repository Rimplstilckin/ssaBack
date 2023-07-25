const express = require('express');
const bodyParser = rewuire('body-parser');

const app = express();

app.use(bodyParser.urlencode({extended: false}));

app.listen(8080);