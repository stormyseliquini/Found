(function() {
    'use strict';

    angular
        .module('listIt')
        .factory('usersFactory', usersFactory);

    usersFactory.$inject = ['$http', '$q', 'backendUrl'];

    /* @ngInject */
    function usersFactory($http, $q, backendUrl) {
        var service = {
            addProduct: addProduct
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
    }
})();
