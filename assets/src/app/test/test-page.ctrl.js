/**
 * Created by yu on 2016/10/20.
 */

(function () {
    'use strict';

    var ykylTestApp = angular.module('ykylTestApp');

    // ykylTestApp.service('testAnswerService', [testAnswerService]);
    // function testAnswerService() {
    //     var vm = this;
    //
    //     vm.testTitle = undefined;
    //     vm.completeQuestionCount = undefined;
    //     vm.usedTime = undefined;
    //     vm.testDifficult = undefined;
    //     vm.countCorrect = undefined;
    //     vm.countWrong = undefined;
    //     vm.countUndo = undefined;
    //     vm.testResult = undefined;
    //
    //     vm.getTestTitle = function () {
    //         return vm.testTitle;
    //     };
    //     vm.setTestTitle = function (text) {
    //         vm.testTitle = text;
    //     };
    //     vm.getCompleteQuestionCount = function () {
    //         return vm.completeQuestionCount;
    //     };
    //     vm.setCompleteQuestionCount = function (count) {
    //         vm.completeQuestionCount = count;
    //     };
    //     vm.getUsedTime = function () {
    //         return vm.usedTime;
    //     };
    //     vm.setUsedTime = function (time) {
    //         vm.usedTime = time;
    //     };
    //     vm.getTestDifficult = function () {
    //         return vm.testDifficult;
    //     };
    //     vm.setTestDifficult = function (text) {
    //         vm.testDifficult = text;
    //     };
    //     vm.getCountCorrect = function () {
    //         return vm.countCorrect;
    //     };
    //     vm.setCountCorrect = function (count) {
    //         vm.countCorrect = count;
    //     };
    //     vm.getCountWrong = function () {
    //         return vm.countWrong;
    //     };
    //     vm.setCountWrong = function (count) {
    //         vm.countWrong = count;
    //     };
    //     vm.getCountUndo = function () {
    //         return vm.countUndo;
    //     };
    //     vm.setCountUndo = function (count) {
    //         vm.countUndo = count;
    //     };
    //     vm.getTestResult = function () {
    //         return vm.testResult;
    //     };
    //     vm.setTestResult = function (text) {
    //         vm.testResult = text;
    //     };
    // }


    ykylTestApp.controller('testPageCtrl', ['TestPageDao', 'TestAnswerDao', '$window', '$routeParams', '$location', '$timeout', '$interval', testPageCtrl]);
    function testPageCtrl(testPageDao, testAnswerDao, $window, $routeParams, $location, $timeout, $interval) {
        var vm = this;
        var storage = $window.sessionStorage;

        var bufferSize = 100;
        // var requestSize = 3;

        // 第一次请求flag
        vm.sendFlag = undefined;
        // 向后端请求参数
        vm.requestParams = undefined;
        // 课程名
        vm.testTitle = undefined;
        // 总题数
        vm.questionCount = undefined;
        // 测试计时
        vm.testTime = undefined;
        // 缓存题目数
        vm.questionListCount = undefined;
        // 题目上界
        vm.firstQuestionId = undefined;
        // 题目下界
        vm.lastQuestionId = undefined;
        // 题目缓存
        vm.questionList = undefined;
        // 当前题目样式
        vm.currentQuestionType = undefined;
        // 当前题目缓存
        vm.currentQuestion = undefined;
        // 当前缓存题目绝对序号，从后端获取，与后端交互以及前端的主键
        vm.currentQuestionId = undefined;
        // 当前缓存题目相对科目序号，从后端获取，用于显示
        vm.currentQuestionAbsNum = undefined;
        // 当前缓存题目相对缓存序号，前端维护，从0开始
        vm.currentQuestionBuffNum = undefined;
        // 题目答案缓存
        vm.resAnswer = undefined;
        // 当前答案脏值
        vm.currentAnswerDirty = undefined;
        // 当前答案缓存
        vm.currentAnswer = undefined;
        // 向前翻样式
        vm.previousBox = undefined;
        // 向后翻样式
        vm.laterBox = undefined;
        // 题目显示样式
        vm.answerBox = undefined;


        vm.showAnswerBox = showAnswerBox;
        vm.getPrevious = getPrevious;
        vm.getLater = getLater;
        vm.jumpNextPage = jumpNextPage;
        vm.submitTest = submitTest;
        vm.timing = timing;

        var timePromise;
        var timeDelay;

        loadMetaData();


        /**
         * 第一次打开页面或刷新时加载
         */
        function loadMetaData() {
            vm.requestParams = $routeParams;
            vm.sendFlag = storage.getItem('sendFlag');
            if (vm.sendFlag === null) {
                vm.sendFlag = 1;
                storage.setItem('sendFlag', vm.sendFlag);
            }
            vm.answerBox = [{'display': 'none'}, {'display': 'none'}, {'display': 'none'}, {'display': 'none'}, {'display': 'none'}];
            testPageDao.getTestInfo(vm.requestParams.id, vm.requestParams.type, function (response) {
                vm.testTitle = response.name;
                vm.questionCount = response.count;
                vm.testTime = 0;
                vm.currentQuestionId = response.latestId;
                requestFirstQuestion();
            });
        }

        /**
         * 维护questionList以及当前题目：
         * 1.清空缓存questionList，currentQuestionBuffNum设为0
         * 2.尝试从storage中获取当前题目绝对序号currentQuestionId(需要发送给后端的序号，用于存储)
         * 3.尝试从storage中获取当前做题已用时长testTime
         * 4.尝试从storage中获取并解析当前做题已填答案
         * 5.向后端发送从currentQuestionId开始的forward请求
         * 6.从后端获取题目，拼接到questionList，
         * 7.更新缓存数量questionListCount
         * 8.从questionList中获取三元组，更新当前题目
         */
        function requestFirstQuestion() {
            // 缺省值设置
            vm.questionList = [];
            vm.questionListCount = 0;
            vm.currentQuestionBuffNum = 0;
            vm.sendFlag = 0;
            // 对付F5刷新情况
            vm.currentQuestionId = storage.getItem('currentQuestionId') != null ? Number(storage.getItem('currentQuestionId')) : vm.currentQuestionId;
            vm.testTime = storage.getItem('testTime') != null ? Number(storage.getItem('testTime')) : 0;
            vm.resAnswer = storage.getItem('resAnswer') != null ? JSON.parse(storage.getItem('resAnswer')) : {};
            // 开始请求
            testPageDao.getQuestionListForward(vm.sendFlag, vm.currentQuestionId - 1, vm.requestParams.type, function (response) {
                vm.questionList = vm.questionList.concat(response.content);
                vm.questionListCount += response.count;
                storage.setItem('sendFlag', vm.sendFlag);
                if (vm.questionListCount > 0) {
                    if (storage.getItem('firstQuestionId') != null) {
                        vm.firstQuestionId = Number(storage.getItem('firstQuestionId'));
                    } else {
                        vm.firstQuestionId = vm.questionList[0].questionId;
                        storage.setItem('firstQuestionId', vm.firstQuestionId);
                    }
                    if (storage.getItem('lastQuestionId') != null) {
                        vm.lastQuestionId = Number(storage.getItem('lastQuestionId'));
                    } else {
                        // vm.lastQuestionId = vm.firstQuestionId + vm.questionListCount - 1;
                        vm.lastQuestionId = vm.questionCount;
                        console.log(vm.lastQuestionId);
                        storage.setItem('lastQuestionId', vm.lastQuestionId);
                    }
                }
                refreshCurrentQuestion();
                vm.timing();
            });
        }

        function storageQuestionId() {
            storage.setItem('currentQuestionId', vm.currentQuestionId);
        }

        function storageAnswer() {
            // 对多选题要扁平化后存储
            if (vm.currentQuestionType === 1) {
                vm.resAnswer[vm.currentQuestionId] = boolEncode(vm.currentAnswer);
            } else {
                vm.resAnswer[vm.currentQuestionId] = vm.currentAnswer;
            }
            storage.setItem('resAnswer', JSON.stringify(vm.resAnswer));
        }

        /**
         * 已知questionList，currentQuestionBuffNum
         * 判断是否到达边界
         * 根据currentQuestionBuffNum从questionList更新当前题目信息三元组：
         * 1.更新currentQuestion
         * 三元组：
         *      2.更新currentQuestionId
         *      3.更新currentQuestionAbsNum
         *      4.更新currentQuestionType
         * 5.更新当前AnswerBox
         * 6.更新currentAnswer，为空则初始化
         */
        function refreshCurrentQuestion() {
            // 缓存列表为空，则退出
            if (vm.questionListCount === 0) {
                return;
            }
            // 缓存列表不为空时更新题目
            vm.currentQuestion = vm.questionList[vm.currentQuestionBuffNum];
            vm.currentQuestionId = vm.currentQuestion.questionId;
            vm.currentQuestionAbsNum = vm.currentQuestion.relativeId;
            vm.currentQuestionType = vm.currentQuestion.questionType;
            // 边界判断
            if (vm.currentQuestionId === vm.firstQuestionId) {
                vm.previousBox = true;
            } else if (vm.currentQuestionId === vm.lastQuestionId) {
                vm.laterBox = true;
            } else {
                vm.previousBox = false;
                vm.laterBox = false;
            }
            // 题目样式选择
            showAnswerBox();
            vm.currentAnswer = vm.resAnswer[vm.currentQuestionId];
            if (vm.currentAnswer === undefined) {
                vm.currentAnswerDirty = false;
                switch (vm.currentQuestionType) {
                    case 0:
                        vm.currentAnswer= 0;
                        break;
                    case 1:
                        vm.currentAnswer= [false, false, false, false, false];
                        break;
                    case 2:
                        vm.currentAnswer= '';
                        break;
                    case 3:
                        vm.currentAnswer= '';
                        break;
                    case 4:
                        vm.currentAnswer= false;
                        break;
                    default:
                        break;
                }
            } else if (vm.currentQuestionType === 1) {
                vm.currentAnswerDirty = true;
                vm.currentAnswer = boolDecode(vm.currentAnswer);
            }
            storageQuestionId();
        }

        function showAnswerBox() {
            var num = vm.currentQuestionType;
            for (var item= 0; item < vm.answerBox.length; item++) {
                vm.answerBox[item] = {'display': 'none'};
            }
            vm.answerBox[num] = {'display': 'inline'};
        }

        function getPrevious() {
            storageAnswer();
            if (vm.currentQuestionBuffNum === 0) {
                testPageDao.getQuestionListBackward(vm.sendFlag, vm.questionList[0].questionId, vm.requestParams.type, function (response) {
                    if (response.content.length != 0) {
                        // 若该题目不在缓存中，拼接缓存，更新缓存数
                        if (response.content[response.count - 1].questionId < vm.questionList[0].questionId) {
                            vm.questionList = response.content.concat(vm.questionList);
                            vm.questionListCount += response.count;
                            // 向前添加，vm.currentQuestionBuffNum 加 response.count
                            vm.currentQuestionBuffNum += response.count;
                            // 超出缓存时，从后面开始清缓存
                            while (vm.questionListCount > bufferSize) {
                                vm.questionList.pop();
                                vm.questionListCount--;
                            }
                        }
                    }
                    // 同步判断并更新当前题目
                    if (vm.currentQuestionBuffNum > 0) {
                        vm.currentQuestionBuffNum -= 1;
                        refreshCurrentQuestion();
                    }
                });
            } else {
                // 异步判断并更新当前题目
                vm.currentQuestionBuffNum -= 1;
                refreshCurrentQuestion();
            }
        }

        function getLater() {
            storageAnswer();
            if (vm.currentQuestionBuffNum > (vm.questionListCount - 1) * 0.8) {
                testPageDao.getQuestionListForward(vm.sendFlag, vm.questionList[vm.questionListCount - 1].questionId, vm.requestParams.type, function (response) {
                    if (response.content.length != 0) {
                        // 若该题目不在缓存中，拼接缓存，更新缓存数
                        if (response.content[0].questionId > vm.questionList[vm.questionListCount - 1].questionId) {
                            vm.questionList = vm.questionList.concat(response.content);
                            vm.questionListCount += response.count;
                            // 向后添加，vm.currentQuestionBuffNum 不变
                            // 超出缓存时，从前面开始清缓存
                            while (vm.questionListCount > bufferSize) {
                                vm.questionList.shift();
                                vm.questionListCount--;
                                vm.currentQuestionBuffNum--;
                            }
                        }
                    }
                });
            }
            // 异步判断并更新当前题目
            if (vm.currentQuestionBuffNum < (vm.questionListCount - 1)) {
                vm.currentQuestionBuffNum += 1;
                refreshCurrentQuestion();
            }
        }

        function jumpNextPage(i) {
            if (vm.currentQuestionId < vm.lastQuestionId) {
                vm.currentAnswerDirty = true;
                vm.currentAnswer = i;
                timeDelay = $timeout(function () {}, 500)
                    .then(function () {
                    getLater();
                });
                $timeout.cancel(timeDelay);
            }
        }
        

        /**
         * 1.停止计时
         * 2.存储当前答案
         * 3.整理、发送答案
         * 4.清理storage
         * 5.跳转页面
         */
        function submitTest() {
            if (angular.isDefined(stop)) {
                $interval.cancel(timePromise);
                timePromise = undefined;
            }
            if (vm.currentAnswerDirty) {
                storageAnswer();
            }
            var tmessage = {
                currentQuestionId: storage.getItem("currentQuestionId"),
                resAnswer: storage.getItem("resAnswer") != null ? stringRemoveQuotes(storage.getItem("resAnswer")) : '',
                testTime: storage.getItem("testTime")
            };
            testAnswerDao.postAnswer('[' + JSON.stringify(tmessage) + ']', function (response) {
                // testAnswerService.setTestTitle(response.kpName);
                // testAnswerService.setCompleteQuestionCount(response.size);
                // testAnswerService.setUsedTime(response.time);
                // testAnswerService.setTestDifficult(response.difficulty);
                // testAnswerService.setCountCorrect(response.countCorrect);
                // testAnswerService.setCountWrong(response.countWrong);
                // testAnswerService.setCountUndo(response.countUndo);
                // testAnswerService.setTestResult(response.content);

                storage.removeItem("currentQuestionId");
                storage.removeItem("resAnswer");
                storage.removeItem("testTime");
                storage.removeItem("sendFlag");
                storage.removeItem("firstQuestionId");
                storage.removeItem("lastQuestionId");

                $location.path("/test-answer/");
            });
        }


        function timing() {
            // Don't start a new fight if we are already fighting
            if (angular.isDefined(timePromise)) return;

            timePromise = $interval(function() {
                vm.testTime += 1000;
                storage.setItem('testTime', vm.testTime);
            }, 1000);
        }

        function boolEncode(arr) {
            var str = '';
            for (var item in arr) {
                if (arr[item] === true) {
                    str += '1';
                } else if (arr[item]  === false) {
                    str += '0';
                }
            }
            return str;
        }

        function boolDecode(str) {
            var arr = [];
            for (var item in str) {
                if (str[item] === '1') {
                    arr.push(true);
                } else if (str[item] === '0') {
                    arr.push(false);
                }
            }
            return arr;
        }

        function stringRemoveQuotes(str) {
            str = str.replace(/\"/g, '');
            str = str.replace(/\'/g, '');
            return str;
        }
    }
})();