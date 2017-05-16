/**
 * Created by Lcj on 2016/11/9.
 */
(function () {
    'use strict';
    var ykylSelfInfo=angular.module('ykylSelfInfo');
    ykylSelfInfo.controller('InfoGradeCtrl',['userInfoDao',InfoGradeCtrl]);
    function InfoGradeCtrl(userInfoDao) {
        var vm=this;
        vm.saveGrade=saveGrade;
        vm.choseGrade=choseGrade;
        vm.gradeNameNow=userInfoDao.gradeGet();
        vm.grades = [{id: 0, gradeName: '一年级'}, {id: 1, gradeName: '二年级'},
            {id: 2, gradeName: '三年级'}, {id: 3, gradeName: '四年级'},
            {id: 4, gradeName: '五年级'}, {id: 5, gradeName: '预备班'},
            {id: 6, gradeName: '初一'}, {id: 7, gradeName: '初二'},
            {id: 8, gradeName: '初三'}, {id: 9, gradeName: '高一'},
            {id: 10, gradeName: '高二'}, {id: 11, gradeName: '高三'}
        ];
        vm.genderNow;
        function choseGrade(grade) {
            vm.genderNow=grade;
            vm.gradeNameNow= vm.genderNow.gradeName;
        }

        function saveGrade() {

            userInfoDao.saveGradename( vm.genderNow.id,function (response) {

            });
            userInfoDao.gradeSet(vm.gradeNameNow);
        }


    }
})();