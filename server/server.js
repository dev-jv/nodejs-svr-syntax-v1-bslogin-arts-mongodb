require('./config/config');

const express = require('express');
const app = express();

const colors = require('colors');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use (bodyParser.json());

app.use( require('./routes/index') );

mongoose.connect(process.env.KDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err, res) => {
    if (err) throw err;
    console.log('ONLINE Database'.gray)
});

app.listen(process.env.PORT, () => {
    console.log('Listening!'.blue, process.env.PORT);
});
