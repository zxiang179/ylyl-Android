/**
 * Created by yu on 2016/10/28.
 */

(function () {
    'use strict';

    var ykylTestApp = angular.module('ykylTestApp');
    //$http 仅测试用，接口完整后删除
    ykylTestApp.controller('testSpecAnsCtrl', ['TestSpecAnsDao', '$routeParams', testSpecAnsCtrl]);
    function testSpecAnsCtrl(testSpecAnsDao, $routeParams) {
        var vm = this;

        // 题目id
        vm.testId = $routeParams.id;
        // 课程名
        vm.testTitle = undefined;
        // 题目
        vm.questionContent = undefined;
        // 题目选项
        vm.questionOptions = undefined;
        // 题目答案
        vm.questionAnswer = undefined;
        // 题目解析
        vm.questionReason = undefined;
        // 题目分析
        vm.questionAnalyse = undefined;
        // 题目知识点
        vm.questionLabels = undefined;

        loadMetaData();

        function loadMetaData() {
            testSpecAnsDao.getAnswer(vm.testId, function (response) {
                vm.testTitle = response.name;
                vm.questionContent = response.question;
                
                // vm.options=new Array();
                // vm.options=response.options;
                // vm.options=vm.options.split(',');
                // vm.questionOptions = vm.options;
                vm.questionOptions=response.options;
                vm.questionAnswer = response.stdAnswer;
                vm.questionReason = response.label;
                vm.questionAnalyse = response.analyse;
                vm.questionLabels = response.knowledgePoint;
                console.log('testTitle:'+JSON.stringify(response));
                console.log('options:'+response.options);

                


            })
        }
    }
})();