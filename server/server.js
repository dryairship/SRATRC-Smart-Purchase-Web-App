const express = require('express');
const mongoose = require('mongoose');

const config = require('../config/config.js');
const DBConnection = require('../db/database.js');

const app = express();

app.get('/', (req, res) => {
    res.json("Server running");
});

DBConnection.dial();

app.listen(global.server.port, () => {
    console.log(`${global.application.name} running on port ${global.server.port}`);
});
