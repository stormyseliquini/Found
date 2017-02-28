(function() {
    'use strict';

    angular
        .module('listIt')
        .controller('detailsController', detailsController);

    detailsController.$inject = ['searchFactory', '$stateParams', '$state'];

    /* @ngInject */
    function detailsController(searchFactory, $stateParams, $state) {
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

        d.detailToMessage = function() {
            $state.go('messages', { userId: d.detailResponse.userId })



        }
    }
})();
