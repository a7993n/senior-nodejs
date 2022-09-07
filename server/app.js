var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Dotenv
require('dotenv').config();
require('./connection');

//Routes
let Pollution = require('./controllers/pollutions');
var indexRouter = require('./routes/index');
const pollutionRoute = require('./routes/pollution');

//Models
const modelPollution = require('./models/pollution');

var app = express();
const PORT = 4000;
// view engine jade
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use(pollutionRoute);

var cron = require('node-cron');
 cron.schedule("* * * * *", async () => {
    // longitude and latitude of Paris
    let longitude = 2.3522;
    let latitude = 48.8566;
    const { data } =  await axios.get(`https://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${process.env.API_KEY}`);
    console.log(data);
    const { data: { current: { pollution } } } = data;
    const ts = new Date();
    const { aqius, mainus, aqicn, maincn } = pollution;
    const newPollution = await modelPollution.create({ ts, aqius, mainus, aqicn, maincn });
    res.status(200).json(newPollution);
    console.log("CRON JOB EXECUTED");
});

app.listen(PORT);

module.exports = app;