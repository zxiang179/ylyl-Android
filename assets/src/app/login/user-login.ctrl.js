/**
 * Created by Lcj on 2016/10/20.
 */
(function () {
    'use strict';
    var ykylLoginHome = angular.module('ykylLoginHome');
    ykylLoginHome.controller('UserLoginCtrl',['userLoginDao','$location',UserLoginCtrl]);
    function  UserLoginCtrl(userLoginDao,$location) {
        var vm = this;
        //vm.user={"phoneNum":"11111111111","password":"111"}

        /*vm.isphoneValid=isphoneValid;*/
        vm.user={
            phoneNum:'',
            password:''
        };
        vm.sendUserMsg = sendUserMsg;
        vm.userError = false;
        /*vm.phoneInvalid = false;

        vm.changeState = changeState;
        var phoneFilter = /^1[34578]\d{9}$/;*/

        /*function changeState() {
            if (vm.phoneInvalid!=false) {
                vm.phoneInvalid = false;
            } else if(  vm.userError != false) {
                vm.userError=false;
            }
        }*/

        function sendUserMsg() {

          /*  if (!phoneFilter.test(vm.user.phoneNum)) {
                vm.phoneInvalid = true;
            } else {
                vm.phoneInvalid = false;
               //
            }*/
            userLoginDao.sendUserLgMsg(vm.user, function (response) {
                if (1 == 1) {
                    $location.path('index');
                }else{
                    vm.userError = true;
                }
            });
                //userLoginDao.sendUserLgMsg(vm.user);
        }

    }


})();
