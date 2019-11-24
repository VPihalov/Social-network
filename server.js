process.env.UV_THREADPOOL_SIZE = 128;
const express = require('express');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5005;

/*********************Global vars *****************/
global.chalk = require('chalk-console'); //support for red, gray, blue, cyan, white, green, yellow
/************************************************/

/*********************	DB	 *****************/
connectDB();
/************************************************/

/**************** Init middleware**************/
app.use(express.json({extended: false})); //for body.req
/************************************************/

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

app.listen(PORT, () => chalk.yellow(`Server started on port ${PORT}`));