require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const line = require('@line/bot-sdk');
const cors = require('cors');

const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.get('/api/v1/unlink-richmenu', (req, res) => {    
    client.unlinkRichMenuFromUser("U8b7168b339728ef53bd47cbe443da04a");
    res.json({
        data: req.body.uid
    });
});

app.post('/api/v1/change-richmenu', (req, res) => {
    // save data in db
    const { firstname, lastname, email, userId } = req.body;
    client.linkRichMenuToUser(req.body.uid,"richmenu-6e66bcc74a6a2e65a38eee364691becd");
    res.json({
        data: req.body.uid
    });
})

app.listen(5000, () => {
    console.log("Ready on port 5000");
});
