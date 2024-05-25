import {getAirportInfos, getCountryFromIata} from "./airports.js";
import {getAirportsIataFromIso} from "./countrie.js";
import fs from "fs";

let rawdata = fs.readFileSync('../datas/new_airports.json')
let airport_list = JSON.parse(rawdata);
let rawdata2 = fs.readFileSync('../datas/new_result.json')
let destination_list = JSON.parse(rawdata2);
let rawdata3 = fs.readFileSync('../airport_start.json')
let full_airport_list = JSON.parse(rawdata3);

const getDestinationFromIso = (iso,destination_list,airport_list) => {
  let destination_country = [];
  let country_airports = getAirportsIataFromIso(iso,airport_list);
  for(var line of destination_list["data"]){
    if(!country_airports.includes(line.to)){
      if(country_airports.includes(line.from)) {
        let country_code = getCountryFromIata(line.to,airport_list);
        if(!destination_country.includes(country_code) && country_code !== undefined){
          destination_country.push(country_code);
        }
      }
    }
  }
  return destination_country;
};


const getDestinationFromIsoFromIata = (iata, destination_list,airport_list) => {
  let destination_iso = []
  let country = getCountryFromIata(iata,airport_list);
  for(let line of destination_list["data"]){
    if(line.from === iata){
      let destination = getCountryFromIata(line.to,airport_list);
      if(destination !== country) {
        if (destination !== undefined && !destination_iso.includes(destination)) {
          destination_iso.push(destination);
        }
      }
    }
  }
  return destination_iso;
};

const getDestinationDataFromIso = (iso,destination_list,airport_list) => {
  let destination_datas = [];
  let country_airport = getAirportsIataFromIso(iso,airport_list);
  for(var line of destination_list["data"]){
    if(country_airport.includes(line.from)){
      destination_datas.push(line);
    }
  }
  return destination_datas;
};

const getJourneyWeeklyFlights = (journey) => {
  return Number(journey.flights_per_day)*Number(journey.flight_days.length);
}

const getMeanOfList = (list) => {
  return list.reduce((v,k) => v+k,0)/list.length;
}

const getDestinationFlightFrequency = (iso,destination_list,airport_list) => {
  let country_weekly_flights_list = {};
  let country_weekly_flights_mean = {}
  let result_list = [];
  getDestinationFromIso(iso,destination_list,airport_list).forEach((country) => country_weekly_flights_list[country] = []);
  getDestinationDataFromIso(iso,destination_list,airport_list).forEach((journey) => {
    let destination_country = getCountryFromIata(journey.to,airport_list);
    if(destination_country in country_weekly_flights_list){
      country_weekly_flights_list[destination_country].push(getJourneyWeeklyFlights(journey));
    }
  });
  Object.keys(country_weekly_flights_list).forEach((country) => country_weekly_flights_mean[country] = Math.round(getMeanOfList(country_weekly_flights_list[country])));
  let highest = Math.max(...Object.values(country_weekly_flights_mean));
  Object.keys(country_weekly_flights_mean).forEach((key) => {
    result_list.push({iso:key,frequence:country_weekly_flights_mean[key]});
  });
  return Object.keys(country_weekly_flights_mean).length !== 0 ? [{max_value:highest,data:result_list}] : undefined;
}

const getDestinationCountryWithAirportListFromIata = (iso,iata,destination_list,airport_list) => {
  let destination_countries = {};
  let returned = [];
  let country_airport = getAirportsIataFromIso(iso,airport_list);
  getDestinationFromIso(iso,destination_list,airport_list).forEach((country) => destination_countries[country] = []);
  for(var line of destination_list["data"]){
    if(line.from === iata){
      if(!country_airport.includes(line.to)){
        let destination = getCountryFromIata(line.to,airport_list);
        if(destination !== undefined){
          destination_countries[destination].push(getAirportInfos(line.to,airport_list,destination_list));
        }
      }
    }
  }
  Object.keys(destination_countries).forEach((country) => returned.push({iso:country,airport:destination_countries[country]}));
  return returned;
};

export {getDestinationFromIso,getDestinationFromIsoFromIata, getDestinationFlightFrequency,getDestinationCountryWithAirportListFromIata};
