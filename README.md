# EcoIndex Computor

EcoIndex Computor est un projet qui fournit les méthodes de calcul de l'EcoIndex.
Il est basé sur le travail de l'association [GreenIT](https://www.greenit.fr/) 
et de sa web extension [GreenIT-Analysis](https://github.com/cnumr/GreenIT-Analysis/).

Les sources s'appuient sur le core de la Web Extension ([https://github.com/cnumr/GreenIT-Analysis/blob/master/script/ecoIndex.js](https://github.com/cnumr/GreenIT-Analysis/blob/master/script/ecoIndex.js))
La méthode de calcul est décrite sur le site dédié à l'ecoIndex ([Le calcul de l’EcoIndex](https://www.ecoindex.fr/comment-ca-marche/))


# Comment l'utiliser ? 

## computeEcoIndex(dom, req, size)
La méthode `computeEcoIndex` permet de retourner la valeur de l'eccoIndex en passant les 3 paramètres attendus :

### Paramètres : 
- dom (number): Nombre d'éléments du DOM
- req (number): Nombre de requêtes
- size (number): Taille de la page (en Ko)

```javascript
import {computeEcoIndex} from "ecoindex-computor/ecoindex";

const ecoIndex = computeEcoIndex(dom, req, size);
```


## getEcoIndexGrade(ecoIndex)
La méthode `getEcoIndexGrade` permet de récupérer la note  en passant la valeur de l'eccoIndex :
- ecoIndex (number): Valeur de l'ecoindex.

```javascript
import {computeEcoIndex, getEcoIndexGrade} from "ecoindex-computor/ecoindex";

const ecoIndex = computeEcoIndex(dom, req, size);
const grade = getEcoIndexGrade(ecoIndex);
```