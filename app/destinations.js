import {getCountryFromIata} from "./airports.js";
import {getAirportsIataFromIso} from "./countrie.js";

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

export {getDestinationFromIso};
