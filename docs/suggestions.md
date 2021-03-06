# Suggestions

## Tillägg till React Native

### React Navigation

Verktyg för att kunna enkelt skapa flera vyer likt hur vi idag är vana vid att mobilapplikationer ser ut, går t.ex. att skapa en footer så vi kan välja mellan olika sidor eller länka vidare till en annan sida i en app.

#### Länkar

* https://reactnavigation.org/
* https://reactnative.directory/ (Generell sida för komponenter skapade av andra utvecklare)

## Testramverk

### Jest

Testramverk för JavaScript som rekommenderas i dokumentation för React Native

### Enzyme

Testramverk för React utvecklat av AirBnB, används ofta i kombination med Jest.

### React Testing Library

Testramverk för React, används ofta i kombination med Jest.

#### Länkar

* https://jestjs.io/
* https://enzymejs.github.io/enzyme/
* https://testing-library.com/docs/react-testing-library/intro/
  
## APIer

### OAuth

Ett sätt att autentisera användare genom att hänvisa dom till att logga in hos en annan tjänst såsom GitHub eller GMail.

#### Länkar

* https://oauth.net/

## Backend Språk

### Rust

Ett alternativ som har disskuteras under ett av mötena, nackdel är att ingen ur gruppen har använt eller stött på språket.

### JavaScript

En möjlig lösning som inte har disskuteras i detalj men inte borde vara så svår att sätta sig in i då gruppen är van med språket. Finns ett väldigt stort urval av olika sorters ramverk som vi kan välja emellan.


### Golang

Ett C-inspirerat språk med skräphantering som stöds av Google med inriktning på distribuerade system, har väldigt C/Java/C++ syntax så det borde inte vara så svårt för gruppen att komma igång med det.

#### Länkar 
* https://www.rust-lang.org/
* https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications (Specifikt för Websockets)
* https://socket.io/ (Utvecklad Websockets)
* https://expressjs.com/ 
* https://nodejs.org/en/
  
## Databaser

### SQLite

Simpel att implementera samt inte särskild avancerad. Beror lite på vad exakt vi ska använda databasen till

### Firebase

Simpel att använda oss av och implementera, kräver ingen client som sköter kommunikation utan allt ligger ju hostat hos Google

### MongoDB

Vanligt val för t.ex. en server i Node.js. Är NoSQL likt Cassandra men ska vara mycket enklare att få igång

#### Länkar
* https://www.sqlite.org/index.html
* https://firebase.google.com/
* https://www.mongodb.com/

## Andra finesser

### Tailwind CSS
Tillägg som förenklar skapande av CSS genom att på förhand definera grundläggande komponenter som skrivs inline hos elementen i DOM-trädet.

#### Länkar

* https://tailwindcss.com/
* https://github.com/vadimdemedes/tailwind-rn 

OBS! React Native stödjer inte specifikt Tailwind utan mha. Tailwind RN fungerar det.
