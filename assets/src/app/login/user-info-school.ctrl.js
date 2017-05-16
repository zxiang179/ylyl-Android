/**
 * Created by Lcj on 2016/10/28.
 */
(function () {
    'use strict';
    var ykylLoginHome = angular.module('ykylLoginHome');
    ykylLoginHome.controller('UserSchoolInfoCtrl',['$http','$location','userInfoDao',UserSchoolInfoCtrl]);
    function UserSchoolInfoCtrl($http,$location,userInfoDao) {
        var vm=this;
        vm.isShow=isShow;
        vm.saveSchool=saveSchool;
        vm.returnPath=returnPath;
        vm.returnState=false;
        vm.schoolName=undefined;

       // vm.districtList=[{id:10,loName:'徐汇区',school:[{sid:101,name:'徐汇中学',isSchool:false},{sid:102,name:'市一中',isSchool:false},{sid:103,name:'市二中',isSchool:false}],isChose:false},{id:11,loName:'普陀区',school:[{sid:1,name:'普陀中学',isSchool:false},{sid:2,name:'华师附中',isSchool:false}],isChose:false}];

        $http.get("../dao/user/json/school.json").success(function (response) {
            vm.districtList=response;
            //console.log(response);
        }).error(function (response) {
            alert("网络出错！");
            //console.log(response);
        });
        function isShow(id) {
            for (var i = 0; i < vm.districtList.length; i++) {
                if (i === (id-vm.districtList[0].id)) {
                    vm.districtList[i].isChose = ! vm.districtList[i].isChose;
                } else {
                    vm.districtList[i].isChose = false;
                }
            }
        }

        function returnPath() {
            vm.returnState=userInfoDao.userUpdateGet();
            if(vm.returnState==false){
                $location.path('/userInfo');
            }else{
                $location.path('/selfInfo');
            }
        }

        function saveSchool(id,sid,name) {
            vm.discSchoolData= {
                districtId:id,
                schoolId:sid
            };
            vm.returnState=userInfoDao.userUpdateGet();
            if(vm.returnState!=false){
                vm.schoolName=userInfoDao.schoolInfoGet();
                userInfoDao.saveSchoolName(vm.discSchoolData,function (response) {

                 });
            }
           userInfoDao.schoolInfoSet(id,sid,name);
            for (var i = 0; i < vm.districtList.length; i++) {
                for(var j=0;j< vm.districtList[i].school.length;j++){
                    if (i === (id-vm.districtList[0].id)) {
                        if(j ===(sid-(vm.districtList[i].school[0].schoolId))){
                            vm.districtList[i].school[j].isSchool=true;
                        }else {
                            vm.districtList[i].school[j].isSchool=false;
                        }
                    }else {
                        vm.districtList[i].school[j].isSchool=false;
                    }
                }
            }

            returnPath();

        }



    }
})();