(function() {
    'use strict';

    angular
        .module('listIt', ['ui.router', 'LocalStorageModule', 'socialLogin', 'angular-filepicker', 'oitozero.ngSweetAlert'])
        .value('backendUrl', 'http://localhost:57938//api/')
        .config(function($stateProvider, $urlRouterProvider, socialProvider, filepickerProvider) {
            filepickerProvider.setKey('A5XoolRK0QjS5Tvn2TXgiz');
            socialProvider.setFbKey({
                appId: "1181751575274609",
                apiVersion: "v2.8"
            });
            $urlRouterProvider.otherwise("/home");

            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'app/partials/home.html'
                })


            .state('signIn', {
                    url: '/signIn',
                    templateUrl: "app/partials/signIn.html",
                    controller: "signInController",
                    controllerAs: "si"
                })
                .state('register', {
                    url: '/register',
                    templateUrl: "app/partials/register.html",
                    controller: "registerController",
                    controllerAs: "r"

                })
                .state('profile', {
                    url: '/profile',
                    templateUrl: "app/partials/profile.html",
                    controller: "usersController",
                    controllerAs: "u",
                    requireAuth: true

                })
                .state('messages', {
                    url: '/messages',
                    templateUrl: "app/partials/messages.html",
                    controller: "messagesController",
                    controllerAs: "m",
                    requireAuth: true,
                    params: {
                        messageId: ""
                    }



                })

            .state('search', {
                    url: '/search',
                    templateUrl: "app/partials/search.html",
                    controller: "searchController",
                    controllerAs: "s"

                })
                .state('details', {
                    url: '/details/:productDetailId',
                    templateUrl: "app/partials/details.html",
                    controller: "detailsController",
                    requireAuth: true,
                    controllerAs: "d"

                })
        })
        .run(function($rootScope, $location, $state, localStorageFactory) {
            $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
                var isLogin = localStorageFactory.getLocalStorage("userId");
                console.log('changing state from ' + fromState.name + ' to ' + toState.name);
                if (toState.requireAuth && !isLogin) {
                    e.preventDefault();
                    window.location.replace('#!/signIn');
                }
            });
        });

})();
