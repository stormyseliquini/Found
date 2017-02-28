(function() {
    'use strict';

    angular
        .module('listIt')
        .factory('searchFactory', searchFactory);

    searchFactory.$inject = ['$http', '$q', 'backendUrl'];

    /* @ngInject */
    function searchFactory($http, $q, backendUrl) {
        var service = {
            searchItems: searchItems,
            getDetails: getDetails
        };
        return service;

        ////////////////

        function searchItems(data) {
            var defer = $q.defer();
            $http({
                method: 'GET',
                url: backendUrl + "Products/Search",
                params: data
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


        function getDetails(id) {
            var defer = $q.defer();
            $http({
                method: 'GET',
                url: backendUrl + "Products/" + id

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
