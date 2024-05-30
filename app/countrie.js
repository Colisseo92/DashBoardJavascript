import {getAirportInfos} from "./airports.js";

const getAirportsFromIso = (iso,airport_list) => {
  let airports_list = [];
  for(var line of airport_list['data']){
    if(line.iso_country === iso){
      if(!airports_list.includes(line.iata_code)){
        airports_list.push(line);
      }
    }
  }
  return airports_list; //list of airports for the specified country
};

const getAirportsIataFromIso = (iso,airport_list) => {
  let airports_iata = [];
  for(var line of getAirportsFromIso(iso,airport_list)){
    airports_iata.push(line.iata_code);
  }
  return airports_iata; //list of airports for the specified country
};

const getAirportsNameFromIso = (iso,airport_list) => {
  let airports_name = [];
  for(var line of getAirportsFromIso(iso,airport_list)){
    airports_name.push(line.name);
  }
  return airports_name; //list of airports for the specified country
};

const getAirportsInfosFromIso = (iso,airport_list,destination_list) => {
  let airports_infos = []
  for(var iata of getAirportsIataFromIso(iso,airport_list)){
    airports_infos.push(getAirportInfos(iata,airport_list,destination_list));
  }
  return airports_infos;
};

const getCountryFromIata = (iata,airport_list) => {
  for(var line of airport_list["data"]){
    if(line.iata_code === iata){
      return line.iso_country;
    }
  }
}

export {getAirportsFromIso, getAirportsNameFromIso, getAirportsIataFromIso, getAirportsInfosFromIso};
