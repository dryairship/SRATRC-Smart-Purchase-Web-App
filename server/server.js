const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('../config/config.js');
const DBConnection = require('../db/database.js');

const productRoutes = require('../routes/product.js');
const inventoryItemRoutes = require('../routes/inventoryItem.js');
const vendorRoutes = require('../routes/vendor.js');
const userRoutes = require('../routes/user.js');
const purchaseRoutes = require('../routes/purchase.js');
const paymentRoutes = require('../routes/payment.js');
const listRoutes = require('../routes/list.js');
const donationRoutes = require('../routes/donation.js');
const requestRoutes = require('../routes/request.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/product', productRoutes);
app.use('/inventory', inventoryItemRoutes);
app.use('/vendor',vendorRoutes);
app.use('/user', userRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/payment', paymentRoutes);
app.use('/list', listRoutes);
app.use('/donation', donationRoutes);
app.use('/request', requestRoutes);

DBConnection.dial();

app.listen(global.server.port, () => {
    console.log(`${global.application.name} running on port ${global.server.port}`);
});


// PRINT (WILL BE REMOVED LATER)

function print (path, layer) {
  if (layer.route) {
    layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
  } else if (layer.name === 'router' && layer.handle.stack) {
    layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
  } else if (layer.method) {
    console.log('%s /%s',
      layer.method.toUpperCase(),
      path.concat(split(layer.regexp)).filter(Boolean).join('/'))
  }
}

function split (thing) {
  if (typeof thing === 'string') {
    return thing.split('/')
  } else if (thing.fast_slash) {
    return ''
  } else {
    var match = thing.toString()
      .replace('\\/?', '')
      .replace('(?=\\/|$)', '$')
      .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
    return match
      ? match[1].replace(/\\(.)/g, '$1').split('/')
      : '<complex:' + thing.toString() + '>'
  }
}

app._router.stack.forEach(print.bind(null, []))
