(function() {
    'use strict';

    angular
        .module('listIt')
        .factory('bookmarksFactory', bookmarksFactory);

    bookmarksFactory.$inject = ['$http', '$q', 'backendUrl'];

    /* @ngInject */
    function bookmarksFactory($http, $q, backendUrl) {
        var service = {
            getBookmarks: getBookmarks,
            deleteBookmarks: deleteBookmarks
        };
        return service;

        ////////////////



        function getBookmarks(data) {
            var defer = $q.defer();
            $http({
                method: 'GET',
                url: backendUrl + "bookmarks/user",
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

        function deleteBookmarks(productId) {
            var defer = $q.defer();
            $http({
                method: 'DELETE',
                url: backendUrl + 'Bookmarks/' + productId,

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
