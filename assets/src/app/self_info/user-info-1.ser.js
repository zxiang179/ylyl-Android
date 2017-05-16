/**
 * Created by Lcj on 2016/11/10.
 */
/**
 * Created by Lcj on 2016/10/30.
 */
(function () {
    "use strict";
    var utils = angular.module('ykylUtils');
    utils.factory('userInfoDao',['YkylConnection',userInfoDao]);
    function userInfoDao(conn) {
        var vm=this;
        var BASE_URL='/userInfo';
        //vm.checkUsername=checkUsername;
        vm.schoolInfoSet=schoolInfoSet;
        vm.schoolInfoGet=schoolInfoGet;
        vm.userInfoSet=userInfoSet;
        vm.userInfoGet=userInfoGet;
        vm.saveUserAllInfo=saveUserAllInfo;
        vm.userIdSet=userIdSet;
        vm.userIdGet=userIdGet;
        vm.schoolData={
            districtId:'',
            schoolId:'',
            schoolName:''
        };
        vm.userInfoData={
            username:'',
            genderId: '',
            genderName:'',
            gradeId:'',
            gradeName:''
        };
        /* vm.schoolData={
         /!*districtId:'',
         schoolId:'',
         schoolName:''*!/
         };
         vm.userInfoData={
         username:'',
         genderId:'',
         diId:'',
         schoolId:'',
         gradeId:''
         };*/

        /* function checkUsername(username,callback) {
         conn.post(BASE_URL+'checkUsername',{"username":username},callback);
         }*/

        function schoolInfoSet(data) {
            /* vm.schoolData={
             districtId:'did',
             schoolId:'sid',
             schoolName:'sname'
             };*/
            vm.schoolData=data;
            //console.log(vm.schoolData);

        }

        function userIdSet(id) {
            vm.userid=id;
        }


        function schoolInfoGet() {
            return vm.schoolData;
        }

        function userInfoSet(data) {
            vm.userInfoData=data;
        }

        function userInfoGet() {
            return vm.userInfoData;
        }
        function userIdGet() {
            return vm.userid;
        }

        return{
            schoolInfoSet:schoolInfoSet,
            schoolInfoGet:schoolInfoGet,
            userInfoSet:userInfoSet,
            userInfoGet:userInfoGet,
            userIdSet:userIdSet,
            userIdGet:userIdGet
        };

        function saveUserAllInfo(userInfo,callback) {
            conn.post(BASE_URL+'saveUserInfo',userInfo,callback);
        }
    }





})();