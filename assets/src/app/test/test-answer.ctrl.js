/**
 * Created by yu on 2016/10/20.
 */

(function () {
    'use strict';

    var ykylTestApp = angular.module('ykylTestApp');

    ykylTestApp.controller('testAnswerCtrl', ['TestAnswerDao', '$location', testAnswerCtrl]);
    function testAnswerCtrl(testAnswerDao, $location) {
        var vm = this;

        // 课程名
        vm.testTitle = undefined;
        // 阅卷题数
        vm.completeQuestionCount = undefined;
        // 耗时
        vm.usedTime = undefined;
        // 难易度
        vm.testDifficult = undefined;
        // 阅卷结果缓存
        vm.testResult = undefined;
        // 答对数
        vm.countCorrect = undefined;
        // 答错数
        vm.countWrong = undefined;
        // 未答数
        vm.countUndo = undefined;
        // 饼状图选项
        vm.chartOptions = undefined;

        vm.showStyle = showStyle;
        vm.jumpAnswer = jumpAnswer;

        loadMetaData();

        function loadMetaData() {
            // if (testAnswerService.getTestTitle != undefined) {
            //     vm.testTitle = testAnswerService.getTestTitle();
            //     vm.completeQuestionCount = testAnswerService.getCompleteQuestionCount();
            //     vm.usedTime = testAnswerService.getUsedTime();
            //     vm.testDifficult = testAnswerService.getTestDifficult();
            //     vm.countCorrect = testAnswerService.getCountCorrect();
            //     vm.countWrong = testAnswerService.getCountWrong();
            //     vm.countUndo = testAnswerService.getCountUndo();
            //     vm.testResult = testAnswerService.getTestResult();
            //     // drawPieChart
            //     drawPieChart();
            // } else {
            //     testAnswerDao.getAnswerListAgain(function (response) {
            //         vm.testTitle = response.kpName;
            //         vm.completeQuestionCount = response.size;
            //         vm.usedTime = response.time;
            //         vm.testDifficult = response.difficulty;
            //         vm.countCorrect = response.countCorrect;
            //         vm.countWrong = response.countWrong;
            //         vm.countUndo = response.countUndo;
            //         vm.testResult = response.content;
            //         // drawPieChart
            //         drawPieChart();
            //     });
            // }
            testAnswerDao.getAnswerList(function (response) {
                vm.testTitle = response.kpName;
                vm.completeQuestionCount = response.size;
                vm.usedTime = response.time;
                vm.testDifficult = response.difficulty;
                vm.countCorrect = response.countCorrect;
                vm.countWrong = response.countWrong;
                vm.countUndo = response.countUndo;
                vm.testResult = response.content;
                vm.percentage = (vm.countCorrect / (vm.countCorrect + vm.countUndo + vm.countWrong) * 100) .toFixed(2);
                // drawPieChart
                drawPieChart();
            });
        }

        function drawPieChart() {
            vm.lineConfig = {
                theme:'default',
                dataLoaded:true
            };
            vm.chartOptions = {
                title : {
                    // text: '成绩单',
                    x:'center'
                },

                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                series : [
                    {
                        name: '百分比',
                        type: 'pie',
                        radius: ['0%', '50%'],
                        center: ['50%', '50%'],
                        data:[
                            {value:vm.countCorrect, name:'正确数'},
                            {value:vm.countWrong, name:'判错数'},
                            {value:vm.countUndo, name:'未做数'}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
        }
        
        function showStyle(condition) {
            if (condition === 1) {
                return {'background':'#73f778'};
            } else if (condition === 2) {
                return {'background':'#e2718e'};
            } else if (condition === 0) {
                return {'background':'#ddd'};
            }
        }

        function jumpAnswer(id) {
            $location.path("/test-specific-answer/" + id);
        }
    }
})();