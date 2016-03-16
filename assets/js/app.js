var app;
var $grid;

$(document).ready(function () {
    var $jokesContainer = $('.jokes').isotope({
        layoutMode: 'fitRows',
        itemSelector: '.joke'
    });

    var $jokeTemplate = $('#joke-template');
    var $selectFilterCategories = $('select.filter-categories');

    app = new App($jokesContainer, $jokeTemplate, $selectFilterCategories);
    app.fetchRandomJokes(5);

    $('.actions').on('click', '.add-3-cnf', function (e) {
        e.preventDefault();
        app.fetchRandomJokes(3);
    });

    $selectFilterCategories.on('change', function (e) {
        var $this = $(this);
        var value = $this.val();

        $jokesContainer.isotope({
            filter: function () {
                var $this = $(this);
                var $categories = $this.find('.joke__categories');

                if (value == 'toutes') {
                    return true;
                }

                return $categories.text().match(new RegExp(value, 'i'));
            }
        });
    });
});
