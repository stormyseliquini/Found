(function() {
    'use strict';

    angular
        .module('listIt')
        .controller('detailsController', detailsController);

    detailsController.$inject = ['searchFactory', '$stateParams', '$state', 'messagesFactory', 'localStorageFactory', 'bookmarksFactory'];

    /* @ngInject */
    function detailsController(searchFactory, $stateParams, $state, messagesFactory, localStorageFactory, bookmarksFactory) {
        var d = this;
        d.title = 'detailsController';
        d.detailResponse = {};

        function getDetails() {
            searchFactory.getDetails($stateParams.productDetailId).then(
                function(response) {
                    d.detailResponse = response.data;
                    console.log(d.detailResponse);
                    console.log(d.detailResponse.userId);


                },
                function(error) {
                    console.log(error);
                }

            )
        };
        getDetails();

        d.detailToMessage = function(productUser) {

            var users = {
                UserId1: localStorageFactory.getLocalStorage("userId"),
                UserId2: productUser
            }

            messagesFactory.createMessage(users).then(function(response) {
                    console.log(response)
                    var createdMessage = response.data
                    $state.go('messages', createdMessage)
                },
                function(error) {
                    console.log(error)
                })
        }
        d.createBookmark = function(pId) {
            var ob = {
                ProductId: pId,
                UserId: localStorageFactory.getLocalStorage("userId")
            }
            bookmarksFactory.createBookmark(ob).then(function(response) {
                console.log(response)
            })
        }
    }
})();
