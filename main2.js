const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body').default;
const cors = require('@koa/cors');

const airports = require('app/airports');

//https://www.fbrs.io/ramda/
const app = new Koa();
const router = new Router();

app.use(koaBody());
app.use(cors());

router.get("/", (ctx) => {
  ctx.type = "html";
  ctx.body = [
    "Usable routes :",
    "",
    '<h3>Airports</h3>',
    'GET <a href="http://localhost:3000/airport">/airport</a>',
    '<h3>Country</h3>',
    '<h3>Destination</h3>',
  ].join("<br>");
});

router.get('/airport/:iso', (ctx,next) => {
  let answer(ctx.params.iso.toUpperCase());

  if (answer.length) {
    ctx.body = answer;
  } else {
    ctx.response.status = 404;
    ctx.body = 'Item Not Found';
  }
  next();
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
