/**
 * Created by yu on 2016/12/15.
 */

(function () {
    'use strict';

    var ykylPkApp = angular.module('ykylPkApp');

    ykylPkApp.controller('pkPageCtrl', ['PkPageDao',
        '$routeParams', '$window', '$interval', '$location', '$uibModal', '$timeout', pkPageCtrl]);
    function pkPageCtrl(pkPageDao, $routeParams, $window, $interval, $location, $uibModal, $timeout) {
        var vm = this;
        var storage = $window.sessionStorage;

        // var pkTimeSize = 120000;

        // 模块显示名称
        vm.moduleTitle = undefined;
        // 所选课程id
        vm.courseId = undefined;
        // 匹配房间号
        vm.roomId = undefined;
        // 用户信息
        vm.userData = undefined;
        // 对战者信息
        vm.oppoData = undefined;

        // 总题数，等于缓存题目数
        vm.questionCount = undefined;
        // 题目缓存
        vm.questionList = undefined;
        // pk倒计时
        vm.pkTime = undefined;
        // 当前题目样式
        vm.currentQuestionType = undefined;
        //当前题目缓存
        vm.currentQuestion = undefined;
        // 当前缓存题目绝对序号，从后端获取，与后端交互以及前端的主键
        vm.currentQuestionId = undefined;
        // 当前缓存题目相对科目序号，从后端获取，用于显示
        vm.currentQuestionAbsNum = undefined;
        // 当前缓存题目相对缓存序号，前端维护，从0开始
        vm.currentQuestionBuffNum = undefined;
        // 当前答案缓存
        vm.currentAnswer = undefined;
        // 题目显示样式
        vm.answerBox = undefined;

        vm.jumpNextPage = jumpNextPage;
        vm.timing = timing;
        // 模态框
        vm.openModal = openModal;
        // vm.submitPage = submitPage;

        var timePromise;

        loadMetaData();

        function loadMetaData() {
            vm.userData = {};
            vm.oppoData = {};
            vm.courseId = $routeParams.courseId;
            vm.roomId = $routeParams.roomId;

            // pkPageDao.getUserData(function (response) {
            // $http.get("json/user-data.json").success(function (response) {
            var tempUserData = JSON.parse(storage.getItem('userData'));
            vm.userData.name = tempUserData.user.name;
            vm.userData.school = tempUserData.user.school;
            vm.userData.grade = tempUserData.user.grade;
            vm.userData.pkRate = tempUserData.user.pkRate;
            vm.userData.avatar = tempUserData.user.avatar;
            switch (vm.courseId) {
                case 'yw':
                    vm.moduleTitle = vm.userData.grade + '语文' + 'PK';
                    break;
                case 'sx':
                    vm.moduleTitle = vm.userData.grade + '数学' + 'PK';
                    break;
                case 'wy':
                    vm.moduleTitle = vm.userData.grade + '英语' + 'PK';
                    break;
            }

            // pkPageDao.getOppoData(function (response) {
            // $http.get("json/user-data.json").success(function (response) {
            var tempOppoData = JSON.parse(storage.getItem('oppoData'));
            vm.oppoData.name = tempOppoData.oppo.name;
            vm.oppoData.school = tempOppoData.oppo.school;
            vm.oppoData.grade = tempOppoData.oppo.grade;
            vm.oppoData.pkRate = tempOppoData.oppo.pkRate;
            vm.oppoData.avatar = tempOppoData.oppo.avatar;

            vm.answerBox = [{'display': 'none'}, {'display': 'none'}, {'display': 'none'}, {'display': 'none'}];
            pkPageDao.getPkInfo(function (response) {
                // $http.get("json/pk-info.json").success(function (response) {
                vm.pkTime = storage.getItem('pkTime') != null ? Number(storage.getItem('pkTime')) : response.time;
                vm.questionCount = response.count;
                requestQuestions();
            });
        }

        function requestQuestions() {
            // 缺省值设置
            vm.questionList = [];
            vm.currentQuestionBuffNum = 0;
            // F5刷新
            vm.currentQuestionBuffNum = storage.getItem('currentQuestionBuffNum') != null ? Number(storage.getItem('currentQuestionBuffNum')) : vm.currentQuestionBuffNum;
            // 请求所有题目
            pkPageDao.getPkQuestions(vm.roomId, function (response) {
                vm.questionList = response.content;
                console.log(vm.questionList);
                refreshCurrentQuestion();
                vm.timing();
            });
        }

        function refreshCurrentQuestion() {
            // 更新题目
            vm.currentQuestion = vm.questionList[vm.currentQuestionBuffNum];
            vm.currentQuestionId = vm.currentQuestion.questionId;
            vm.currentQuestionAbsNum = vm.currentQuestion.relativeId;
            vm.currentQuestionType = vm.currentQuestion.questionType;
            // 边界判断
            if (vm.currentQuestionId === 0) {

            }
            // 题目样式选择
            showAnswerBox();
            switch (vm.currentQuestionType) {
                case 0:
                    vm.currentAnswer = 0;
                    break;
                case 1:
                    vm.currentAnswer = [false, false, false, false, false];
                    break;
                case 2:
                    vm.currentAnswer = '';
                    break;
                case 3:
                    vm.currentAnswer = '';
                    break;
                case 4:
                    vm.currentAnswer = false;
                    break;
                default:
                    break;
            }
            storageQuestionId();
        }

        function showAnswerBox() {
            var num = vm.currentQuestionType;
            for (var item = 0; item < vm.answerBox.length; item++) {
                vm.answerBox[item] = {'display': 'none'};
            }
            vm.answerBox[num] = {'display': 'inline'};
        }

        function timing() {
            $interval.cancel(timePromise);
            timePromise = $interval(function () {
                if (vm.pkTime <= 0) {
                    $interval.cancel(timePromise);
                    // $location.path("/pk-menu");
                } else {
                    vm.pkTime -= 1000;
                    storage.setItem('pkTime', vm.pkTime);
                }
            }, 1000);
        }

        function storageQuestionId() {
            storage.setItem('currentQuestionBuffNum', vm.currentQuestionBuffNum);
        }

        function jumpNextPage(i) {
            vm.currentAnswer = i;
            if (vm.currentQuestionBuffNum < (vm.questionCount - 1)) {
                pkPageDao.sendQuestionAnswer(vm.currentQuestionId, vm.currentAnswer, function (response) {
                    vm.currentQuestionBuffNum += 1;
                    refreshCurrentQuestion();
                });
            } else {
                pkPageDao.sendQuestionAnswer(vm.currentQuestionId, vm.currentAnswer, function (response) {
                    openModal();
                });
            }
            // sendSpecificAnswer(vm.currentQuestionId, vm.currentAnswer);
        }

        // function submitPage() {
        //     pkPageDao.sendQuestionAnswer(vm.currentQuestionId, vm.currentAnswer, function (response) {
        //         openModal();
        //     });
        // }
        
        function openModal() {
            $uibModal.open({
                animation: true,
                templateUrl: 'pk-result.view.html',
                controller: 'pkResultCtrl',
                controllerAs: 'pkresult',
                backdrop: 'static',
                // size: 'sm',
                resolve: {
                    sc: vm
                }
            });
        }
    }

    ykylPkApp.controller('pkResultCtrl', ['PkResultDao', 'PkWaitingSocketDao',
        'sc', '$uibModalInstance', pkResultCtrl]);
    function pkResultCtrl(pkResultDao, pkWaitingSocketDao, sc, $uibModalInstance) {
        var vm = this;

        // 头信息
        vm.headText = undefined;
        // 内容信息显示框
        vm.contentBox = undefined;

        vm.close = close;


        loadMetaData();

        function loadMetaData() {
            vm.headText = '等待中...';
            vm.contentBox = false;
            pkResultDao.sendSubmitMess(function (response) {
                pkWaitingSocketDao.send('交卷');
                pkWaitingSocketDao.getMessage('"sender":"submit"', function (message) {
                    var tempData = JSON.parse(message.data);
                    if (tempData.result === 'success') {
                        vm.headText = 'PK获胜';
                    } else if (tempData.result === 'fail') {
                        vm.headText = 'PK失败';
                    }
                    vm.userInfo = tempData.userinfo;
                    vm.userResult = tempData.userresult;
                    vm.oppoResult = tempData.opporesult;
                    vm.contentBox = true;
                })
            });
        }

        function close() {
            $uibModalInstance.dismiss();
        }

    }

})();
