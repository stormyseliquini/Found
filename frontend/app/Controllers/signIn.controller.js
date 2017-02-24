(function() {
    'use strict';

    angular
        .module('listIt')
        .controller('signInController', signInController);

    signInController.$inject = ['socialLoginService', '$rootScope', 'signInFactory'];

    /* @ngInject */
    function signInController(socialLoginService, $rootScope, signInFactory) {
        var si = this;
        si.title = 'signInController';



        ////////////////
        si.signIn = function() {
                var signInInfo = {
                    "Email": si.email,
                    "Password": si.password
                }

                signInFactory.signInCheck(signInInfo)
                    .then(
                        function(response) {
                            console.log(response);
                        },
                        function(error) {
                            console.log(error);
                        }
                    ) //end of then()

            } //end of signIn function



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
