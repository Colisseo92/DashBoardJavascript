const Router = require('koa-router');
const R = require('ramda');

// Prefix all routes with: /items
const router = new Router({
  prefix: '/destination'
});

//FILES
let data = require('./airports.json');
let result = require('./result.json');

/**
 * Fonction qui retourne une liste des aéroports dans lesquels on peut se rendre à partir d'un pays
 * @param country
 * @returns {*}
 * [{name:,iata_code},{},...] pour tous les aéroports du pays
 */
const getCountryAirports = (country) => R.pipe(
  R.filter(R.where({iso_country: R.equals(country)})),
  R.map(R.omit(['iso_country']))
)(data['data']);

/**
 * Retourne la liste des codes iata des aéroports du pays entré en paramètre
 * @param country
 * @returns list
 * [iata1,iata2,...]
 */
const getCountryAirportsIata = (country) => R.pipe(
  R.filter(R.where({iso_country: R.equals(country)})),
  R.map(R.prop('iata_code'))
)(data['data']);

const associateIsoAirports = R.pipe(
  R.map((country) => ({[country]: getCountryAirports(country)})),
  R.mergeAll()
);

/**
 * Retourne le code iso du pays dans lequel se situes l'aéroport entré en paramètre
 * @param iata
 * @returns string
 */
const getCountryFromAirportIata = (iata) => R.pipe(
  R.filter(R.where({iata_code: R.equals(iata)})),
  R.map(R.prop('iso_country')),
  R.head
)(data['data']);

/**
 * Retourne les codes isos de tous les pays dans lesquels on peut se rendre à partir de l'aéroport entré en paramètre
 * @param iata
 * @returns list [iso1,iso2,...]
 */
const getDestinationCountryFromAirportIata = (iata) => R.pipe(
  R.filter(R.where({from: R.equals(iata)})), //propEqual
  R.map(R.prop('to')),
  R.map(getCountryFromAirportIata),
  R.uniq,
  R.filter(R.isNotNil),
)(result['data']);

/**
 * Retourne une liste de tous les pays dans lesquels on peut se rendre à partir du pays entré en paramètre
 * @param iso
 * @returns list
 * [iso1,iso2,...]
 */
const getDestinationCountryFromCountry = (iso) => R.uniq(R.flatten(R.map(getDestinationCountryFromAirportIata,getCountryAirportsIata(iso))));

//console.log(getDestinationCountryFromAirportIata('CDG'));
//.log(associateIsoAirports(getDestinationCountryFromAirportIata('CDG')));
//console.log(getCountryAirports('FR'));
//console.log(getCountryAirportsIata('FR'));


const createCountryObject = (country) => {return {iso: country, airport: getCountryAirports(country)}};

const getResult = R.map(createCountryObject);

router.get('/:iata', (ctx,next) => {
  console.log(ctx.params.iata);
  let answer = getResult(getDestinationCountryFromCountry(ctx.params.iata));
  let ab = JSON.parse(JSON.stringify(answer));

  console.log(ab);

  if (answer) {
    ctx.body = ab;
  } else {
    ctx.response.status = 404;
    ctx.body = 'Country not found';
  }
  next();
})

module.exports = router;

