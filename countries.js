const Router = require('koa-router');
const R = require('ramda');

// Prefix all routes with: /items
const router = new Router({
  prefix: '/countries'
});

//Functions
const getAirportsIataByIso = (iso) => R.pipe(
  R.filter(R.where({iso_country: R.equals(iso)})),
  R.map(
    R.prop('iata_code')
  )
)(airports['data']);

const getIsoFromIata = (iata) => R.pipe(
  R.filter(R.where({iata_code: R.equals(iata)})),
  R.map(
    R.prop(('iso_country'))
  ),
  R.head()
)(airports['data'])

const getCountryFromAirport = (iata) => R.pipe(
  R.filter(R.where({from: R.equals(iata)})),
  R.map(
    R.prop('to')
  )
)(data['data']);

let airports = require('./airports.json');
let data = require('./result.json');
// Routes

router.get('/:iata', (ctx,next) => {
  let pre_answer = R.uniq(R.flatten(R.map(getCountryFromAirport,getAirportsIataByIso(ctx.params.iata))));
  let answer = R.map(R.toLower,R.filter(R.isNotNil,R.uniq(R.map(getIsoFromIata,pre_answer))));

  if (answer.length) {
    ctx.body = answer;
    console.log(answer.length);
  } else {
    ctx.response.status = 404;
    ctx.body = 'Item Not Found';
  }
  next();
})

module.exports = router;
