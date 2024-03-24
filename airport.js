const Router = require('koa-router');
const R = require('ramda');

// Prefix all routes with: /items
const router = new Router({
  prefix: '/airport'
});

//Functions
const getAirportsIataByIso = (iso) => R.pipe(
  R.filter(R.where({iso_country: R.equals(iso)})),
  R.map(
    R.prop('iata_code')
  )
)(data['data']);

let data = require('./airports.json');
// Routes
router.get('/', (ctx, next) => {
  ctx.body = data['data'];
  next();
});

router.get('/:iso', (ctx,next) => {
  let answer = getAirportsIataByIso(ctx.params.iso.toUpperCase());

  if (answer.length) {
    ctx.body = answer;
  } else {
    ctx.response.status = 404;
    ctx.body = 'Item Not Found';
  }
  next();
})

module.exports = router;
