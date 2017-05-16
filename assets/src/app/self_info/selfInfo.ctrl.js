/**
 * Created by Lcj on 2016/11/7.
 */
(function () {
    'use strict';
    var ykylSelfInfo=angular.module('ykylSelfInfo');
  ykylSelfInfo.controller('SelfInfoCtrl',['$http','userInfoDao',SelfInfoCtrl]);
    function SelfInfoCtrl($http,userInfoDao) {
        var vm=this;
        //vm.changePic=changePic;
        vm.showChange=false;
        vm.saveSelfInfo=saveSelfInfo;
        //vm.username=selfInfoSetDao.usernameGet();

        userInfoDao.userUpdateSet(true);
         vm.user =userInfoDao.userInfoGet();


        if(vm.user.hasValue!=true){

            userInfoDao.getSelfInfo(function (response) {
                    vm.user=response;
                if(vm.user.gender==0){
                    vm.user.genderName='男';
                }else if(vm.user.gender==1){
                    vm.user.genderName='女';
                }
                vm.user.gradeName=vm.user.grade + '年级';
            });


            //selfInfoSetDao.userInfoSet(vm.user);

       /*$http.get('selfInfo.json').success(function (response) {
           vm.user=response.user[0];
       });*/
        }else if(vm.user.username){
            vm.user=userInfoDao.userInfoGet();

        }



        function saveSelfInfo() {
            userInfoDao.userInfoSet(vm.user);
        }




    }
})();