(function() {
    'use strict';

    angular
        .module('listIt')
        .factory('messagesFactory', messagesFactory);

    messagesFactory.$inject = ['$http', '$q', 'backendUrl'];

    /* @ngInject */
    function messagesFactory($http, $q, backendUrl) {
        var service = {
            getMessages: getMessages,
            getChats: getChats,
            createChats: createChats,
            createMessage: createMessage
        };
        return service;

        ////////////////

        function createMessage(data) {
            var defer = $q.defer();
            $http({
                method: 'POST',
                url: backendUrl + "Messages",
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



        function getMessages(data) {
            var defer = $q.defer();
            $http({
                method: 'GET',
                url: backendUrl + "MessagebyId",
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

        function getChats(data) {
            var defer = $q.defer();
            $http({
                method: 'GET',
                url: backendUrl + "Messages/Chats20",
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

        function createChats(data) {
            var defer = $q.defer();
            $http({
                method: 'POST',
                url: backendUrl + "Chats",
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
