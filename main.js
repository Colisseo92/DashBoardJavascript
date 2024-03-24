const Koa = require('koa');
const koaBody = require('koa-body').default;
const cors = require('@koa/cors');

const app = new Koa();

// middleware
app.use(koaBody());
app.use(cors());

// Require the routers
let items = require('./airport.js');

// use the routes
app.use(items.routes());

app.listen(3000);
