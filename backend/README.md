# DobleAmarilla Scores (backend)

## Backend

Construido en Laravel, provee una API REST para administrar:

- Equipos
- Torneos
- Partidos

## Endpoints principales

Equipos:
GET   /api/equipos
POST  /api/equipos
GET   /api/equipos/{id}
PATCH /api/equipos/{id}

Torneos:
GET   /api/torneos
POST  /api/torneos
GET   /api/torneos/{id}
PATCH /api/torneos/{id}

Partidos:
GET   /api/partidos
POST  /api/partidos
GET   /api/partidos/{id} 
PATCH /api/partidos/{id}

## Filtros de partidos

El indice de equipos puede filtrarse con los siguientes parametros

/api/games?team_id={id}
/api/games?tournament_id={id}
/api/games?sort=match_day
/api/games?sort=-match_day



