(function() {
    'use strict';

    angular
        .module('listIt')
        .controller('stateController', stateController);

    stateController.$inject = ['$state'];

    /* @ngInject */
    function stateController($state) {
        var state = this;
        state.title = 'stateController';



        ////////////////

        state.home = function() {
            $state.go('home')
        }
        state.signIn = function() {
            $state.go('signIn')
        }
        state.register = function() {
            $state.go('register')
        }
        state.profile = function() {
            $state.go('profile')
        }
        state.messages = function() {
            $state.go('messages')
        }
        state.logout = function() {
            $state.go('home')
        }
    }
})();
