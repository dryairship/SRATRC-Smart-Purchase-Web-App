const express = require('express');

const config = require('../config/config.js');

const app = express();

app.get('/', (req, res) => {
    res.json("Server running");
});

app.listen(global.server.port, () => {
    console.log(`${global.application.name} running on port ${global.server.port}`);
});
