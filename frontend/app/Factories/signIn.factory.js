(function() {
    'use strict';

    angular
        .module('listIt')
        .factory('signInFactory', signInFactory);

    signInFactory.$inject = ['$http', '$q', 'backendUrl'];

    /* @ngInject */
    function signInFactory($http, $q, backendUrl) {
        var service = {
            signInCheck: signInCheck
        };
        return service;



        function signInCheck(data) {
            var defer = $q.defer();
            $http({
                method: 'POST',
                url: backendUrl + 'Users/SignIn',
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
        } //end of signInCheck
    }
})();
