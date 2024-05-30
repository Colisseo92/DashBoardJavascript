
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

### Datas

Urls qui permettent d'accéder aux données json non traitées.

| Méthode | Url     | Description                |
| :-------- | :------- | :------------------------- |
| `GET` | /airports_all | Liste de tous les aéroports.|
| `GET` | /airports | Liste de tous les aéroports présents dans des trajets.|
| `GET` | /destination | Liste de tous les trajets.|

### Aéroports
Accèder à la liste de tous les codes IATAs des aéroports de `/airports`.
#### Requête
```http
GET /airports/iata
```
#### Réponse
```python
["POM","KEF","PRN","YEG","YHZ","YOW","YUL","YVR","YYC","YYJ","YYT","YYZ","ALG",...]
```
## 
Accèder à la liste de tous les noms des aéroports de `/airports`.
#### Requête
```http
GET /airports/name
```
#### Réponse
```python
["Port Moresby Jacksons International Airport","Keflavik International Airport",...]
```
## 
Accèder aux informations précises d'un aéroport en particulier.
#### Requête
```http
GET /airports/$iata_code
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `iata_code` | `string` | **Requit**. Code iata de l'aéroport|

#### Réponse
```python
{
    "name":"nom de l'aéroport",
    "iata_code":"code iata de l'aéroport",
    "city":"ville dans laquelle se situe l'aéroport"
}
```

## 
#### Aéroports avec Ramda

Toutes les commandes ci-dessus peuvent aussi utiliser la dépendance Ramda.

| Méthode | Url     | Description                |
| :-------- | :------- | :------------------------- |
| `GET` | /ramda/airports/iata | Liste des codes IATAs des aéroports.|
| `GET` | /ramda/airports/name | Liste des noms des aéroports.|
| `GET` | /ramda/airports/$iata_code | Informations sur un aéroport précis.|


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
