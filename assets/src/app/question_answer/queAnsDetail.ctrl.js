/**
 * Created by Lcj on 2016/12/15.
 */
(function () {
    'use strict';
    var ykylQueAnsCenter=angular.module('ykylQueAnsCenter');
    ykylQueAnsCenter.controller('QueAnsDetailCtrl',['$http','queAnsMainDao','$window',QueAnsDetailCtrl]);
    function QueAnsDetailCtrl($http,queAnsMainDao,$window) {
        var vm=this;
        vm.getAnsContent=getAnsContent;
        var storage = $window.sessionStorage;
        vm.queDetailStr=storage.getItem('currentQuestion');
        vm.queDetail=angular.fromJson(vm.queDetailStr);
        vm.isSupported=false;
        vm.updateSupport=updateSupport;

        getAnsContent();

        function getAnsContent() {
            /* vm.id=vm.queDetail.id,
            queAnsMainDao.getAnsDetailContent(vm.queDetail.id,function (response) {
             vm.allContent=response;
             });*/

            $http.get('../dao/user/json/answer.json').success(function (response) {
                vm.answerContent=response;
            });
        }
        function updateSupport(num) {
           vm.supportNum=vm.answerContent.supportCount;
            queAnsMainDao.updateSupportNum(num);
        }

    }
})();