/**
 * Created by yu on 2016/12/7.
 */


(function () {
    'use strict';

    var ykylPkApp = angular.module('ykylPkApp');

    ykylPkApp.controller('pkWaitingCtrl', ['PkWaitingDao', 'PkWaitingSocketDao',
        '$routeParams', '$window', '$interval', '$location', pkWaitingCtrl]);

    function pkWaitingCtrl(pkWaitingDao, pkSocketService, $routeParams, $window, $interval, $location) {
        var vm = this;
        var storage = $window.sessionStorage;

        var waitingTimeSize = 4000;
        var readyTimeSize = 4000;

        // 模块显示名称
        vm.moduleTitle = undefined;
        // 所选课程id
        vm.courseId = undefined;
        // 用户信息
        vm.userData = undefined;
        // 对战者信息
        vm.oppoData = undefined;
        // 计时(等待时顺计时，准备时倒计时)
        vm.waitingTime = undefined;
        // 计时提示文本(已等待/倒计时)
        vm.waitingTimeText = undefined;
        // 信息显示框(show)
        vm.infoBox = undefined;
        // 等待按钮样式(disabled)
        vm.waitingButtonBox = undefined;
        // 等待按钮文本(准备/换房间)
        vm.waitingButtonText = undefined;
        // 准备按钮样式(disabled)
        vm.readyButtonBox = undefined;
        // 等到匹配WebSocket对话
        vm.webSocket = undefined;
        // 房间号
        vm.roomId = undefined;

        vm.waitingTiming = waitingTiming;
        vm.readyTiming = readyTiming;
        vm.startMatching = stratMatching;

        var timePromise;

        loadMetaData();

        function loadMetaData() {
            vm.waitingTime = 0;
            vm.waitingTimeText = '已等待:';
            vm.userData = {};
            vm.oppoData = {};
            vm.infoBox = false;
            vm.waitingButtonBox = false;
            vm.waitingButtonText = '准备';
            vm.courseId = $routeParams.id;

            pkWaitingDao.getUserData(function (response) {
            // $http.get("json/user-data.json").success(function (response) {
                vm.userData.name = response.user.name;
                vm.userData.school = response.user.school;
                vm.userData.grade = response.user.grade;
                vm.userData.pkRate = response.user.pkRate;
                vm.userData.avatar = response.user.avatar;
                // 将自己信息存入sessionStorage
                storage.setItem('userData', JSON.stringify(response));
                switch (vm.courseId) {
                    case 'yw':
                        vm.moduleTitle = vm.userData.grade + '语文' + 'PK';
                        break;
                    case 'sx':
                        vm.moduleTitle = vm.userData.grade + '数学' + 'PK';
                        break;
                    case 'wy':
                        vm.moduleTitle = vm.userData.grade + '英语' + 'PK';
                        break;
                }
            });
        }

        function connectWebSocket() {
            // 建立websocket连接
            vm.webSocket = pkSocketService;
            vm.webSocket.connect();
            vm.webSocket.getMessage('"sender":"hello"', function (message) {
                var tempOppoData = JSON.parse(message.data);
                console.log(tempOppoData.oppo);
                vm.oppoData.name = tempOppoData.oppo.name;
                vm.oppoData.school = tempOppoData.oppo.school;
                vm.oppoData.grade = tempOppoData.oppo.grade;
                vm.oppoData.pkRate = tempOppoData.oppo.pkRate;
                vm.oppoData.avatar = tempOppoData.oppo.avatar;
                // 将对手信息存入sessionStorage
                storage.setItem('oppoData', message.data);
                vm.roomId = tempOppoData.pkRoomId;
                loadMatchInfo();
            });
        }

        //未匹配到等待时计时
        function waitingTiming() {
            vm.waitingTime = 0;
            vm.waitingTimeText = '已等待:';
            vm.waitingButtonText = '准备';
            $interval.cancel(timePromise);
            timePromise = $interval(function() {
                if (vm.waitingTime >= waitingTimeSize) {
                    vm.waitingButtonBox = false;
                    // $location.path("/pk-menu");
                }
                vm.waitingTime += 1000;
            }, 1000);
        }

        //匹配到后准备时倒计时
        function readyTiming() {
            vm.waitingTimeText = '倒计时:';
            vm.waitingButtonText = '换房间';
            timePromise = $interval(function() {
                if (vm.waitingTime <= 0) {
                    $interval.cancel(timePromise);
                    $location.path("/pk-page/" + vm.courseId + "/" + vm.roomId);
                } else {
                    vm.waitingTime -= 1000;
                }
            }, 1000);
        }

        //开始匹配
        function stratMatching() {
            vm.infoBox = false;
            connectWebSocket();
            // console.log(vm.webSocket.status());
            // while (vm.webSocket.status() != true) {
            //     console.log(vm.webSocket.status());
            // }
            vm.waitingButtonBox = true;
            vm.waitingTiming();
        }

        //加载匹配信息
        function loadMatchInfo() {
            $interval.cancel(timePromise);
            vm.waitingTime = waitingTimeSize;
            vm.infoBox = true;
            vm.waitingButtonBox = false;
            vm.waitingTime = readyTimeSize;
            vm.readyTiming();
        }

    }

})();
