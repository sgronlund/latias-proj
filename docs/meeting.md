# Mötesprotokoll

## Påskmöte 31/03/21

Kort avstämningsmöte där vi kollade om hur det gått för gruppen att arbeta individuellt under påsken. Punkter som togs upp under mötet var hur gruppen upplevde React Native och t.ex. vilka val vi behöver göra längre fram såsom vilket språk vi ska välja för servern, ingen spikades utan mötet var mer en diskussion.

Alla som kunde närvarade under mötet och de som inte kunde meddelade om att de inte kunde samt så valdes preliminärt ingen tid för nästa möte.

## Arbetsmöte 05/04/21

### Mötespunkter

* Rapport utkast

* Clockify

* Uppdelning av arbetsgrupper
  * Vad vill vi göra denna och nästa vecka (2 veckors sprint)?

* Arbetsområden (Design, automation, val av verktyg)

### Mötesbestämmelser

Under mötet valde vi att dela upp oss i tre grupper, två som utvecklar två olika designprototyper och den tredje gruppen skulle sätte igång med att få GitHub repot automatiserat samt börja kika på första rapport utkastet. Under mötet bestämde vi även oss för att använda Clockify för att kunna börja tidslogga och helt enkelt hålla koll på vem som arbetar med vad som inte direkt går att se i GitHub repot. Vi tog även beslut i att köra SQLite som databas till en början och använda React Native som språk för vår frontend.

Denna uppdelning skall preliminärt vara denna vecka och förhoppningsvis utvecklas under veckan till nya arbetsområden så att projektet faktiskt kan sätta igång.

Alla kunde för övrigt närvaro vid mötet och gruppen planerar att ha ett kortare standupmöte imorgon den vanliga tiden.

## Arbetsmöte 06/04/21

Kortare möte där vi diskuterade och visade de olika designprototyperna så som de ser ut nu. Det nämndes även lite kort vad som hade hänt på back-end sidan och vi har valt att använda oss av JavaScript som back-end språk samt SQLite (troligtvis) som vår databas. Vi planerar att prata mer om designen och möjligtvis ta ett beslut då om vilken av designerna som vi vill fortsätta med.

## Arbetsmöte 07/04/21

Kortare möte där vi diskuterade och visade hur långt vi har kommit med prototypen som innebär kommunikation mellan client och server samt valde design. Vår design kommer vara en kombination av den prototyp som Kimiya och Fanny utvecklade.
Under mötet diskuterade vi även exakta upplägget av hur funktionaliteten hos de olika quizzen, ett förslag på detta kommer skrivas som kommer att diskuteras på morgondagens möte.

Alla förutom Richard närvarade på mötet.

## Arbetsmöte 08/04/21

Vanlig standup där vi diskuterade hur dagen skulle gå till. Ingen större diskuterades under mötet utan arbete fortskred likt förra arbetspasset.

Alla närvarande under mötet.

## Arbetsmöte 09/04/21

Idag diskuterade vi hur vi ska börja med front-end:n och vem ska göra vilken sida av appen och backenden ska fortsätta kolla på säkerhetslösningar för trafiken och lagringen i databasen.  Produktnamnet valdes även idag och de blev "The Real Deal".

Alla närvarade under mötet.

## Arbetsmöte 12/04/21

Idag bestämde sig gruppen att köra igång med föreberedelse av presentationen till Milestone 1 då vi har uppnått den interna deadlinen vi satt. Inget övrigt diskuterades under mötet.

Alla närvarade under mötet.

## Arbetsmöte 13/04/21

Idag planerar vi att fortsätta med föreberedelsen av presentationen. Vi kommer även att jobba samtidigt med den delar av front-enden och testning av backenden.

Alla närvarande under mötet.

## Arbetsmöten 14-15/04/21

Inget större diskuterades under dessa möten och arbete satt igång relativt hastigt.

Alla närvarade under mötet.

## Arbetsmöte 16/04/21

### Vad gjorde vi igår?

Fixade logout funktionalitet samt utvecklarkonton så att det går att lägga till frågor.

### Vi tänker vi göra idag?

Potentiellt påbörja en skiss på implementation av ett sätt att hämta frågor från servern till klienten på ett smidigt sätt. Just nu verkar det som vi skicka frågor fram och tillbaka mellan varje sida eller spara alla frågor i enheten lokala lagring.

Göra om delar av frontend så att allt med sockets ligger på ett och samma ställe.

### Några problem?

#### Fixa fonten så att det funkar till mobila enheter

* Borde gå att fixa med [expo-fonts](https://docs.expo.io/versions/latest/sdk/font/)

### Andra punkter

Rapport utkast 2 in nästa vecka!

## Arbetsmöte 19/04/21

Denna vecka började vi att planer mer i detalj vad vi ska göra de kommande veckorna innan milestone 2.

### Veckoplan

#### Vecka 16

* Rapporten.
* Inloggning + Krypterad kommunikation + vyn till inloggning

#### Vecka 17

* Få själva spelet fungera.

#### Vecka 18

* Någon form av lösning på responsiva designen.
* Poängsystem.
* Shoppen.

## Arbetsmöte 20/04/21

### Vad gjorde vi igår?

* Började på andra utkastet till rapporten
* Började utveckla det faktiska spelet
* Började ändra inloggningsvyn

### Vi tänker vi göra idag?

* Fortsätta med rapporten.
* Fortsätta att fixa inloggningsvyn.
* Poängsystem/Scoreboard
* Shop
* Kolla om det är svårt att implementera ljud

### Några problem?

* Ikoner verkar inte fungera på Android-enheter.

### Andra punkter

Inget att kommentera.

## Arbetsmöte 21/04/21

### Vad gjorde vi igår?

* Inloggningvyn
* Fortsatt på rapporten
* Började kolla på scoreboard
* Kollade på hur det är att implementera ljud.

### Vi tänker vi göra idag?

* Merge alla PRs först!
* Shoppen
* Scoreboard / Poäng
* Ta bort frontend-testerna, just nu har det inte hjälp oss att ha dom kvar för dom låter oss inte testa vissa komponenter pga. imports.

### Några problem?

* Hitta top 5 av alla i databasen. Kan vara en idé att ha en separat tabell med endast användarnamn och poäng.

### Andra punkter

Inget att kommentera.

## Arbetsmöte 22/04/21

### Vad gjorde vi igår?

* Mergade alla PR.
* Shoppen klar.
* Scoreboard är på gång.
* Frontend testerna borta

### Vi tänker vi göra idag?

* Få utkast 2 klart (läsa igenom och kanske skriva något nytt).

* Fortsätta med scoreboard.

* Timer i nutidsquiz:et.

### Några problem?

### Andra punkter

Inget att kommentera.

## Arbetsmöte 23/04/21

### Vad gjorde vi igår?

* Fixade timer
* Fortsatta med scoreboard
* Skrev lite på rapporten

### Vi tänker vi göra idag?

* Få utkast 2 klart (läsa igenom och kanske skriva något nytt).

* Fortsätta med scoreboard.(kanske?)

### Några problem?

Inget att kommentera.

### Andra punkter

Inget att kommentera.

## Arbetsmöte 26/04/21

### Vad gjorde vi igår (Fredags)?

* Genomgång av systemet

* Fick färdigt utkast 2

* Funktionaliteten hos Scoreboard klar

### Vi tänker vi göra idag?

* Få en Score-komponent. (Richard, Niclas)
  
* Styling på Shop. (Aishe, Kimiya)
  
* Få in bild istället för produktnamn. (Sebastian)

* Vänteskärmen till artikeletquizet. (Jakob)

### Några problem?

Inget att kommentera.

### Andra punkter

Inget att kommentera.
