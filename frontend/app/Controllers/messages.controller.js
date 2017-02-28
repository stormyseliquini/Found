(function() {
    'use strict';

    angular
        .module('listIt')
        .controller('messagesController', messagesController);

    messagesController.$inject = ['messagesFactory', 'localStorageService', '$state', '$location', '$stateParams'];

    /* @ngInject */
    function messagesController(messagesFactory, localStorageService, $state, $location, $stateParams) {
        var m = this;
        m.title = 'messagesController';



        ////////////////

        m.getUsers = function() {
            console.log($stateParams);
        }
        m.getUsers();
    }
})();
