(function() {
    'use strict';

    angular
        .module('listIt')
        .controller('searchController', searchController);

    searchController.$inject = ['searchFactory', '$state'];

    /* @ngInject */
    function searchController(searchFactory, $state) {
        var s = this;
        s.title = 'searchController';



        ////////////////

        s.searchProducts = function() {
            var data = {
                'CategoryName': s.category,
                'Keyword': s.keyword,
                'Condition': s.condition,
                'MaxPrice': s.maxPrice,
                'MinPrice': s.minPrice
            }
            searchFactory.searchItems(data).then(function(response) {
                s.response = response.data;
                console.log(response);
            })
        }
    }
})();
