(function() {
    'use strict';

    angular
        .module('listIt')
        .controller('signInController', signInController);

    signInController.$inject = ['socialLoginService', '$rootScope', 'signInFactory', 'localStorageService', '$state', 'localStorageFactory'];

    /* @ngInject */
    function signInController(socialLoginService, $rootScope, signInFactory, localStorageService, $state, localStorageFactory) {
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

                            if (response.data[0] !== undefined) {
                                console.log("success")
                                console.log(response.data)
                                var responseData = response.data[0]


                                setStorage('email', responseData.email);
                                setStorage('userId', responseData.userId);


                                $state.go('home');

                                return response;
                            } else { console.log("you suck") }
                            console.log(response);
                        },
                        function(error) {
                            console.log(error);
                        }
                    ) //end of then()

            } //end of signIn function

        function setStorage(key, value) {
            localStorageFactory.setLocalStorage(key, value)

            console.log("successfully setstorage in the aut controller!");
            return;
        }


        si.signout = function() {
            localStorageFactory.logout();
            $state.go('home')


        }
        $rootScope.$on('event:social-sign-in-success', (event, userDetails) => {
            si.result = userDetails;
            si.facebookSignIn = function() {

                var email = userDetails.email;
                var password = userDetails.uid;
                var facebookInfo = {

                    'Email': email,
                    'FbPassword': password

                }
                signInFactory.signInCheck(facebookInfo).then(function(response) {
                    if (response.data[0] !== undefined) {
                        console.log("success")
                        console.log(response)
                        localStorageService.set(responseData.userId)
                        $state.go('home')
                        console.log(isSignedIn)
                    } else { console.log("you suck") }
                    console.log(response);
                });
            }
            si.facebookSignIn();
            //si.$apply();
        })
        $rootScope.$on('event:social-sign-out-success', function(event, userDetails) {
            si.result = userDetails;
        })



    }
})();
