function CNF($jokesContainer, $jokeTemplate, $selectFilterCategories) {
    this.API = {
        RANDOM_JOKES: 'http://api.icndb.com/jokes/random'
    };

    this.$jokesContainer = $jokesContainer;
    this.jokesTemplate = $jokeTemplate.html();
    this.$selectFilterCategories = $selectFilterCategories;
}

/**
 * Récupère une random joke sur l'API et fait ensuite le traitement
 */
CNF.prototype.fetchRandomJoke = function () {
    var self = this;

    $.get(this.API.RANDOM_JOKES, function (datas) {
        var joke = datas.value;

        self.buildJokeFrom(joke, function($joke) {
            $joke.hide();
            self.$jokesContainer.prepend($joke);
            self.$jokesContainer.isotope('prepended', $joke);
            self.$jokesContainer.isotope('updateSortData', $joke);
        });

    }).error(function () {
        throw new Error("Impossible de charger une joke");
    });
};

/**
 * Fait `count` appel à CNF::fetchRandomJoke() où `count` > 0
 * @param {Number} count Nombre de blagues aléatoires à récupérer
 */
CNF.prototype.fetchRandomJokes = function (count) {
    if (count <= 0) {
        console.info("Il n'est pas possible de récupérer un nombre négatif ou nul de jokes");
        return;
    }

    while (count--) {
        this.fetchRandomJoke();
    }
};

/**
 *
 * @param {Object} joke
 * @param {Function} callback
 */
CNF.prototype.buildJokeFrom = function (joke, callback) {
    var self = this;

    var template = this.jokesTemplate;
    var categories;

    // Traitement spécial pour les catégories
    if (joke.categories.length == 0) {
        categories = 'Aucune';
        this.maybeUpdateCategoriesFilter('aucune', categories);
    } else {
        categories = joke.categories.map(function (str) {
            var strUcFirst = str.ucFirst();

            self.maybeUpdateCategoriesFilter(str, strUcFirst);

            return strUcFirst;
        }).join('</span>, <span class="joke__category">');

        categories = "<span class='joke__category'>" + categories + "</span>";
    }

    // Vive le template :d
    template = template.templateRemplace('joke_id', joke.id);
    template = template.templateRemplace('joke_joke', joke.joke);
    template = template.templateRemplace('joke_categories', categories);

    callback($(template));
};

CNF.prototype.maybeUpdateCategoriesFilter = function (category, categoryUcFirst) {
    if(this.$selectFilterCategories.find('option[value="' + category + '"]').length > 0) {
        return;
    }

    var $option = $('<option>', {
        value: category,
        text: categoryUcFirst
    });

    this.$selectFilterCategories.append($option);
};

/**
 * Facilite le remplacement d'une clé par une donnée dans un template
 *
 * @param {String} key Clé à remplacer
 * @param {String} data Donnée qui remplacera la clé
 * @returns {string}
 */
String.prototype.templateRemplace = function (key, data) {
    var regexp = new RegExp("\\{\\{\\s*" + key + "\\s*\\}\\}", 'g');
    return this.replace(regexp, data);
};

/**
 * Équivalent de la fonction ucFirst() en PHP
 * @returns {string}
 */
String.prototype.ucFirst = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
