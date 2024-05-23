import Koa from "koa";
import Router from "koa-router";
import cors from "@koa/cors";
import {getAirports, getAirportsIata, getAirportsName, getAirportInfos, getDestinations} from "./app/airports.js";
import {
  getAirportsFromIso,
  getAirportsNameFromIso,
  getAirportsIataFromIso,
  getAirportsInfosFromIso
} from "./app/countrie.js";
import {getDestinationFromIso} from "./app/destinations.js";
import {RgetAirportsIata, RgetAirportsName, RgetAirportInfos, RgetCountryFromIata} from "./app/airport_ramda.js";
import {RgetAirportsFromIso, RgetAirportsNameFromIso, RgetAirportsIataFromIso, RgetAirportsInfosFromIso} from "./app/countrie_ramda.js";
import fs from "fs";

//https://www.fbrs.io/ramda/
const app = new Koa();
const router = new Router();

let rawdata = fs.readFileSync('datas/new_airports.json')
let airport_list = JSON.parse(rawdata);
let rawdata2 = fs.readFileSync('datas/new_result.json')
let destination_list = JSON.parse(rawdata2);
let rawdata3 = fs.readFileSync('datas/airport_start.json')
let full_airport_list = JSON.parse(rawdata3);

const pin = 8282;

app.use(cors());

router.get("/", (ctx) => {
  ctx.type = "html";
  ctx.body = [
    "Usable routes :",
    "",
    '<h3>Airports</h3>',
    'GET <a href="http://localhost:'+ pin +'/airports">/airports</a> | Liste des aéroports disponibles',
    'GET <a href="http://localhost:'+ pin +'/airports_all">/airports_all</a> | Liste de tous les aéroports (ne possèdent pas tous des correspondances dans les données de destination)',
    'GET <a href="http://localhost:'+ pin +'/airports/iata">/airports/iata</a> | Liste des codes IATA des aéroports disponibles',
    'GET <a href="http://localhost:'+ pin +'/airports/name">/airports/name</a> | Liste des NOMS des aéroports disponibles',
    'GET <a href="http://localhost:'+ pin +'/airports/CDG">/airports/{iata_code}</a> | Informations sur l\'aéroport renseigné',
    '<h3>Airports w/ Ramda</h3>',
    '<p>Nous avons eu quelques problèmes avec Ramda (surtout niveau performance). Nous avons donc pris la décision de faire deux versions (une avec et une sans ramda) pour respecter les consignes.</p>',
    'GET <a href="http://localhost:'+ pin +'/ramda/airports/iata">/ramda/airports/iata</a> | Liste des codes IATA des aéroports disponibles',
    'GET <a href="http://localhost:'+ pin +'/ramda/airports/name">/ramda/airports/name</a> | Liste des NOMS des aéroports disponibles',
    'GET <a href="http://localhost:'+ pin +'/ramda/airports/CDG">/ramda/airports/{iata_code}</a> | Informations sur l\'aéroport renseigné',
    '<h3>Country</h3>',
    'GET <a href="http://localhost:'+ pin +'/country/FR">/country/{iso_code}</a> | Page principale pour un pays',
    '<h3>Country w/ Ramda</h3>',
    'GET <a href="http://localhost:'+ pin +'/ramda/country/FR">/ramda/country/{iso_code}</a> | Page principale pour un pays',
    '<h3>Destination</h3>',
    'GET <a href="http://localhost:'+ pin +'/destination">/destination</a> | Fichier destination',
  ].join("<br>");
});

router.get("/country/:iso", (ctx) => {
  let country = ctx.params.iso.toUpperCase();
  ctx.type = "html";
  ctx.body = [
    "Actions disponibles pour " + country,
    '<a href=\"http://localhost:'+ pin +'/">retour</a>',
    "",
    '<h3>Airports</h3>',
    'GET <a href="http://localhost:'+ pin +'/country/FR/airports">/country/{iso_code}/airports</a> | Liste des aéroports pour ' + country,
    'GET <a href="http://localhost:'+ pin +'/country/FR/airports/iata">/country/{iso_code}/airports/iata</a> | Liste des codes IATA des aéroports de ' + country,
    'GET <a href="http://localhost:'+ pin +'/country/FR/airports/name">/country/{iso_code}/airports/name</a> | Liste des NOMS des aéroports disponibles de ' + country,
    'GET <a href="http://localhost:'+ pin +'/country/FR/airports/info">/country/{iso_code}/airports/info</a> | Liste avec les informations des aéroports de ' + country,
    '<h3>Destinations </h3>',
    'GET <a href="http://localhost:'+ pin +'/country/FR/destinations">/country/{iso_code}/destinations</a> | Liste des code ISO des pays de destination de ' + country,
  ].join("<br>");
});

router.get("/ramda/country/:iso", (ctx) => {
  let country = ctx.params.iso.toUpperCase();
  ctx.type = "html";
  ctx.body = [
    "Actions disponibles pour " + country,
    '<a href=\"http://localhost:'+ pin +'/">retour</a>',
    "",
    '<h3>Airports w/ Ramda</h3>',
    '<p>Nous avons eu quelques problèmes avec Ramda (surtout niveau performance). Nous avons donc pris la décision de faire deux versions (une avec et une sans ramda) pour respecter les consignes.</p>',
    'GET <a href="http://localhost:'+ pin +'/ramda/country/FR/airports">/ramda/country/{iso_code}/airports</a> | Liste des aéroports pour ' + country,
    'GET <a href="http://localhost:'+ pin +'/ramda/country/FR/airports/iata">/ramda/country/{iso_code}/airports/iata</a> | Liste des codes IATA des aéroports de ' + country,
    'GET <a href="http://localhost:'+ pin +'/ramda/country/FR/airports/name">/ramda/country/{iso_code}/airports/name</a> | Liste des NOMS des aéroports disponibles de ' + country,
    'GET <a href="http://localhost:'+ pin +'/ramda/country/FR/airports/info">/ramda/country/{iso_code}/airports/info</a> | Liste avec les informations des aéroports de ' + country,
  ].join("<br>");
});

//Airport json data
router.get("/airports",(ctx,next) => {
  let answer = getAirports(airport_list);

  if(answer){
    ctx.body = answer;
  }else{
    ctx.response.status=404;
  }
});
//Airport_start json data
router.get("/airports_all",(ctx,next) => {
  let answer = full_airport_list

  if(answer){
    ctx.body = answer;
  }else{
    ctx.response.status=404;
  }
});
//Airport iata list
router.get("/airports/iata",(ctx,next) => {
  let answer = getAirportsIata(airport_list);

  if(answer.length){
    ctx.body = answer;
  }else{
    ctx.response.status=404;
  }
});
//Airport iata list Ramda version
router.get("/ramda/airports/iata",(ctx,next) => {
  let answer = RgetAirportsIata(airport_list["data"]);

  if(answer.length){
    ctx.body = answer;
  }else{
    ctx.response.status=404;
  }
});
//Airport name list
router.get("/airports/name",(ctx,next) => {
  let answer = getAirportsName(airport_list);

  if(answer.length){
    ctx.body = answer;
  }else{
    ctx.response.status=404;
  }
});
//Airport name list Ramda version
router.get("/ramda/airports/name",(ctx,next) => {
  let answer = RgetAirportsName(airport_list["data"]);

  if(answer.length){
    ctx.body = answer;
  }else{
    ctx.response.status=404;
  }
});
//Airport infos
router.get("/airports/:iata",(ctx,next) => {
  let airport = ctx.params.iata.toUpperCase();
  let answer = getAirportInfos(airport,airport_list,destination_list);

  if(answer){
    ctx.body = answer;
  }else{
    ctx.response.status=404;
  }
});
//Airport infos ramda version
router.get("/ramda/airports/:iata",(ctx,next) => {
  let airport = ctx.params.iata.toUpperCase();
  let answer = RgetAirportInfos(airport,airport_list,destination_list);

  if(answer){
    ctx.body = answer;
  }else{
    ctx.response.status=404;
  }
});

//Country airport list
router.get("/country/:iso/airports",(ctx,next) => {
  let country = ctx.params.iso.toUpperCase();
  let answer = getAirportsFromIso(country,full_airport_list);

  if(answer.length){
    ctx.body = answer;
  }else{
    ctx.response.status=404;
  }
});
//Country airport list ramda version
router.get("/ramda/country/:iso/airports",(ctx,next) => {
  let country = ctx.params.iso.toUpperCase();
  let answer = RgetAirportsFromIso(country)(full_airport_list["data"]);

  if(answer.length){
    ctx.body = answer;
  }else{
    ctx.response.status=404;
  }
});
//Country airport list iata
router.get("/country/:iso/airports/iata",(ctx,next) => {
  let country = ctx.params.iso.toUpperCase();
  let answer = getAirportsIataFromIso(country,full_airport_list);

  if(answer.length){
    ctx.body = answer;
  }else{
    ctx.response.status=404;
  }
});
//Country airport list iata ramda version
router.get("/ramda/country/:iso/airports/iata",(ctx,next) => {
  let country = ctx.params.iso.toUpperCase();
  let answer = RgetAirportsIataFromIso(country)(full_airport_list["data"]);

  if(answer.length){
    ctx.body = answer;
  }else{
    ctx.response.status=404;
  }
});
//Country airport list name
router.get("/country/:iso/airports/name",(ctx,next) => {
  let country = ctx.params.iso.toUpperCase();
  let answer = getAirportsNameFromIso(country,full_airport_list);

  if(answer.length){
    ctx.body = answer;
  }else{
    ctx.response.status=404;
  }
});
//Country airport list name ramda version
router.get("/ramda/country/:iso/airports/name",(ctx,next) => {
  let country = ctx.params.iso.toUpperCase();
  let answer = RgetAirportsNameFromIso(country)(full_airport_list["data"]);

  if(answer.length){
    ctx.body = answer;
  }else{
    ctx.response.status=404;
  }
});
//Country airport infos
router.get("/country/:iso/airports/info",(ctx,next) => {
  let country = ctx.params.iso.toUpperCase();
  let answer = getAirportsInfosFromIso(country,full_airport_list,destination_list);

  if(answer.length){
    ctx.body = answer;
  }else{
    ctx.response.status=404;
  }
});
//Country airport infos
router.get("/ramda/country/:iso/airports/info",(ctx,next) => {
  let country = ctx.params.iso.toUpperCase();
  let answer = RgetAirportsInfosFromIso(country,full_airport_list,destination_list);

  if(answer.length){
    ctx.body = answer;
  }else{
    ctx.response.status=404;
  }
});

//Country airport infos
router.get("/country/:iso/destinations",(ctx,next) => {
  let country = ctx.params.iso.toUpperCase();
  let answer = getDestinationFromIso(country,destination_list,full_airport_list);

  if(answer.length){
    ctx.body = answer;
  }else{
    ctx.response.status=404;
  }
});

router.get("/destination",(ctx,next) => {
  let answer = destination_list;

  if(answer){
    ctx.body = answer;
  }else{
    ctx.response.status=404;
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(8282);
