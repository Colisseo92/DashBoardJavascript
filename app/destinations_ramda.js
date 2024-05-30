import * as R from "ramda";
import fs from "fs";
import {RgetAirportsIataFromIso} from "./countrie_ramda.js";
import {RgetCountryFromIata} from "./airport_ramda.js";

let rawdata = fs.readFileSync('../datas/new_airports.json')
let airport_list = JSON.parse(rawdata);
let rawdata2 = fs.readFileSync('../datas/new_result.json')
let destination_list = JSON.parse(rawdata2);
let rawdata3 = fs.readFileSync('../airport_start.json')
let full_airport_list = JSON.parse(rawdata3);

const isDestinationValid = (iso,airport_list) => {
  let country_airport = RgetAirportsIataFromIso(iso)(airport_list["data"]);
  return (line) => country_airport.includes(line.from) && !country_airport.includes(line.to);
};

const RgetDestinationFromIso = (iso) => R.pipe(
  R.filter(isDestinationValid(iso,airport_list)),
  R.map(R.prop("to")),
  R.map((iata) => RgetCountryFromIata(iata)(airport_list["data"])),
  R.uniq
);

const RgetDestinationFromIsoFromIata = (iata,airport_list) => R.pipe(
  R.filter(R.propEq(iata,"from")),
  R.map(R.prop("to")),
  R.map((destination) => RgetCountryFromIata(destination)(airport_list["data"])),
  R.filter((destination) => destination !== RgetCountryFromIata(iata)(airport_list["data"])),
  R.filter((destination) => destination !== undefined),
  R.uniq
);


const RgetDestinationFrequency = (iso,destination_list,airport_list) => [{max_value:highest,data:result_list}]
