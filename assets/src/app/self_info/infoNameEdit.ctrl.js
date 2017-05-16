/**
 * Created by Lcj on 2016/11/8.
 */
(function () {
    'use strict';
    var ykylSelfInfo=angular.module('ykylSelfInfo');
    ykylSelfInfo.controller('InfoNameCtrl',['userInfoDao',InfoNameCtrl]);
    function InfoNameCtrl(userInfoDao) {
        var vm=this;
        vm.saveUsername=saveUsername;
        vm.username=userInfoDao.usernameGet();
        
        function saveUsername() {

            userInfoDao.saveUsername(vm.username,function (response) {

            });
            userInfoDao.usernameSet(vm.username);
        }




    }
})();