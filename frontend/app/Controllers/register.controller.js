(function() {
    'use strict';

    angular
        .module('listIt')
        .controller('registerController', registerController);

    registerController.$inject = ['localStorageFactory', '$rootScope', '$state', 'registerFactory'];

    /* @ngInject */
    function registerController(localStorageFactory, $rootScope, $state, registerFactory) {
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
                registerFactory.getUser(email).then(function(response) {
                    if (response.data !== null) {

                        console.log("already in use douche")
                    } else {
                        registerFactory.addUser(registerObject).then(function(response) {
                            console.log(response);
                            localStorageFactory.setLocalStorage('isSignedIn', true)
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
                var imageUrl = userDetails.imageUrl;

                var facebookInfo = {
                    'UserName': userName,
                    'Email': email,
                    'FbPassword': password,
                    'Password': password,
                    'image': imageUrl
                }
                registerFactory.getUser(email).then(function(response) {
                    if (response.data !== null) {

                        console.log("already in use douche")
                    } else {
                        registerFactory.addUser(facebookInfo).then(function(response) {
                            console.log(response);
                            localStorageFactory.setLocalStorage('isSignedIn', true)
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
