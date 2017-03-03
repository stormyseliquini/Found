(function() {
    'use strict';

    angular
        .module('listIt')
        .controller('usersController', usersController);

    usersController.$inject = ['usersFactory', '$state', 'localStorageService', 'localStorageFactory', 'bookmarksFactory', 'filepickerService'];

    /* @ngInject */
    function usersController(usersFactory, $state, localStorageService, localStorageFactory, bookmarksFactory, filepickerService) {
        var u = this;




        ////////////////

        u.pickFile = function() {
                filepickerService.pick({
                        mimetype: 'image/*',
                        containter: 'modal',
                        services: ['COMPUTER', 'FACEBOOK']
                    },
                    function onSuccess(Blob) {
                        console.log(Blob);
                        u.photoUrl = Blob.url;
                    }
                )
            } //close pickFile

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
        u.editProduct = function(pId, x) {
            var productId = pId
            var newProduct = {
                "ProductId": productId,
                "UserId": localStorageFactory.getLocalStorage('userId'),
                "CategoryId": x.categoryId,
                "ProductTitle": x.productTitle,
                "Description": x.description,
                "Condition": x.condition,
                "Price": x.price,
                "ProductImage": u.photoUrl
            }
            console.log(x)
            usersFactory.editProduct(productId, newProduct).then(function(response) {
                console.log("ay lmao")
                console.log(response)
                $state.reload();
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

        function deleteProduct(pId) {


            var productId = pId

            usersFactory.deleteProduct(productId).then(function(response) {
                console.log(response)
                $state.reload();

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
                u.bookmarks = response.data
            })
        }
        u.deleteBookmarkAndProduct = function(pId) {
            var productId = pId
            bookmarksFactory.deleteBookmarksFromProduct(productId).then(deleteProduct(productId))
        }

        u.getUser = function() {
            var id = localStorageFactory.getLocalStorage('userId')
            usersFactory.getUser(id).then(function(response) {
                console.log(response)
                u.details = response.data
            })
        }
        u.updateProfile = function() {
            var id = localStorageFactory.getLocalStorage('userId')
            var update = {
                "FirstName": u.details.firstName,
                "LastName": u.details.lastName,
                "UserName": u.details.userName,
                "Birthday": u.details.birthday,
                "Image": u.photoUrl,
                "Password": u.details.password,
                "Email": u.details.email,
                "UserId": id,
                "Phone": u.details.phone

            }
            usersFactory.updateProfile(id, update).then(function(response) {
                console.log(response)
                $state.reload()

            })
        }
    }
})();
