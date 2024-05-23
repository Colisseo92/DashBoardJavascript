import {RgetAirportInfos} from "./airport_ramda.js";
import * as R from "ramda";
import fs from "fs";

//let rawdata = fs.readFileSync('../datas/new_airports.json')
//let airport_list = JSON.parse(rawdata);
//let rawdata2 = fs.readFileSync('../datas/new_result.json')
//let destination_list = JSON.parse(rawdata2);
//let rawdata3 = fs.readFileSync('../airport_start.json')
//let full_airport_list = JSON.parse(rawdata3);

const RgetAirportsFromIso = (iso) => R.pipe(
  R.filter(R.propEq(iso,"iso_country")),
  R.uniq
);

const RgetAirportsIataFromIso = (iso) => R.pipe(
  R.filter(R.propEq(iso,"iso_country")),
  R.uniq,
  R.map(R.prop("iata_code"))
);

const RgetAirportsNameFromIso = (iso) => R.pipe(
  R.filter(R.propEq(iso,"iso_country")),
  R.uniq,
  R.map(R.prop("name"))
);

const RgetAirportsInfosFromIso= (iso,airport_list,destination_list) => {
  return RgetAirportsIataFromIso(iso)(airport_list["data"]).map(iata => RgetAirportInfos(iata,airport_list,destination_list));
};

const RgetCountryFromIata = (iata) => R.pipe(
  R.filter(R.propEq(iata,"iata_code")),
  R.head,
  R.prop("iso_country")
);

export {RgetAirportsFromIso, RgetAirportsNameFromIso, RgetAirportsIataFromIso, RgetAirportsInfosFromIso};
