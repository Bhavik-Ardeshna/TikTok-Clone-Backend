const { json } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const data = require('./data');
const Videos = require('./dbModel.js');


// App config
const app = express();
const port = 9000;


// Middleware
app.use(express.json());
app.use((req, res, next) => {
    res.setHeaders('Access-Control-Allow-Origin', '*'),
        res.setHeaders('Access-Control-Allow-Headers', '*'),
        next()
});

// DB config
const connection_url = 'mongodb+srv://admin:BtmZJODqsTK0BBMK@cluster0.kt9vf.mongodb.net/tiktok?retryWrites=true&w=majority';
mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})


//Api endpoints
app.get('/', (req, res) => res.status(200).send("Hello!"));

app.get('/v1/posts', (req, res) => res.status(200).json(data));

app.get('/v2/posts', (req, res) => {
    Videos.find({}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

app.post('/v2/posts', (req, res) => {
    const dbVideos = req.body;

    Videos.create(dbVideos, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
})


//Listener
app.listen(port, () => console.log(`Listening on port localhost:${port}`));

//Atlas passcode
// username: admin
// password: BtmZJODqsTK0BBMK