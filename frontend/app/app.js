(function() {
    'use strict';

    var listIt = angular.module('listIt', ['ui.router', 'LocalStorageModule', 'socialLogin'])
        .value('backendUrl', 'http://localhost:57938//api/')

    listIt.config(function($stateProvider, $urlRouterProvider, socialProvider) {

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
                templateUrl: "app/partials/profile.html"
                    // controller: "signInController",
                    // controllerAs: "si"

            })
            .state('messages', {
                url: '/messages',
                templateUrl: "app/partials/messages.html"
                    // controller: "signInController",
                    // controllerAs: "si"

            })
            .state('search', {
                url: '/search',
                templateUrl: "app/partials/search.html"
                    // controller: "signInController",
                    // controllerAs: "si"

            })



    })




})();
