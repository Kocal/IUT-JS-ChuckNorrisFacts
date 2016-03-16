# [IUT] JS : Chuck Norris Facts

## Objectifs

1. Utiliser AJAX, jQuery et Isotope
2. Comprendre les fonctionnements asynchromes
3. Proposer une interface responsive et ergonomique

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

------------------------------------------------------------------------

## Conception

### Rendu HTML/CSS

1. Je commence tout d'abord par créer le style de la page avant la récupération des données à l'API afin de ne pas effectuer deux tâches en même temps (Style de la page et interprétation des données)
2. La page est séparée en deux parties :
    1. Le header, là où se trouveront les différents boutons pour intéragir avec la page
    2. La section des jokes, là où seront affichées les jokes récupérées sur l'API
3. Une fois le style terminé, je peux commencer la récupération des données sur l'API et ensuite les intégrer à la page

### Récupération des CNF et traitements

1. Un système de template (maison) sera utilisé pour l'affichage des jokes afin d'avoir un code maintenable et lisible
2. Une méthode permet de récupérer une joke à l'API. La méthode pour récupérer plusieurs jokes fera `n` appels à la fonction précédente
3. Insertion d'une joke dans le code HTML :
    1. La joke est récupérée au format JSON 
    2. On applique la joke sur une copie du template HTML de la joke => `$joke` 
    3. On insère le nouvel élément `$joke` dans le conteneur des jokes
    4. On informe `Isotope` qu'une joke a été insérée

### Intéractions

#### Bouton pour ajouter 3 jokes

Ce bouton permet à l'utilisateur de charger et d'ajouter dans le DOM 3 jokes supplémentaires

1. Le bouton appelle simplement la méthode `CNF::fetchRandomJokes(3)`

#### Liste déroulante pour le tri

1. La liste déroulante permet de trier selon l'ordre alphabétique des jokes, ou alors des identifiants. Que ce soit croissant ou décroissant.
2. Dès que la valeur change :
    1. Les options du `sortBy` sont générées dynamiquement en fonction de la `value` de la liste déroulante
    2. On lance un `sortBy` de `Isotope`

#### Liste déroulante pour les catégories

1. La liste déroulante est dynamique. Elle n'affiche que les catégories des jokes qui sont présentes dans le DOM
2. Dès que la valeur change :
    1. On lance un filtre `Isotope`
    2. Ce filtre trie dynamiquement la catégories des jokes en fonction de la valeur de la liste déroulante 
