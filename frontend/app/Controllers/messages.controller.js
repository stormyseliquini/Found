(function() {
    'use strict';

    angular
        .module('listIt')
        .controller('messagesController', messagesController);

    messagesController.$inject = ['messagesFactory', 'localStorageService', '$state', '$location', '$stateParams', 'localStorageFactory'];

    /* @ngInject */
    function messagesController(messagesFactory, localStorageService, $state, $location, $stateParams, localStorageFactory) {
        var m = this;
        m.title = 'messagesController';
        m.hide = true


        ////////////////

        m.getMessages = function() {
            var uId = {
                userId: localStorageFactory.getLocalStorage('userId')
            }
            messagesFactory.getMessages(uId).then(function(response) {

                console.log(response.data)
                m.response = response.data;
            })
        }
        m.getChat = function(mId) {

            var messageId = {
                MessageId: mId
            }
            messagesFactory.getChats(messageId).then(function(response) {
                m.chatResponse = response.data
                console.log(response)
                if (response.data.length > 0) {
                    var presetMID = response.data[0].messageId
                    localStorageFactory.setLocalStorage('mId', presetMID)
                }


                m.hide = false
            })
        }
        m.createChat = function() {
            if ($stateParams.messageId !== '') {
                var mId = $stateParams.messageId

            } else {
                var mId = localStorageFactory.getLocalStorage('mId')
            }
            var messageId = {
                MessageId: mId,
                Subject: m.subject,
                Content: m.message,
                DateSent: new Date()
            }
            console.log($stateParams)
            messagesFactory.createChats(messageId).then(function(response) {
                console.log(response.data)
                m.subject = ''
                m.message = ''
                m.getChat(mId)

            })

        }
    }
})();
