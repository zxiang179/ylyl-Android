/**
 * Created by Lcj on 2016/11/12.
 */
(function () {
    'use strict';
    var ykylSelfInfo=angular.module('ykylSelfInfo');
    ykylSelfInfo.controller('InfoPasswordCtrl',['userInfoDao','$location',InfoPasswordCtrl]);
    function InfoPasswordCtrl(userInfoDao,$location) {
        var vm = this;
        vm.oldPassNull=false;
        vm.oldPassError=false;
        vm.newPassNull=false;
        vm.newPassInvalid =false;
        vm.newPassError=false;
        vm.rePassNull=false;
        vm.rePassErroe=false;
        vm.changeState=changeState;
        vm.savePassword=savePassword;

        function changeState() {
            if( vm.oldPassNull!=false ||vm.oldPassError!=false || vm.newPassNull!=false
                || vm.newPassInvalid!=false||vm.newPassError ||vm.rePassNull!=false||vm.rePassErroe!=false){
                vm.oldPassNull=false;
                vm.oldPassError=false;
                vm.newPassNull=false;
                vm.newPassInvalid =false;
                vm.newPassError=false;
                vm.rePassNull=false;
                vm.rePassErroe=false;
            }
        }

        function savePassword() {
            if(!vm.oldPass){
                vm.oldPassNull=true;
            }else if(!vm.newPass){
                vm.newPassNull=true;
            }else if(!vm.newRePass){
                vm.rePassNull=true;
            }else if(vm.newPass.length<6){
                vm.newPassInvalid =true;
            }else if(vm.newPass==vm.oldPass){
                vm.newPassError=true;
            }else if(vm.newPass!=vm.newRePass){
                vm.rePassErroe=true;
            }


            vm.updatePass={
                oldPass:vm.oldPass,
                newPass:vm.newPass
            };

            if(vm.oldPassNull==false &&vm.oldPassError==false && vm.newPassNull==false
                &&vm.newPassInvalid==false&&vm.newPassError==false&&vm.rePassNull==false&&vm.rePassErroe==false){
            userInfoDao.savePassword(vm.updatePass,function (response) {
                    if(response==0){
                        vm.oldPassError=true;
                    }else{
                        $location.path('/selfInfo');
                    }
                });
                //$location.path('/selfInfo');
            }

        }



    }


})();