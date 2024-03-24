import Koa from 'koa';

const app = new Koa();

// response
app.use(ctx => {
  ctx.body = '{This is a json formated text}';
});

app.listen(3000);
