(function() {
    'use strict';

    var listIt = angular.module('listIt', ['ui.router', 'LocalStorageModule', 'socialLogin'])
        .value('backendUrl', 'http://localhost:53466/api/');

    listIt.config(function($stateProvider, $urlRouterProvider, socialProvider) {

        socialProvider.setFbKey({
            appId: "1181751575274609",
            apiVersion: "v2.8"
        });
        $urlRouterProvider.otherwise("/example");

        $stateProvider
            .state('example', {
                url: '/example',
                templateUrl: "app/example/example.html"
                    // controller: "searchController",
                    // controllerAs: "vm"

            })


    })



    .controller('myCtrl', function($scope, socialLoginService) {
        $scope.signout = function() {
            socialLoginService.logout();
        }
        $scope.$on('event:social-sign-in-success', (event, userDetails) => {
            $scope.result = userDetails;
            $scope.$apply();
        })
        $scope.$on('event:social-sign-out-success', function(event, userDetails) {
            $scope.result = userDetails;
        })

    });
})();
