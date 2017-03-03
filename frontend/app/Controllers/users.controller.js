(function() {
    'use strict';

    angular
        .module('listIt')
        .controller('usersController', usersController);

    usersController.$inject = ['usersFactory', '$state', 'localStorageService', 'localStorageFactory', 'bookmarksFactory'];

    /* @ngInject */
    function usersController(usersFactory, $state, localStorageService, localStorageFactory, bookmarksFactory) {
        var u = this;




        ////////////////
        u.addProduct = function() {
            var product = {
                "UserId": localStorageFactory.getLocalStorage('userId'),
                "CategoryId": u.categories,
                "ProductTitle": u.title,
                "Description": u.description,
                "Condition": u.condition,
                "Price": u.price,
                "ProductImage": u.photoUrl
            }
            usersFactory.addProduct(product).then(function(response) {

                console.log(response);
            })
        }
        u.editProduct = function(pId) {
            var productId = pId
            var newProduct = {
                "ProductId": productId,
                "UserId": localStorageFactory.getLocalStorage('userId'),
                "CategoryId": u.editCategories,
                "ProductTitle": u.editProductTitle,
                "Description": u.editDescription,
                "Condition": u.editCondition,
                "Price": u.editPrice,
                "ProductImage": u.editPhotoUrl
            }

            usersFactory.editProduct(productId, newProduct).then(function(response) {
                console.log("ay lmao")
                console.log(response)
            }, function(error) {
                console.log(error)
            })
        }
        u.deleteBookmarks = function(bId) {
            var bookmarkId = bId
            console.log(bookmarkId)
            bookmarksFactory.deleteBookmarks(bookmarkId).then(function(response) {
                console.log(response)
            })
        }

        u.deleteProduct = function(pId) {
            u.deleteBookmarks(bId)

            var productId = pId
            console.log(productId)
            usersFactory.deleteProduct(productId).then(function(response) {
                console.log(response)

            }, function(error) {
                console.log(error)
            })
        }

        u.getBookmarks = function() {
            var uId = {
                UserId: localStorageFactory.getLocalStorage('userId')
            }
            bookmarksFactory.getBookmarks(uId).then(function(response) {
                console.log(response)
                vm.bookmarks = response.data
            })
        }

    }
})();
