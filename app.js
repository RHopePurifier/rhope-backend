const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './src/Config/config.env' });

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}, (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log("successfully connected");
    }
})

const app = express();

module.exports = app;