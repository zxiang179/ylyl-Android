/**
 * Created by Lcj on 2016/11/7.
 */
(function () {
    "use strict";
    var utils = angular.module('ykylUtils');
    utils.service('selfInfoSetDao', ['YkylConnection', '$http',selfInfoSetDao]);
    function selfInfoSetDao(conn,$http) {
        var vm=this;
        var BASE_URL='/selfInfo';
        vm.saveUsername=saveUsername;
        vm.getSelfInfo=getSelfInfo;
        vm.usernameSet=usernameSet;
        vm.usernameGet=usernameGet;
        vm.genderSet=genderSet;
        vm.genderGet=genderGet;
        vm.gradeSet=gradeSet;
        vm.gradeGet=gradeGet;
        vm.userInfoGet=userInfoGet;
        vm.userInfoSet=userInfoSet;

        vm.user={
            'username':'',
            'gender':'',
            'genderId':'',
            'graderId':'',
            'grade':'',
            'schoolId':'',
            'school':'',
            'hasValue':false
        };


        function getSelfInfo(callback) {
          /*  $http.get('selfInfo.json').success(function (response) {
                callback(response);

            });*/
            conn.post('selfInfo.json',{'selfInfo':selfInfo},callback);

        }

        function saveUsername(username,callback) {
            conn.get(BASE_URL+'',{'username':username},callback);
        }

        function usernameSet(username) {
            vm.user.username=username;
            vm.user.hasValue=true;
        }

        function usernameGet() {
            return vm.user.username;
        }
        
        function genderSet(data) {
            vm.user.gender=data;
            vm.user.hasValue=true;
        }

        function genderGet() {
            return vm.user.gender;
        }

        function gradeSet(data) {
            vm.user.grade=data;
            vm.user.hasValue=true;
        }
        function gradeGet() {
            return vm.user.grade;
        }
        
        function userInfoSet(user) {
            vm.user=user;
            //vm.user.hasValue=true;
        }
        function userInfoGet() {
            return vm.user;
        }

    }

})();