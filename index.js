const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const authorRoute = require('./routes/author');
const bookRoute = require('./routes/book');
dotenv.config();

//connect database
mongoose.connect(process.env.MONGODB_URL, () => {
	console.log('connected to mongodb');
});
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.use(morgan('common'));

//ROUTES
app.use('/v1/auth', authorRoute);
app.use('/v1/book', bookRoute);
app.listen(8080, () => {
	console.log('server is running...');
});
