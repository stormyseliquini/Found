(function() {
    'use strict';

    angular
        .module('listIt')
        .factory('registerFactory', registerFactory);

    registerFactory.$inject = ['$http', '$q', 'backendUrl'];

    /* @ngInject */
    function registerFactory($http, $q, backendUrl) {
        var service = {
            addUser: addUser,
            getUser: getUser
        };
        return service;

        ////////////////

        function addUser(data) {
            var defer = $q.defer();
            $http({
                method: 'POST',
                url: backendUrl + 'Users',
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

        function getUser(email) {
            var defer = $q.defer();
            $http({
                method: 'GET',
                url: backendUrl + 'Users/email',
                params: {
                    'Email': email
                }

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
