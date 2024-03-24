import * as R from 'ramda';
import data from './airports.json' with {type:'json'}

const getAirportsData = () => data['data'];

const getAirportsIataByIso = (iso) => R.pipe(
  R.filter(R.where({iso_country: R.equals(iso)})),
  R.map(
    R.prop('iata_code')
  )
)(getAirportsData());

const getAirportNameByIata = (iata) => R.pipe(
  R.filter(R.where({iata_code: R.equals(iata)})),
  R.map(
    R.prop('name')
  ),
  R.head()
)(getAirportsData());

const getAirportIsoList = () => R.pipe(
  R.map(
    R.prop('iso_country')
  ),
  R.uniq()
)(getAirportsData());

console.log(getAirportsIataByIso('DE'));
console.log(getAirportNameByIata('CDG'))
