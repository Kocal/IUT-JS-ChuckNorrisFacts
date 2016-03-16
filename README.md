# [IUT] JS : Ajax et JSON

## Sujet

Proposer une page HTML dans laquelle on affiche une liste initial de 5 Chuck Norris Facts, issues de l'API http://api.icndb.com/jokes/random.

Ces CNF sont organisées dans une grisse Isotope (http://isotope.metafizzy.co/) avec :
- La possibilité de choisir un ordre alphabétique ou inverse
- La possibilité de filtrer sur les catégories des CNF (cf. API)
- Une mise en forme soignée (différents types de mise en forme au choix)

En haut de page, un bouton permet de charger 3 CNF supplémentaires, en faisant OBLIGATOIREMENT appel 3 fois à l'API http://api.icndb.com/jokes/random (et non http://api.icndb.com/jokes/random/3)

Lorsque l'on appuie sur ce chargement complémentaire, un message de chargement apparait (en surimpression avec une animation jQuery) et quand toutes les nouvelles CNF sont mises en place dans la grille Isotope, on fait disparaître la fenêtre avec une animation jQuery.

### Notation
- Conception : 5 points
- Chargement initial (Isotope, jQuery, Ajax, Mise en forme) : 7 points
- Filtres et Ordres : 3 points
- Chargements complémentaires : 5 points

Le rendu est réalisé en une fois à la fin du cours, aucun rendu réalisé après la fin du cours (**heure précise**) ne sera pris en compte.
