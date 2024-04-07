const Koa = require('koa');
const koaBody = require('koa-body').default;
const cors = require('@koa/cors');

const app = new Koa();

//https://www.fbrs.io/ramda/

// middleware
app.use(koaBody());
app.use(cors());

// Require the routers
let items = require('./airport.js');
let countries = require('./countries.js');
let destination = require('./destination');

// use the routes
app.use(items.routes());
app.use(countries.routes());
app.use(destination.routes());

/*
localhost:3000/countries/FR -> liste des pays dans lesquels ont peut aller depuis la France
localhost:3000/destination/FR -> liste des pays dans lesquels ont peut aller depuis la france avec tout les aéroports de la destination
localhost:3000/airport/FR -> liste des aéroports français
 */

app.listen(3000);
