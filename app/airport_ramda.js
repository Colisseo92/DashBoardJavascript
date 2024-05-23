import * as R from "ramda";

const RgetAirportsIata = R.map(R.prop('iata_code'));

const RgetAirportsName = R.map(R.prop('name'));

const RgetCityFromIata = (iata) => R.pipe(
  R.filter(R.propEq(iata,"to")),
  R.map(R.prop("city")),
  R.uniq,
  R.head
);
const RgetAirportNameFromIata = (iata) => R.pipe(
  R.filter(R.propEq(iata,"iata_code")),
  R.head,
  R.prop("name")
);

const RgetAirportInfos = (iata,airport_list,destination_list) => {
  let airport_infos = {};
  airport_infos.name = '';
  airport_infos.iata_code = '';
  airport_infos.city='';
  airport_infos.name = RgetAirportNameFromIata(iata)(airport_list["data"]);
  airport_infos.iata_code = iata;
  airport_infos.city = RgetCityFromIata(iata)(destination_list["data"]);
  return airport_infos;
};

const RgetCountryFromIata = (iata) => R.pipe(
  R.filter(R.propEq(iata,'iata_code')),
  R.head,
  R.prop("iso_country")
);

export {RgetAirportsIata, RgetAirportsName, RgetAirportInfos, RgetCountryFromIata};
