const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config/config.js');
const DBConnection = require('../db/database.js');

const productRoutes = require('../routes/product.js');
const inventoryItemRoutes = require('../routes/inventoryItem.js');
const vendorRoutes = require('../routes/vendor.js');
const userRoutes = require('../routes/user.js');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/product', productRoutes);
app.use('/inventory', inventoryItemRoutes);
app.use('/vendor',vendorRoutes);
app.use('/user', userRoutes);


DBConnection.dial();

app.listen(global.server.port, () => {
    console.log(`${global.application.name} running on port ${global.server.port}`);
});
