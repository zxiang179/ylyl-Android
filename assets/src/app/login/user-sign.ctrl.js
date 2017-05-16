/**
 * Created by Lcj on 2016/10/22.
 */
(function () {
    'use strict';
    var ykylLoginHome = angular.module('ykylLoginHome');
    ykylLoginHome.controller('UserSignCtrl',['$http','userSignDao','userInfoDao','$location',UserSignCtrl]);

    function UserSignCtrl($http,userSignDao,userInfoDao,$location) {
        var vm = this;
        vm.sendUserSignMsg=sendUserSignMsg;
        vm.checkPass=checkPass;

        /*vm.phoneInvalid = false;
        vm.passwordNull=false;
        vm.passwordError = false;*/
        vm.userExist=false;
        vm.passwordError=false;
       /* vm.passwordInvalid=false;
        //vm.checkPhone = checkPhone;
        vm.changeState=changeState;*/
        //var phoneFilter = /^1[34578]\d{9}$/;

        /*function changeState() {
            if(vm.phoneInvalid!=false){
                vm.phoneInvalid=false;
            }else if(vm.passwordNull!=false){
                vm.passwordNull=false;
            }else if(vm.passwordInvalid!=false) {
                vm.phoneInvalid=false;
            }
            else if(vm.passwordError!=false){
                vm.passwordError=false;
            }else if(vm.userExist!=false){
                vm.userExist=false;
            }
        }*/

       /* function checkPhone() {
            if (!phoneFilter.test(vm.user.phoneNum)) {
                vm.phoneInvalid = true;
            } else {
                vm.phoneInvalid = false;
                vm.userError=false;
            }
        }*/
        /*var phoneFilter = /^1[34578]\d{9}$/;*/
        function checkPass(){
            if(vm.user.password!=vm.user.rePassword){
                vm.passwordError=true;
            }else{
                vm.passwordError=false;
            }
        }
        function sendUserSignMsg() {

            if(vm.user){
                /*if(!phoneFilter.test(vm.user.phoneNum) ){
                    vm.phoneInvalid = true;
                    //alert("手机号输入格式不正确，请重新输入！");
                 }else  {
                     vm.phoneInvalid = false;
                 }
                 if(! vm.user.password){
                    vm.passwordNull=true;
                     //alert("密码不能为空！")
                } else {
                     vm.passwordNull=false;
                 }
                    if(vm.user.password.length<6){
                    vm.passwordInvalid=true;
                } else{
                        vm.passwordInvalid=false;
                    } if(vm.user.password!=vm.user.rePassword){
                        vm.passwordError=true;
                    //alert("两次密码输入不一致！");
                }else{
                    vm.passwordError=false;
                }*/
                vm.newUser={
                    phoneNum:vm.user.phoneNum,
                    password:vm.user.password
                };


                userSignDao.sendUserSignMsg(vm.newUser,function (response) {
                    //console.log(typeof response);
                    if (response=== false){
                        vm.userExist=true;
                    }else{
                        vm.userExist=false;
                        userInfoDao.userIdSet(response);
                        $location.path('/userInfo');
                    }
                 });
            }/*else{
                alert("请输入手机号！")
            }*/
        }
    }


})();