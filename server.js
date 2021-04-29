const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const {PORT, URI} = require('./config');
const helmet = require('helmet');
let path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

let init = async () => {
    mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('Database connected...');
        initServer();
    });
};

let initServer = () => {

    // Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(express.static(__dirname + '/public/app'));
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(cors());

    // Router
    const mainRouter = require('./app/routes/mainRouter');
    app.use('/api', mainRouter);
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/public/app/index.html'));
    });

    // Error handling middleware
    app.use((err, req, res, next) => {
        console.error(err.stack)
        res.json({success: false, msg: err.stack});
    });

    // Start
    app.listen(PORT);
    console.log('Running on port ' + PORT);
};

init();

