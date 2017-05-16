/**
 * Created by Lcj on 2016/11/9.
 */
(function () {
    'use strict';
    var ykylSelfInfo=angular.module('ykylSelfInfo');
    ykylSelfInfo.controller('InfoGenderCtrl',['userInfoDao',InfoGenderCtrl]);
    function InfoGenderCtrl(userInfoDao) {
        var vm =this;
        vm.choseGender=choseGender;
        vm.saveGendername=saveGendername;
        vm.gNameNow=userInfoDao.genderGet();
        vm.gender = [{id: 0, gName: '男'}, {id: 1, gName: '女'}];
        vm.genderNow;

        function choseGender(gender) {
            vm.genderNow=gender;
            vm.gNameNow= vm.genderNow.gName;
            //vm.gIdNow=vm.genderNow.id;
        }

        function saveGendername() {

            userInfoDao.saveGendername(vm.genderNow.id,function (response) {

            });
            userInfoDao.genderSet(vm.gNameNow);
        }


    }
})();