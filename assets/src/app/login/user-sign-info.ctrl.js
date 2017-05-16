/**
 * Created by Lcj on 2016/10/24.
 */
(function () {
    'use strict';
    var ykylLoginHome = angular.module('ykylLoginHome');
    ykylLoginHome.controller('UserSignInfoCtrl',['$http','userInfoDao',UserSignInfoCtrl]);
    function UserSignInfoCtrl($http,userInfoDao) {
        var vm = this;
        //vm.checkUsername = checkUsername;
        vm.saveUserAllInfo = saveUserAllInfo;
        vm.selectedGender = selectedGender;
        vm.selectedGrade = selectedGrade;
        // vm.getSchoolData=getSchoolData;
        vm.saveUserData = saveUserData;
        //vm.userError=userError;
        vm.changeState=changeState;

        vm.gender = [{id: 0, gName: '男'}, {id: 1, gName: '女'}];
        vm.grades = [{id: 0, gradeName: '一年级'}, {id: 1, gradeName: '二年级'},
            {id: 2, gradeName: '三年级'}, {id: 3, gradeName: '四年级'},
            {id: 4, gradeName: '五年级'}, {id: 5, gradeName: '预备班'},
            {id: 6, gradeName: '初一'}, {id: 7, gradeName: '初二'},
            {id: 8, gradeName: '初三'}, {id: 9, gradeName: '高一'},
            {id: 10, gradeName: '高二'}, {id: 11, gradeName: '高三'}
        ];
        vm.userInfoData = userInfoDao.userInfoGet();
        vm.username = vm.userInfoData.username;
        vm.genderId = vm.userInfoData.genderId;
        vm.gradeId = vm.userInfoData.gradeId;
        //vm.genderSelected=vm.gender[vm.gender];
        //vm.gradeSelected=vm.grades[vm.grade];
        if (vm.username != '') {
            vm.usernameInput = vm.username;
        }
        if (vm.genderId == '') {
            vm.genderSelected = vm.gender[0];
        } else {
            vm.genderSelected = vm.gender[vm.genderId];
        }
        if (vm.gradeId == '') {
            vm.gradeSelected = vm.grades[0];
        } else {
            vm.gradeSelected = vm.grades[vm.gradeId];
        }

        //vm.schoolData = userInfoDao.schoolInfoGet();
        vm.districtId = vm.userInfoData.districtId;
        vm.schoolId = vm.userInfoData.schoolId;
        vm.schoolName = vm.userInfoData.schoolName;
        if (vm.schoolName == '') {
            vm.showSchool = false;
        } else {
            vm.showSchool = true;
        }


        function changeState() {
            if(vm.userError!=false){
                vm.userError=false;
            }
        }
        //vm.isSelected=[true,false];
        //selectedIs();
        function selectedGender(id) {
            for (var i = 0; i < vm.gender.length; i++) {
                if (i != id) {
                    vm.gender[i].isSelected = false;
                } else {
                    vm.gender[i].isSelected = true;
                    vm.genderSelected = vm.gender[i];
                }
                //console.log(vm.gender[i].isSelected);
            }
        }


        function selectedGrade(id) {
            for (var i = 0; i < vm.grades.length; i++) {
                if (i != id) {
                    vm.grades[i].isSelected = false;
                } else {
                    vm.grades[i].isSelected = true;
                    vm.gradeSelected = vm.grades[i];
                }
                // console.log(vm.grades[i].isSelected);
            }
        }

        /*vm.userSendData={
         username:vm.usernameInput,
         genderId: vm.genderSelected.id,
         gradeId: vm.gradeSelected.id};
         userInfoDao.userInfoSet(vm.userSendData);*/

        //  console.log(vm.userInfo.username);
        //saveUserData();
        function saveUserData(username, genderId,genderName, gradeId,gradeName) {
            vm.userSendData = {
                username: username,
                genderId: genderId,
                genderName:genderName,
                gradeId: gradeId,
                gradeName:gradeName
            };
            userInfoDao.userInfoSet(vm.userSendData);
        }


        function saveUserAllInfo() {
            vm.userid=userInfoDao.userIdGet();
            vm.userAllInfo = {
                sendUsername: vm.usernameInput,
                sendGenderId: vm.genderSelected.id,
                sendDistrictId: vm.districtId,
                sendSchoolId: vm.schoolId,
                sendGradeId: vm.gradeSelected.id,
                userId:vm.userid
            };
            if (vm.userAllInfo) {
               /* if (vm.userAllInfo.sendUsername.length >= 12) {
                    alert("用户名长度不得大于12位，请重新输入！");
                } else {*/
                    userInfoDao.saveUserAllInfo(vm.userAllInfo, function(response) {
                        if(response=="update failure"){
                            vm.usenameError=true;
                        }else{
                            vm.usenameError=false;
                             $location.path('/index');
                            /*alert("success");*/
                        }
                    });
                //}
                /* userInfoDao.saveUserAllInfo(vm.userInfo,function(response){
                 alert(response);
                 });
                 }else {
                 alert("请输入用户名！")
                 }*/
            }else{
                $location.path('#/sign');
            }

            //getSchoolData();
            /* if(vm.genderSelected  ){
             getSchoolData();
             }*/
            /* function getSchoolData() {
             //console.log(vm.userInfo.username);
             vm.schoolData=userInfoDao.schoolInfoGet();
             //vm.userGetData=userInfoDao.userInfoGet();
             /!* vm.username= vm.userGetData.username;
             vm.gender=vm.userGetData.gender;
             vm.grade=vm.userGetData.grade;*!/
             /!* vm.genderSelected=vm.gender[vm.gender];
             vm.gradeSelected=vm.grades[vm.grade];*!/
             vm.schoolName=vm.schoolData.schoolName;
             // vm.grades[vm.gradeSelected].isSelected=true;

             console.log(vm.schoolName);
             if(  vm.schoolName){

             }
             }*/

        }
    }
})();
