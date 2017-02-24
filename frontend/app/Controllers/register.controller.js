(function() {
    'use strict';

    angular
        .module('listIt')
        .controller('registerController', registerController);

    registerController.$inject = ['registerFactory', '$rootScope'];

    /* @ngInject */
    function registerController(registerFactory, $rootScope) {
        var r = this;
        r.title = 'registerController';



        ////////////////

        r.addUser = function(registerObject) {
            var registerObject = {
                'UserName': r.userName,
                'Email': r.email,
                'Password': r.password
            }
            if (r.passwordConfirm !== r.password) {
                console.log("wRONG-ooooo");

            } else {
                registerFactory.addUser(registerObject).then(function(response) {
                    console.log(response)
                });
            }


        }

        r.signout = function() {
            socialLoginService.logout();
        };



        //facebook login function
        $rootScope.$on('event:social-sign-in-success', (event, userDetails) => {
            r.result = userDetails;
            console.log(userDetails.name)
                //r.$apply();


            r.facebookRegister = function() {
                var userName = userDetails.name.replace(/\s/g, '');
                var email = userDetails.email;
                var password = userDetails.uid;
                var facebookInfo = {
                    'UserName': userName,
                    'Email': email,
                    'Password': password
                }
                registerFactory.addUser(facebookInfo).then(function(response) {
                    console.log(response);
                });
            }
            r.facebookRegister();

        });

        $rootScope.$on('event:social-sign-out-success', function(event, userDetails) {
            r.result = userDetails;
        });





    }
})();
