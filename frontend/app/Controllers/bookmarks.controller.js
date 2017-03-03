(function() {
    'use strict';

    angular
        .module('listIt')
        .controller('bookmarksController', bookmarksController);

    bookmarksController.$inject = ['bookmarksFactory', 'localStorageFactory'];

    /* @ngInject */
    function bookmarksController(bookmarksFactory, localStorageFactory) {
        var vm = this;
        vm.title = 'bookmarksController';



        ////////////////

        vm

        vm.
    }
})();
