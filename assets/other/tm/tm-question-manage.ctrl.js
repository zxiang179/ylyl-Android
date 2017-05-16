/**
 * Created by yu on 2016/11/5.
 */

(function () {
    'use strict';

    var ykylTmApp = angular.module('ykylTmApp');
    ykylTmApp.controller('tmQuesManageCtrl', ['$http', tmQuesManageCtrl]);
    function tmQuesManageCtrl($http) {
        var vm = this;

        // 题库一级年级，list(object)
        vm.gradeList = undefined;
        // 题库二级科目，list(object)
        vm.subjectList = undefined;
        // 题库三级知识点，list(object)
        vm.knPointList = undefined;
        // 题库题目类型，list(object)
        vm.questionTypeList = undefined;

        // 投影二级科目，list(object)
        vm.projSubjectList = undefined;

        // 显示科目选择框
        vm.subjectBox = undefined;
        // 显示知识点选择框
        vm.knPointBox = undefined;

        // 所选一级年级，object
        vm.selectedGrade = undefined;
        // 所选二级科目，object
        vm.selectedSubject = undefined;
        // 所选三级知识点，object
        vm.selectedKnPoint = undefined;
        // // 筛选结果，list(object)
        // vm.selectedKeyword = undefined;
        // 筛选题目类型，list(object)
        vm.selectedQuestionType = undefined;

        // // 页面
        // vm.questionPage = undefined;


        vm.showSubjectSelect = showSubjectSelect;
        vm.showKnPointSelect = showKnPointSelect;

        loadMetaData();

        function loadMetaData() {

            // 初始化bank
            $http.get("json/tm-menu-subject.json").success(function (response) {
                vm.gradeList = response.grades;
                vm.selectedGrade = [];
                vm.subjectBox = false;
                vm.subjectList = [];
                vm.selectedSubject = [];
                vm.questionTypeList = response.questiontype;
                vm.selectedQuestionType = [];
            });
        }

        /**
         * 1.清空所选课程
         * 2.根据年级加载可选课程
         * 3.投影所选课程名称
         * 4.显示选择框
         */
        function showSubjectSelect() {
            // 清空所选课程
            vm.subjectList = [];
            // 根据年级加载可选课程
            if (vm.selectedGrade.length != 0) {
                for (var i in vm.selectedGrade) {
                    vm.subjectList = vm.subjectList.concat(vm.selectedGrade[i].subjects);
                }
                // 投影所选课程名称
                vm.subjectList.sort(function (a, b) {
                    if (a.id > b.id) {
                        return 1;
                    } else if (a.id < b.id) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
                vm.projSubjectList = [];
                for (var i = 0, j = 0; i < vm.subjectList.length - 1; i++) {
                    if (vm.subjectList[i].name != vm.subjectList[i + 1].name) {
                        vm.projSubjectList.push(
                            {
                                index: j,
                                num: i,
                                id: vm.subjectList[i].id,
                                name: vm.subjectList[i].name
                            }
                        );
                        j++;
                    }
                }
                vm.projSubjectList.push(
                    {
                        index: j,
                        num: vm.subjectList.length - 1,
                        id: vm.subjectList[i].id,
                        name: vm.subjectList[i].name
                    }
                );
                // 显示选择框
                vm.subjectBox = true;
                vm.knPointList = [];
                vm.knPointBox = false;
            } else {
                // 隐藏选择框
                vm.subjectList = [];
                vm.projSubjectList = [];
                vm.subjectBox = false;
                vm.knPointList = [];
                vm.knPointBox = false;
            }
        }

        /**
         * 1.清空所选知识点
         * 2.根据年级、选课加载可选知识点
         * 3.显示选择框
         */
        function showKnPointSelect() {
            // 清空所选知识点
            vm.knPointList = [];
            // 根据年级、选课加载可选知识点(从projSubjectList倒查subjectList)
            if (vm.selectedSubject.length != 0) {
                for (var i = 0; i < vm.selectedSubject.length; i++) {
                    if (vm.selectedSubject[i].index === 0) {
                        var start = 0;
                        var end = vm.selectedSubject[i].num;
                    } else {
                        var index = vm.selectedSubject[i].index;
                        start = vm.projSubjectList[index - 1].num + 1;
                        end = vm.selectedSubject[i].num;
                    }
                    for (var j = start; j <= end; j++) {
                        vm.knPointList = vm.knPointList.concat(vm.subjectList[j].knowledgePoints);
                    }
                }
                // 显示选择框
                vm.knPointBox = true;
            } else {
                vm.knPointList = [];
                vm.knPointBox = false;
            }
        }
    }
})();