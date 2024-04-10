const Router = require('koa-router');
const R = require('ramda');

let airports = require('./airports.json');
let data = require('./result.json');

// Prefix all routes with: /items
const router = new Router({
  prefix: '/countries'
});

//Functions
/**
 * Retourner la liste des codes IATA des aéroports du pays entré en paramètre
 * @param iso
 * @returns {*}
 */
const getAirportsIataByIso = (iso) => R.pipe(
  R.filter(R.where({iso_country: R.equals(iso)})),
  R.map(
    R.prop('iata_code')
  )
)(airports['data']);

/**
 * Retourne une liste d'objets contenant les infos des aéroports d'un pays
 * @param country
 * @returns {*}
 */

/*
const getCountryAirports = (country) => R.pipe(
  R.filter(R.where({iso_country: R.equals(country)})),
  R.map(R.omit(['iso_country']))
)(airports['data']);
 */

const getCountryAirports = (iso) => {
  let iata_for_iso = [];
  for(var line of airports['data']){
    if(line.iso_country === iso){
      iata_for_iso.push(line.iata_code);
    }
  }
  return iata_for_iso;
}

const getAirportInfos = (iata) => {
  let airport_obj = {}
  for(let line of airports['data']){
    if(line.iata_code === iata){
      airport_obj["iata_code"] = iata;
      airport_obj["name"] = line.name;
    }
  }
  for(let line of data['data']){
    if(line.to === iata){
      airport_obj['city'] = line.city;
      break;
    }
  }
  return airport_obj;
}

getCountryAirportsInfo = (iso) => {
  return getCountryAirports(iso).map((x) => getAirportInfos(x));
}

console.log(getCountryAirportsInfo('EC'));

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

// Routes

router.get('/:iata', (ctx,next) => {
  let pre_answer = R.uniq(R.flatten(R.map(getCountryFromAirport,getAirportsIataByIso(ctx.params.iata))));
  let answer = R.map(R.toLower,R.filter(R.isNotNil,R.uniq(R.map(getIsoFromIata,pre_answer))));

  if (answer.length) {
    ctx.body = answer;
  } else {
    ctx.response.status = 404;
    ctx.body = 'Item Not Found';
  }
  next();
});

router.get('/infos/:iso', (ctx,next) => {
  let pre_answer = [{iso:ctx.params.iso,airport:getCountryAirportsInfo(ctx.params.iso)}];
  let answer = JSON.parse(JSON.stringify(pre_answer));

  if(answer.length){
    ctx.body = answer;
  }else{
    ctx.response.status=404;
    ctx.body = 'Country Not Found';
  }
});

module.exports = router;
