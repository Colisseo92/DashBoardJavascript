
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

#### Get all destination countries

```http
  GET destination/${iso}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `iso` | `string` | **Required**. Iso du pays à fetch|

Retourne les destinations dans lesquelles on peut se rendre depuis `iso`.
`['country1','country2', ...]`

#### Get all destination countries frequency

```http
  GET destination/frequency/${iso}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `iso` | `string` | **Required**. Iso du pays à fetch|

Retourne les destinations dans lesquelles on peut se rendre depuis `iso` avec la fréquence de leurs vols.\
`[{'max_value':x,'data':[{'iso':'','frequence':''},...]}]`

#### Get destination countries from an airport

```http
  GET destination/${iso}/filter/${iata}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `iso`      | `string` | **Required**. Iso du pays à fetch |
| `iata`      | `string` | **Required**. Filtre de l'aéroport de départ |

Retourne la liste des destinations dans lesquelles on peut se rendre depuis le pays `iso` depuis l'aéroport `iata` 

#### Get airports infos of a country

```http
  GET countries/infos/${iso}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `iso`      | `string` | **Required**. Iso du pays à fetch |

Retourne la liste des aéroports du pays `iso` avec leur nom, code iata et ville où ils se situent.
