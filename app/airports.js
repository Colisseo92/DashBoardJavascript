
const getAirports = (airport_list) => {
  return airport_list;
};

const getDestinations = (destination_list) => {
  return destination_list;
};

const getAirportsIata = (airport_list) => {
  let airports_iata = [];
  for(var line of airport_list["data"]){
    airports_iata.push(line.iata_code);
  }
  return airports_iata;
};

const getAirportsName = (airport_list) => {
  let airports_iata = [];
  for(var line of airport_list["data"]){
    airports_iata.push(line.name);
  }
  return airports_iata;
};

const getAirportInfos = (iata,airport_list,destination_list) => {
  let airport_infos = {}
  airport_infos.name = '';
  airport_infos.iata_code = '';
  airport_infos.city='';
  for(var line of airport_list["data"]){
    if(line.iata_code === iata){
      airport_infos.name = line.name;
      airport_infos.iata_code = iata;
    }
  }
  for(var line of destination_list["data"]){
    if(line.to === iata){
      airport_infos.city = line.city;
      break;
    }
  }
  return airport_infos;
};

const getCountryFromIata = (iata,airport_list) => {
  for(var line of airport_list["data"]){
    if(line.iata_code === iata){
      return line.iso_country;
    }
  }
};

export {getAirports, getAirportsIata, getAirportsName, getAirportInfos, getDestinations, getCountryFromIata};

