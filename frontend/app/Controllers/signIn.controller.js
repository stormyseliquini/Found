(function() {
    'use strict';

    angular
        .module('listIt')
        .controller('signInController', signInController);

    signInController.$inject = ['socialLoginService', '$rootScope'];

    /* @ngInject */
    function signInController(socialLoginService, $rootScope) {
        var si = this;
        si.title = 'signInController';



        ////////////////



        si.signout = function() {
            socialLoginService.logout();
        }
        $rootScope.$on('event:social-sign-in-success', (event, userDetails) => {
            si.result = userDetails;
            //si.$apply();
        })
        $rootScope.$on('event:social-sign-out-success', function(event, userDetails) {
            si.result = userDetails;
        })



    }
})();
