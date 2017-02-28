(function() {
    'use strict';

    angular
        .module('listIt')
        .factory('messagesFactory', messagesFactory);

    messagesFactory.$inject = ['$http', '$q', 'backendUrl'];

    /* @ngInject */
    function messagesFactory($http, $q, backendUrl) {
        var service = {
            func: func
        };
        return service;

        ////////////////

        function func() {}
    }
})();
