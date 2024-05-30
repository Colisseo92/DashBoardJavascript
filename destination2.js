const Router = require('koa-router');
const R = require('ramda');

// Prefix all routes with: /items
const router = new Router({
  prefix: '/destination'
});

let data = require('./datas/new_airports.json');
let airport_start = require('./airport_start.json');
let result = require('./datas/new_result.json');


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

const getCountryAirport = (iso) => {
  let iata_for_iso = [];
  for(var line of airport_start['data']){
    if(line.iso_country === iso){
      if(!iata_for_iso.includes(line.iata_code)){
        iata_for_iso.push(line.iata_code);
      }
    }
  }
  return iata_for_iso;
}

const getCountryFromAirport = (iata) => {
  for(let line of data["data"]){
    if(line.iata_code === iata){
      return line.iso_country;
    }
  }
}

const getDestinationCountry = (iso) => {
  let country_airport = getCountryAirport(iso);
  let destination_iso = []
  for(let line of result['data']){
    let destination = line.to;
    if(country_airport.includes(line.from)){
      let country = getCountryFromAirport(destination);
      if(!destination_iso.includes(country)){
        if(country !== undefined){
          if(country !== iso){
            destination_iso.push(country);
          }
        }
      }
    }
  }
  return destination_iso;
}

const getMeanOf = (liste) => {
  let sum = 0;
  for(let value of liste) {
    sum += value;
  }
  return sum/liste.length;
}

const getCountryFrequency = (iso) => {
  let iata_for_iso = getCountryAirport(iso);
  let destination_country = getDestinationCountry(iso);
  let temp_obj = {};
  let obj = {};
  let result_list = [];
  let target = [];
  for(let airport of iata_for_iso){
    for(let line of result['data']){
      if(line.from === airport){
        target.push(line);
      }
    }
  }
  destination_country.forEach((x) => temp_obj[x] = []);
  for(let trajet of target){
    let flight_per_week = Number(trajet.flights_per_day)*Number(trajet.flight_days.length);
    let trajet_country = getCountryFromAirport(trajet.to);
    if(trajet_country in temp_obj){
      temp_obj[trajet_country].push(flight_per_week);
    }
  }
  Object.keys(temp_obj).forEach((key) => obj[key] = getMeanOf(temp_obj[key]));
  let highest = 0;
  Object.keys(obj).forEach((key) => obj[key] = Math.round(obj[key]));
  Object.values(obj).forEach((value) => {
    highest = value > highest ? value : highest;
  })
  Object.keys(obj).forEach((key) => {
    result_list.push({iso:key,frequence:obj[key]});
  })
  return Object.keys(obj).length !== 0 ? [{max_value:highest,data:result_list}] : undefined;
};

/*
const getDestinationCountryFromAirportIata = (iata) => R.pipe(
  R.filter(R.where({from: R.equals(iata)})), //propEqual
  R.map(R.prop('to')),
  R.map(getCountryFromAirportIata),
  R.uniq,
  R.filter(R.isNotNil),
)(result['data']);

 */

/**
 * Retourne un objet contenant les informations de l'aéroport entré en paramètre
 * @param iata
 * @returns {{}}
 */
const getAirportInfos = (iata) => {
  let airport_obj = {}
  airport_obj['city'] = '';
  airport_obj['iata_code'] = '';
  airport_obj['name'] = '';
  for(let line of data["data"]){
    if(line.iata_code === iata){
      airport_obj["iata_code"] = iata;
      airport_obj["name"] = line.name;
    }
  }
  for(let line of result['data']){
    if(line.to === iata){
      airport_obj['city'] = line.city;
      break;
    }
  }
  return airport_obj;
}

const getDestinationCountryv2 = (iso) => {
  let destination_country = getDestinationCountry(iso);
  let result = []
  for(let country of destination_country){
    let obj = {"iso":country,"airport":[]};
    for(let airport of getCountryAirport(country)){
      let airport_info = getAirportInfos(airport);
      if(Object.keys(airport_info).length !== 0){
        if(airport_info['name'] !== ""){
          if(airport_info['iata'] !== ""){
            obj["airport"].push(airport_info);
          }
        }
      }
    }
    result.push(obj);
  }
  return result;
}


const getDestinationCountryFromAirport = (iso,iata) => {
  let destination_iso = []
  for(let line of result['data']){
    let destination = line.to;
    if(line.from === iata){
      let country = getCountryFromAirport(destination);
      if(!destination_iso.includes(country)){
        if(country !== undefined){
          if(country !== iso){
            destination_iso.push(country);
          }
        }
      }
    }
  }
  return destination_iso;
}

const getCountryAirportWithFilter = (iso,iata) => {
  let iata_for_iso = [];
  for(var line of data['data']){
    if(line.iso_country === iso){
      iata_for_iso.push(line.iata_code);
    }
  }
  return iata_for_iso;
}

const getDestinationCountryWithAirportFilter = (iso,iata) => {
  let destination_country = getDestinationCountryFromAirport(iso,iata);
  let from_airport = getCountryAirport(iso);
  let returned = []
  let object = {}
  destination_country.forEach((country) => object[country] = []);
  for(let line of result['data']){
    if(line.from === iata){
      if(!from_airport.includes(line.to)){
        let airport_info = getAirportInfos(line.to);
        let country = getCountryFromAirport(line.to);
        if(country !== undefined){
          object[country].push(airport_info);
        }
      }
    }
  }
  Object.keys(object).forEach((iso) => returned.push({"iso":iso,"airport":object[iso]}));
  return returned;
}
//console.log(getAirportInfos('CDG'));

const createCountryObject = (country) => {return {iso: country, airport: getCountryAirports(country)}};

const getResult = R.map(createCountryObject);

router.get('/:iata', (ctx,next) => {
  let answer = getDestinationCountryv2(ctx.params.iata);
  let ab = JSON.parse(JSON.stringify(answer));


  if (answer) {
    ctx.body = ab;
  } else {
    ctx.response.status = 404;
    ctx.body = 'Country not found';
  }
  next();
});

router.get('/:iso/filter/:iata',(ctx,next) => {
  let answer = getDestinationCountryWithAirportFilter(ctx.params.iso,ctx.params.iata);
  let ab = JSON.parse(JSON.stringify(answer));

  if (answer) {
    ctx.body = ab;
  } else {
    ctx.response.status = 404;
    ctx.body = 'Country not found';
  }
  next();
});

router.get('/frequency/:iso',(ctx,next) => {
  let preAnswer = getCountryFrequency(ctx.params.iso);

  if(preAnswer !== undefined){
    ctx.body = JSON.parse(JSON.stringify(preAnswer));
  }else{
    ctx.response.status = 404;
    ctx.body = "Country Not Found";
  }
  next();
});


module.exports = router;

