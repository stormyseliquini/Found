(function() {
    'use strict';

    angular
        .module('listIt')
        .factory('usersFactory', usersFactory);

    usersFactory.$inject = ['$http', '$q', 'backendUrl'];

    /* @ngInject */
    function usersFactory($http, $q, backendUrl) {
        var service = {
            addProduct: addProduct,
            editProduct: editProduct,
            deleteProduct: deleteProduct
        };
        return service;

        ////////////////

        function addProduct(data) {
            var defer = $q.defer();
            $http({
                method: 'POST',
                url: backendUrl + 'Products',
                data: data
            }).then(function(response) {
                if (typeof response.data === 'object') {

                    defer.resolve(response);
                } else {

                    defer.reject('no data found :(');
                }
            }, function(error) {

                console.log(error);
                defer.reject(error);

            });

            return defer.promise;


        }

        function editProduct(productId, data) {
            var defer = $q.defer();
            $http({
                method: 'PUT',
                url: backendUrl + 'Products/' + productId,

                headers: { 'Content-Type': 'application/json' },
                data: data
            }).then(function(response) {
                console.log(response)
                if (typeof response.data !== null) {

                    defer.resolve(response);
                } else {

                    defer.reject('no data found :(');
                }
            }, function(error) {

                console.log(error);
                defer.reject(error);

            });

            return defer.promise;


        }

        function deleteProduct(productId) {
            var defer = $q.defer();
            $http({
                method: 'DELETE',
                url: backendUrl + 'Products/' + productId,

                headers: { 'Content-Type': 'application/json' }

            }).then(function(response) {
                console.log(response)
                if (typeof response.data !== null) {

                    defer.resolve(response);
                } else {

                    defer.reject('no data found :(');
                }
            }, function(error) {

                console.log(error);
                defer.reject(error);

            });

            return defer.promise;


        }
    }
})();
