(function() {
    'use strict';

    angular
        .module('listIt')
        .controller('usersController', usersController);

    usersController.$inject = ['usersFactory', '$state', 'localStorageService'];

    /* @ngInject */
    function usersController(usersFactory, $state, localStorageService) {
        var u = this;




        ////////////////
        u.addProduct = function() {
            var product = {
                "UserId": 2,
                "CategoryId": u.categories,
                "ProductTitle": u.title,
                "Description": u.description,
                "Condition": u.condition,
                "Price": u.price
                    // "ProductImage": u.photoUrl
            }
            usersFactory.addProduct(product).then(function(response) {

                console.log(response);
            })



        }

    }
})();
