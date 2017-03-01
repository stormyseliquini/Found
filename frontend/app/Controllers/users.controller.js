(function() {
    'use strict';

    angular
        .module('listIt')
        .controller('usersController', usersController);

    usersController.$inject = ['usersFactory', '$state', 'localStorageService', 'localStorageFactory'];

    /* @ngInject */
    function usersController(usersFactory, $state, localStorageService, localStorageFactory) {
        var u = this;




        ////////////////
        u.addProduct = function() {
            var product = {
                "UserId": localStorageFactory.getLocalStorage('userId'),
                "CategoryId": u.categories,
                "ProductTitle": u.title,
                "Description": u.description,
                "Condition": u.condition,
                "Price": u.price,
                "ProductImage": u.photoUrl
            }
            usersFactory.addProduct(product).then(function(response) {

                console.log(response);
            })



        }

    }
})();
