const express = require('express');
const route = require('./routes/routes');
require('dotenv').config();


const app = express();
app.use(express.json());


app.use('/',route);

app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});