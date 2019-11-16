const express = require('express');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

/*********************Global vars *****************/
global.chalk = require("chalk-console"); //support for red, gray, blue, cyan, white, green, yellow
/*********************************************** */

app.get('/', (req, res) => {
  res.send('API running...');
});

app.listen(PORT, () => {
  chalk.yellow(`server is listening port :${PORT}`);
});
