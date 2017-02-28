(function() {
    'use strict';

    angular
        .module('listIt')
        .controller('registerController', registerController);

    registerController.$inject = ['localStorageService', '$rootScope', '$state'];

    /* @ngInject */
    function registerController(localStorageService, $rootScope, $state) {
        var r = this;
        r.title = 'registerController';



        ////////////////

        r.addUser = function(registerObject) {
            var email = r.email;
            var registerObject = {
                'UserName': r.userName,
                'Email': r.email,
                'Password': r.password
            }
            if (r.passwordConfirm !== r.password) {
                console.log("wRONG-ooooo");

            } else {
                localStorageService.getUser(email).then(function(response) {
                    if (response.data !== null) {

                        console.log("already in use douche")
                    } else {
                        localStorageService.addUser(registerObject).then(function(response) {
                            console.log(response);
                            localStorageService.set('isSignedIn', true)
                            $state.go('home')
                        });

                    }


                })

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
                    'FbPassword': password,
                    'Password': password
                }
                localStorageService.getUser(email).then(function(response) {
                    if (response.data !== null) {

                        console.log("already in use douche")
                    } else {
                        localStorageService.addUser(facebookInfo).then(function(response) {
                            console.log(response);
                            localStorageService.set('isSignedIn', true)
                            $state.go('home')
                        });

                    }


                })

            }
            r.facebookRegister();

        });

        $rootScope.$on('event:social-sign-out-success', function(event, userDetails) {
            r.result = userDetails;
        });





    }
})();
