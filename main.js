const Koa = require('koa');
const koaBody = require('koa-body').default;
const cors = require('@koa/cors');

const app = new Koa();

// middleware
app.use(koaBody());
app.use(cors());

// Require the routers
let items = require('./airport.js');
let countries = require('./countries.js');

// use the routes
app.use(items.routes());
app.use(countries.routes());

app.listen(3000);