/**
 * Created by yu on 2016/12/3.
 */

(function () {
    'use strict';

    var ykylPkApp = angular.module('ykylPkApp');

    ykylPkApp.controller('pkMenuCtrl', ['$http', '$location', '$interval', pkMenuCtrl]);

    function pkMenuCtrl($http, $location, $interval) {
        var vm = this;

        // 模块显示名称
        vm.moduleTitle = undefined;
        // 广告消息列表
        vm.advertiseList = undefined;
        // 显示广告索引
        vm.advertiseNum = undefined;
        // 显示广告
        vm.advertise = undefined;
        // 课程列表
        vm.subjectList = undefined;

        vm.advertiseTiming = advertiseTiming;
        vm.jumpWaitingHall = jumpWaitingHall;

        var timePromise;

        loadMetaData();

        function loadMetaData() {
            vm.moduleTitle = 'P K';
            vm.subjectContent = '';
            vm.subjectList = [{
                id: 'yw',
                name: '语文',
                icon: '../../images/icon/writing.png'
            }, {
                id: 'sx',
                name: '数学',
                icon:'../../images/icon/math.png'
            }, {
                id: 'wy',
                name: '英语',
                icon:'../../images/icon/english.png'
            }];
            vm.advertiseNum = 0;
            vm.testTime = 0;
            $http.get("json/advertise-list.json").success(function (response) {
                vm.advertiseList = response;
                vm.advertise = vm.advertiseList[0].content;
                vm.advertiseTiming();
            });
        }

        function advertiseTiming() {
            // Don't start a new fight if we are already fighting
            if (angular.isDefined(timePromise)) return;

            timePromise = $interval(function() {
                vm.testTime += 3000;
                if (vm.testTime > 9000) {
                    $http.get("json/advertise-list.json").success(function (response) {
                        vm.advertiseList = response;
                        vm.advertiseNum = 0;
                        vm.advertise = vm.advertiseList[0].content;
                        vm.testTime = 0;
                    })
                } else {
                    vm.advertiseNum = (vm.advertiseNum + 1) % vm.advertiseList.length;
                    vm.advertise = vm.advertiseList[vm.advertiseNum].content;
                }
            }, 3000);
        }

        function jumpWaitingHall(id) {
            $interval.cancel(timePromise);
            $location.path("/pk-waiting/" + id);
        }

        
    }

})();