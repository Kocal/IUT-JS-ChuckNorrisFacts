var cnf;

$(document).ready(function () {
    var $jokesContainer = $('.jokes').isotope({
        layoutMode: 'fitRows',
        itemSelector: '.joke',
    });

    var $jokeTemplate = $('#joke-template');
    var $selectSortJokes = $('select.sort-alphabetic');
    var $selectFilterCategories = $('select.filter-categories');

    cnf = new CNF($jokesContainer, $jokeTemplate, $selectFilterCategories);
    cnf.fetchRandomJokes(5);

    $('.actions').on('click', '.add-3-cnf', function (e) {
        e.preventDefault();
        cnf.fetchRandomJokes(3);
    });

    $selectSortJokes.on('change', function (e) {
        var $this = $(this);
        var value = $this.val();

        var sortOptions = {
            sortBy: (/^sort-alpha/.test(value) ? '.joke__joke' : (/^sort-id/.test(value) ? '.joke__id parseInt' : 'original-order')),
            sortAscending: /asc$/.test(value)
        };

        if (sortOptions.sortBy == 'original-order') {
            delete sortOptions.sortAscending;
        }

        console.log(sortOptions);

        $jokesContainer.isotope(sortOptions);
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
