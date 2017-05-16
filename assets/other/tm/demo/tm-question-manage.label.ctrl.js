/**
 * Created by yu on 2016/11/5.
 */

(function () {
    'use strict';

    var ykylTmApp = angular.module('ykylTmApp');
    ykylTmApp.controller('tmQuesManageCtrl', ['$http', '$location', tmQuesManageCtrl]);
    function tmQuesManageCtrl($http, $location) {
        var vm = this;

        // 题库列表√
        vm.bankList = undefined;
        // 题库一级年级，list(object)√
        vm.gradeList = undefined;
        // 题库二级科目，list(object)√
        vm.subjectList = undefined;
        // 题库三级知识点，list(object)√
        vm.knPointList = undefined;
        // 题库题目类型，list(object)√
        vm.questionTypeList = undefined;
        // 页面
        vm.questionPage = undefined;

        // 当前题库，object√
        vm.selectedBank = undefined;
        // 所选一级年级，object√
        vm.selectedGrade = undefined;
        // 所选二级科目，object√
        vm.selectedSubject = undefined;
        // 所选三级知识点，object√
        vm.selectedKnPoint = undefined;
        // 筛选知识点，list(object)
        vm.selectedKeyword = undefined;
        // 筛选题目类型，list(object)
        vm.selectedQuestionType = undefined;


        vm.selectBank = selectBank;
        vm.selectGrade = selectGrade;
        vm.selectSubject = selectSubject;
        vm.selectKnPoint = selectKnPoint;
        vm.selectKeyword = selectKeyword;


        loadMetaData();

        function loadMetaData() {
            $http.get("json/tm-menu-meta.json").success(function (response) {
                vm.bankList = response.bank;
                vm.selectedBank = vm.bankList[0];
                vm.selectedKeyword = [];
                $http.get("json/tm-menu-subject.label.json").success(function (response) {
                    vm.gradeList = response.grades;
                    // // 设置display属性
                    // for (var i in vm.gradeList) {
                    //     vm.gradeList[i]["display"] = true;
                    //     for (var j in vm.gradeList[i].subjects) {
                    //         vm.gradeList[i].subjects[j]["display"] = true;
                    //         for (var k in vm.gradeList[i].subjects[j].knowledgePoints)
                    //             vm.gradeList[i].subjects[j].knowledgePoints[k]["display"] = true;
                    //     }
                    // }
                    vm.selectedGrade = vm.gradeList[0];
                    vm.subjectList = vm.selectedGrade.subjects;
                    vm.selectedSubject = vm.subjectList[0];
                    vm.knPointList = vm.selectedSubject.knowledgePoints;
                    vm.selectedKnPoint = vm.knPointList[0];
                });
                $http.get("json/tm-menu-type.json").success(function (response) {
                    vm.questionTypeList = response.type;
                    vm.selectedQuestionType = vm.questionTypeList;
                });
             });
        }

        function selectBank(item) {
            vm.selectedBank = item;
        }

        function selectGrade(item) {
            vm.selectedGrade = item;
            vm.subjectList = vm.selectedGrade.subjects;
            vm.selectSubject(vm.subjectList[0]);
        }

        function selectSubject(item) {
            vm.selectedSubject = item;
            vm.knPointList = vm.selectedSubject.knowledgePoints;
            vm.selectedKnPoint = vm.knPointList[0];
        }

        function selectKnPoint(item) {
            vm.selectedKnPoint = item;
        }

        function selectKeyword() {
            vm.selectedKeyword.push(
                {
                    grade: vm.selectedGrade,
                    subject: vm.selectedSubject,
                    knpoint: vm.selectedKnPoint
                }
            );
        }
    }
})();