/**
 * Created by yu on 2016/11/21.
 */


(function () {
    'use strict';

    var ykylTmApp = angular.module('ykylTmApp');

    //$http 仅测试用，接口完整后删除
    ykylTmApp.controller('tmTagSubmitCtrl', ['$http', tmTagSubmitCtrl]);
    function tmTagSubmitCtrl($http) {
        var vm = this;

        // 题库一级年级，list(object)
        vm.gradeList = undefined;
        // 所选一级年级，object
        vm.selectedGrade = undefined;
        // 题库二级科目，list(object)
        vm.subjectList = undefined;
        // 所选二级科目，object
        vm.selectedSubject = undefined;
        // 题库三级知识点，list(object)
        vm.knPointList = undefined;
        // 添加知识点内容
        vm.knPointAddText = undefined;

        vm.selectGrade = selectGrade;
        vm.selectSubject = selectSubject;
        vm.deleteKnPoint = deleteKnPoint;
        vm.addKnPoint = addKnPoint;

        loadMetaData();

        function loadMetaData() {
            vm.questionType = 0;
            // 初始化bank
            $http.get("json/tm-menu-subject.json").success(function (response) {
                vm.gradeList = response.grades;
                vm.selectedGrade = vm.gradeList[0].id;
                vm.subjectList = vm.gradeList[0].subjects;
                vm.selectedSubject = vm.subjectList[0].id;
                vm.knPointList = vm.subjectList[0].knowledgePoints;
                vm.selectedKnPoint = vm.knPointList[0].id;
            });
            vm.knPointAddText = '';
        }

        function selectGrade() {
            for (var item in vm.gradeList) {
                if (vm.selectedGrade === vm.gradeList[item].id) {
                    vm.subjectList = vm.gradeList[item].subjects;
                }
            }
            if (vm.subjectList.length > 0) {
                vm.selectedSubject = vm.subjectList[0].id;
                selectSubject();
            }
        }

        function selectSubject() {
            for (var item in vm.subjectList) {
                if (vm.selectedSubject === vm.subjectList[item].id) {
                    vm.knPointList = vm.subjectList[item].knowledgePoints;
                }
            }
            if (vm.knPointList.length > 0) {
                vm.selectedKnPoint = vm.knPointList[0].id;
            }
        }

        function deleteKnPoint(item) {
            // send delete request
            // 自上而下删除搜一遍，但写起来麻烦；自下而上删除搜三遍，但写起来容易
            for (var i in vm.knPointList) {
                if (vm.knPointList[i] === item) {
                    vm.knPointList.splice(i, 1);
                }
            }
            for (var i in vm.subjectList[vm.selectedSubject]) {
                if (vm.subjectList[vm.selectedSubject][i] === item) {
                    vm.subjectList[vm.selectedSubject].splice(i, 1);
                }
            }
            for (var i in vm.gradeList[vm.selectedGrade][vm.selectedSubject]) {
                if (vm.gradeList[vm.selectedGrade][vm.selectedSubject][i] === item) {
                    vm.gradeList[vm.selectedGrade][vm.selectedSubject].splice(i, 1);
                }
            }
            // 这里可以跟后台协商一下要不要刷新
        }

        function addKnPoint() {
            // send add request
            // 这里可以跟后台协商一下要不要刷新
            // 为了id一致性还是从后台刷新比较好
        }


    }
})();