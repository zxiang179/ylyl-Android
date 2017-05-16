/**
 * Created by Lcj on 2016/10/30.
 */
(function () {
    "use strict";
    var utils = angular.module('ykylUtils');
    utils.service('userInfoDao',['YkylConnection','$http',userInfoDao]);
    function userInfoDao(conn,$http) {
        var vm=this;
        var BASE_URL='/selfInfo';
        var BASE_URL2='/user';
        //vm.checkUsername=checkUsername;
        vm.schoolInfoSet=schoolInfoSet;
        vm.schoolInfoGet=schoolInfoGet;
        vm.userInfoSet=userInfoSet;
        vm.userInfoGet=userInfoGet;
        vm.saveUserAllInfo=saveUserAllInfo;
        vm.userIdSet=userIdSet;
        vm.userIdGet=userIdGet;
        vm.userUpdateSet=userUpdateSet;
        vm.userUpdateGet=userUpdateGet;

        vm.getSelfInfo=getSelfInfo;
        vm.usernameSet=usernameSet;
        vm.usernameGet=usernameGet;
        vm.genderSet=genderSet;
        vm.genderGet=genderGet;
        vm.gradeSet=gradeSet;
        vm.gradeGet=gradeGet;
        vm.saveUsername=saveUsername;
        vm.saveGendername=saveGendername;
        vm.saveGradename=saveGradename;
        vm.saveSchoolName=saveSchoolName;
        vm.savePassword=savePassword;
        vm.isUpdate=false;

        vm.userInfoData={
            name:'',
            genderId: '',
            genderName:'',
            gradeId:'',
            gradeName:'',
            districtId:'',
            school:'',
            schoolId:'',
            hasValue:false

        };



        function userInfoSet(data) {
            vm.userInfoData=data;
            vm.userInfoData.hasValue=true;
        }
        function userInfoGet() {
            return vm.userInfoData;
        }

        function userIdSet(id) {
            vm.userid=id;
        }
        function userIdGet() {
            return vm.userid;
        }

        function usernameSet(username) {
            vm.userInfoData.name=username;
            vm.userInfoData.hasValue=true;
        }
        function usernameGet() {
            return vm.userInfoData.name;
        }

        function genderSet(data) {
            vm.userInfoData.genderName=data;
            vm.userInfoData.hasValue=true;
        }
        function genderGet() {
            return vm.userInfoData.gender;
        }

        function gradeSet(data) {
            vm.userInfoData.gradeName=data;
            vm.userInfoData.hasValue=true;
        }
        function gradeGet() {
            return vm.userInfoData.grade;
        }

        function schoolInfoSet(id,sid,name) {
            vm.userInfoData.districtId=id;
                vm.userInfoData.schoolId=sid;
                vm.userInfoData.school=name;
            vm.userInfoData.hasValue=true;
        }
        function schoolInfoGet() {
            return vm.userInfoData.schoolName;
        }

        function userUpdateSet(data) {
            vm.isUpdate=data;
        }
        function userUpdateGet() {
            return  vm.isUpdate;
        }



        function getSelfInfo(callback) {
            /*$http.get('selfInfo.json').success(function (response) {
                callback(response);
            });*/
            conn.get(BASE_URL+'/getUser',{ },callback);
            //conn.post('selfInfo.json',{'userId':userId},callback);
        }

        function saveUsername(username,callback) {
            conn.get(BASE_URL+'/updateUserName',{'username':username},callback);
        }

        function saveGendername(gendername,callback) {
            conn.get(BASE_URL+'/updateUserGender',{'gender':gendername},callback);
        }
        function saveGradename(gradename,callback) {
            conn.get(BASE_URL+'/updateUserGrade',{'grade':gradename},callback);
        }

        function saveSchoolName(discSchoolData,callback) {
            conn.get(BASE_URL+'/updateUserSchoolAndDistrict',{'school':discSchoolData.schoolId,'school_district':discSchoolData.districtId},callback);
        }

        function savePassword(password,callback) {
            conn.get(BASE_URL+'/checkUserPassword',{'oldPassword':password.oldPass,'newPassword':password.newPass},callback);
        }
        function saveUserAllInfo(userInfo,callback) {
            conn.get(BASE_URL2+'/updateUser',{"name":userInfo.sendUsername,"school":userInfo.sendSchoolId,"gender":userInfo.sendGenderId,"grade":userInfo.sendGradeId,"school_district":userInfo.sendDistrictId,"id":userInfo.userId},callback);
        }
    }





})();