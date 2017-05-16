/**
 * Created by yu on 2016/10/28.
 */

(function () {
    'use strict';

    var ykylTmApp = angular.module('ykylTmApp');

    //$http 仅测试用，接口完整后删除
    ykylTmApp.controller('tmQuesSubmitCtrl', ['$http', tmQuesSubmitCtrl]);
    function tmQuesSubmitCtrl($http) {
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
        // 所选三级知识点，object
        vm.selectedKnPoint = undefined;

        // 题目类型
        vm.questionType = undefined;
        // 题目内容
        vm.questionContent = undefined;
        // 题目解析
        vm.questionAnalyse = undefined;
        // 题目知识点
        vm.questionTabs = undefined;
        // 答题框样式
        vm.answerBox = undefined;
        // 题目答案
        vm.questionAnswer = undefined;
        // 题目答案(仅单、多选有)
        vm.questionOptions = undefined;
        // 题目显示样式
        vm.answerBox = undefined;

        vm.selectGrade = selectGrade;
        vm.selectSubject = selectSubject;
        vm.showAnswerBox = showAnswerBox;
        vm.sendQuestion = sendQuestion;


        loadMetaData();

        function loadMetaData() {
            vm.questionType = 0;
            vm.answerBox = new Array(4);
            // 初始化bank
            $http.get("json/tm-menu-subject.json").success(function (response) {
                vm.gradeList = response.grades;
                vm.selectedGrade = vm.gradeList[0].id;
                vm.subjectList = vm.gradeList[0].subjects;
                vm.selectedSubject = vm.subjectList[0].id;
                vm.knPointList = vm.subjectList[0].knowledgePoints;
                vm.selectedKnPoint = vm.knPointList[0].id;
                vm.questionType = '0';
            });
            showAnswerBox();
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


        function showAnswerBox() {
            var num = vm.questionType;
            for (var item= 0; item < vm.answerBox.length; item++) {
                vm.answerBox[item] = {'display': 'none'};
            }
            vm.answerBox[num] = {'display': 'inline'};
            switch (num) {
                case '0':
                    vm.questionAnswer = NaN;
                    break;
                case '1':
                    vm.questionAnswer = [false, false, false, false];
                    break;
                case '2':
                    vm.questionAnswer = '';
                    break;
                case '3':
                    vm.questionAnswer = '';
                    break;
                default:
                    break;
            }
        }

        function sendQuestion() {
            var ans = {
                "type": vm.questionType,
                "question": vm.questionContent,
                "answer": vm.questionAnswer,
                "options": vm.questionOptions,
                "analyse": vm.questionAnalyse,
                "tabs": vm.questionTabs
            };
            testSpecPostDao.postQuestion(angular.toJson(ans), function (response) {
            });
        }
    }
    
})();