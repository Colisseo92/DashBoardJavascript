
# WorldFlightInfo - API

API pour un dashboard sur les vols dans le monde

## Informations

Cette API a été réalisée dans le cadre d'un projet scolaire. Elle permet d'avoir accès à des données depuis le dashboard du projet.\
Les fonctions et URLs de l'API possèdent deux versions. Une version faite en Javascript de base et une version faite en programmation fonctionnelle avec la dépendance `Ramda`.
\
L'API étant utilisée dans une interface graphique, nous avions besoin de très peu de temps de latence. Cependant, l'utilisation de Ramda fait que l'API met pas mal de temps à répondre.


Le but du projet étant avant tout d'apprendre la programmation fonctionnelle, nous avons donc réécrit les fonctions avec Ramda pour apprendre son fonctionnement.



## Authors

- [@Colisseo92](https://github.com/Colisseo92)
- [@Orev](https://github.com/Veronique1919)
- [@cKaribou ](https://github.com/cKaribou)


## Related

Autres repositories en lien avec le dashboard

[BackEnd - Javascript](https://github.com/Colisseo92/DashBoardJavascript)\
[Front - Dart/Flutter](https://github.com/Colisseo92/FlutterDashboard)

## API Reference

## Datas

Urls qui permettent d'accéder aux données json non traitées.

| Méthode | Url     | Description                |
| :-------- | :------- | :------------------------- |
| `GET` | /airports_all | Liste de tous les aéroports.|
| `GET` | /airports | Liste de tous les aéroports présents dans des trajets.|
| `GET` | /destination | Liste de tous les trajets.|

## Aéroports
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
| `iata_code` | `string` | **Requis**. Code iata de l'aéroport|

#### Réponse
```python
{
    "name":"nom de l'aéroport",
    "iata_code":"code iata de l'aéroport",
    "city":"ville dans laquelle se situe l'aéroport"
}
```

## 
### Aéroports avec Ramda

Toutes les commandes ci-dessus peuvent aussi utiliser la dépendance Ramda.

| Méthode | Url     | Description                |
| :-------- | :------- | :------------------------- |
| `GET` | /ramda/airports/iata | Liste des codes IATAs des aéroports.|
| `GET` | /ramda/airports/name | Liste des noms des aéroports.|
| `GET` | /ramda/airports/$iata_code | Informations sur un aéroport précis.|


## Pays

Toutes les urls concernant les pays commencent par `/country/$iso_code/`.
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `iso_code` | `string` | **Requis**. Code iso du pays|

### Aéroports
Accèder à la liste des aéroports du pays.
#### Requête
```http
GET /country/$iso_code/airports
```
#### Réponse
```python
[
    {
        "name":"nom de l'aéroport",
        "iso_country":"iso du pays",
        "iata_code":"code Iata de l'aéroport"
    },
    ...
]
```
## 
Accèder à la liste des codes IATAs des aéroports du pays.
#### Requête
```http
GET /country/$iso_code/airports/iata
```
#### Réponse
```python
["IATA1","IATA2","IATA3",...]
```
## 
Accèder à la liste des noms des aéroports du pays.
#### Requête
```http
GET /country/$iso_code/airports/name
```
#### Réponse
```python
["NOM1","NOM2","NOM3",...]
```
## 
Accèder aux informations plus précises des aéroports du pays.
#### Requête
```http
GET /country/$iso_code/airports/info
```
#### Réponse
```python
[
    {
        "name":"nom de l'aéroport",
        "iata_code":"code Iata de l'aéroport",
        "city":"ville où se situe l'aéroport"
    },
    ...
]
```

### Destinations
Accèder à la liste des codes ISOs des pays dans lesquels on peut se rendre depuis le pays choisi.
#### Requête
```http
GET /country/$iso_code/destinations
```
#### Réponse
```python
["ISO1","ISO2","ISO3",...]
```
## 
Accèder à la fréquence depuis le pays choisi vers toutes les destinations disponibles.
#### Requête
```http
GET /country/$iso_code/destinations
```
#### Réponse
```python
[
    {
        "max_value":"fréquence maximale tout pays confondu",
        "data":[
            {"iso":"ISO1",
            "frequence":"fréquence"
            },
            ...
        ]
    }
]
```
## 
Accèder liste des destinations atteignables par pays depuis le pays choisi pour un aéroport précis.
#### Requête
```http
GET /country/$iso_code/destinations/$iata_code
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `iso_code` | `string` | **Requis**. Code iso du pays.|
| `iata_code` | `string` | **Requis**. Code iata de l'aéroport de départ.|

#### Réponse
```python
[
    {
        "iso":"ISO1",
        "airport":[
            {
                "name":"NAME1",
                "iata_code":"IATA1",
                "city":"CITY1"
            },
            ...
        ]
    },
    ...
]
```
### Pays avec Ramda

Toutes les commandes ci-dessus peuvent aussi utiliser la dépendance Ramda.

#### Aéroports

| Méthode | Url     | Description                |
| :-------- | :------- | :------------------------- |
| `GET` | /ramda/country/$iso_code/airports | Liste des aéroports de `iso_code`|
| `GET` | /ramda/country/$iso_code/airports/iata | Liste des codes IATAs des aéroports de `iso_code`|
| `GET` | /ramda/country/$iso_code/airports/name | Liste des noms des aéroports de `iso_code`|
| `GET` | /ramda/country/$iso_code/airports/info | Liste des informations des aéroports de `iso_code`|

## Destinations
Liste des codes ISOs des pays accessibles depuis un aéroport.
#### Requête
```http
GET /destination/$iata_code
```
#### Réponse
```python
["ISO1","ISO2","ISO3",...]
```
## 

