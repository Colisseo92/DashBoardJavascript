
# WorldFlightInfo - API

API pour un dashboard sur les vols dans le monde

## Informations

Cette API a été réalisée dans le cadre d'un projet scolaire. Il permet d'avoir accès à des données depuis le dashboard du projet.


## Authors

- [@Colisseo92](https://github.com/Colisseo92)
- [@Orev](https://github.com/Veronique1919)
- [@cKaribou ](https://github.com/cKaribou)


## Related

Autres repositories en lien avec le dashboard

[BackEnd - Javascript](https://github.com/Colisseo92/DashBoardJavascript)\
[Front - Dart/Flutter](https://github.com/Colisseo92/FlutterDashboard)
## API Reference

### Airport

#### Get all destination countries

```http
  GET /airports
```
```http
  GET /airports_all
```
```http
  GET /airports/iata
```
```http
  GET /airports/name
```
```http
  GET /airports/:iata_code
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `iata_code` | `string` | **Required**. Code iata de l'aéroport|

### Airport avec Ramda
```http
  GET /ramda/airports/iata
```
```http
  GET /ramda/airports/name
```
```http
  GET /ramda/airports/:iata_code
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `iata_code` | `string` | **Required**. Code iata de l'aéroport|


### Country

#### Airport
```http
/country/:iso_code
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `iso_code` | `string` | **Required**. Code iso du pays|

```http
  GET /country/:iso_code/airports
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `iso_code` | `string` | **Required**. Code iso du pays|

```http
  GET /country/:iso_code/airports/iata
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `iso_code` | `string` | **Required**. Code iso du pays|

```http
  GET /country/:iso_code/airports/name
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `iso_code` | `string` | **Required**. Code iso du pays|

```http
  GET /country/:iso_code/airports/info
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `iso_code` | `string` | **Required**. Code iso du pays|


#### Destinations
```http
  GET /country/:iso_code/destinations
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `iso_code` | `string` | **Required**. Code iso du pays|

```http
  GET /country/:iso_code/destinations/frequency
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `iso_code` | `string` | **Required**. Code iso du pays|

```http
  GET /country/:iso_code/destinations/:iata_code
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `iso_code` | `string` | **Required**. Code iso du pays|
| `iata_code` | `string` | **Required**. Code iata de l'aéroport du pays spécifié|

### Country avec Ramda

```http
/ramda/country/:iso_code
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `iso_code` | `string` | **Required**. Code iso du pays|

```http
  GET /ramda/country/:iso_code
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `iso_code` | `string` | **Required**. Code iso du pays|

```http
  GET /ramda/country/:iso_code/airports
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `iso_code` | `string` | **Required**. Code iso du pays|

```http
  GET /ramda/country/:iso_code/airports/iata
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `iso_code` | `string` | **Required**. Code iso du pays|

```http
  GET /ramda/country/:iso_code/airports/name
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `iso_code` | `string` | **Required**. Code iso du pays|

```http
  GET /ramda/country/:iso_code/airports/info
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `iso_code` | `string` | **Required**. Code iso du pays|


### Destination
```http
  GET /destination
```
```http
  GET /destination/:iata_code
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `iata_code` | `string` | **Required**. Code iata de l'aéroport|
