//
//
//
const destination_airport = require("../datas/airports2.json");

const getCountryAirportsIatas = (iso) => {
  let airport_iatas = [];
  for(var line of destination_airport['data']){
    if(line.iso_country === iso){
      if(!airport_iatas.includes(line.iata_code)){
        airport_iatas.push(line.iata_code);
      }
    }
  }
  return airport_iatas; //list of airports for the specified country
}

console.log(getCountryAirportsIatas("FR"));
