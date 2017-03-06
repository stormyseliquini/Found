(function() {
    'use strict';

    angular
        .module('listIt')
        .controller('signInController', signInController);

    signInController.$inject = ['socialLoginService', '$rootScope', 'signInFactory', 'localStorageService', '$state', 'localStorageFactory', 'SweetAlert'];

    /* @ngInject */
    function signInController(socialLoginService, $rootScope, signInFactory, localStorageService, $state, localStorageFactory, SweetAlert) {
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

                                swal("Welcome Back", "signed in successfully", "success")
                                $state.go('home');

                                return response;
                            } else { console.log("you suck") }
                            console.log(response);
                            sweetAlert("Oops...", "The email and password are invalid", "error");
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
            swal("success", "Come Back Soon", "success")
            $state.go('signIn')

        }
        $rootScope.$on('event:social-sign-in-success', (event, userDetails) => {
            si.result = userDetails;
            console.log(si.result)
            si.facebookSignIn = function() {

                var email = userDetails.email;
                var password = userDetails.uid;
                var facebookInfo = {

                    'Email': email,
                    'Password': password

                }
                signInFactory.signInCheck(facebookInfo).then(function(response) {

                    if (response.data[0] !== undefined) {
                        console.log("success")
                        console.log(response)
                        localStorageFactory.setLocalStorage("userId", response.data[0].userId)
                        swal("Welcome Back", "signed in successfully", "success")
                        $state.go('home')

                    } else {
                        console.log("you suck")
                        sweetAlert("Oops...", "The email and password are invalid", "error");
                    }
                    console.log(response);

                });
            }
            si.facebookSignIn();
            //si.$apply();
        })




    }
})();
