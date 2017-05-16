/**
 * Created by Yu on 2017/3/9.
 */

(function () {
    "use strict";
    var utils = angular.module('ykylUtils');

    //websocket
    utils.factory('PkWaitingSocketDao', ['$websocket', 'PathUtils', pkSocketService]);
    function pkSocketService($websocket, pathUtils) {
        var vm = this;

        // socket流
        vm.dataStream = undefined;
        vm.status = undefined;

        // 连接
        function connectWebSocket() {
            // test==================================================================================
            // $http.get("http://localhost:8888/api/websocket/login?phone=110");
            // $http.get("http://192.168.1.132:8888/api/websocket/login?phone=110");

            vm.dataStream = $websocket(pathUtils.getWebSocketUrl());
            vm.status = false;

            // 连接发生错误的回调方法
            vm.dataStream.onError(function () {
                console.log('error');
                vm.status = false;
            });

            // 连接成功建立的回调方法
            vm.dataStream.onOpen(function () {
                console.log('link start!');
                vm.status = true;
            });

            //连接关闭的回调方法
            vm.dataStream.onClose(function () {
                console.log('哔哔哔-----');
                vm.status = false;
            });

            //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
            window.onbeforeunload = function () {
                vm.dataStream.close();
            };
        }

        // 用于建立新的onMessage
        function getMessage(str, callback) {
            vm.dataStream.onMessage(function (message) {
                if (message.data.indexOf(str)  > 0) {
                    callback(message);
                }
                // callback(message);
            });
        }

        // 关闭连接
        function closeWebSocket() {
            vm.dataStream.close();
        }

        function send(str) {
            vm.dataStream.send(str);
        }

        function getStatus() {
            return vm.status;
        }

        var methods = {
            getMessage: getMessage,
            connect: connectWebSocket,
            close: closeWebSocket,
            send: send,
            status: getStatus
        };

        return methods;
    }

})();