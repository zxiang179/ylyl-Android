/**
 * Created by yu on 2016/11/3.
 */

(function () {
    'use strict';

    var ykylTmApp = angular.module('ykylTmApp');

    ykylTmApp.controller('tmLayoutCtrl', [ '$location', '$http', tmLayoutCtrl]);
    function tmLayoutCtrl( $location, $http) {
        var vm = this;

        // 目录
        vm.tmMenu = undefined;

        loadMetaData();

        function loadMetaData() {
            vm.tmMenu = [{
                name: '试题管理',
                url: '#/tm-ques-manage'
            }, {
                name: '添加试题',
                url: '#/tm-ques-submit'
            }, {
                name: '添加知识点',
                url: '#/tm-tag-submit'
            }];
        }
    }

})();