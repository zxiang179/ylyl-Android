/**
 * Created by Lcj on 2016/12/11.
 */
(function () {
    'use strict';
    var ykylQueAnsCenter=angular.module('ykylQueAnsCenter');
    ykylQueAnsCenter.controller('QueAnsCtrl',['$http','queAnsMainDao','$window',QueAnsCtrl]);
    function QueAnsCtrl($http,queAnsMainDao,$window) {
       var vm=this;
        vm.selectedGrade=selectedGrade;
        vm.selectedSubject=selectedSubject;
        vm.getQueFilterContent=getQueFilterContent;
        vm.getQueAllContent=getQueAllContent;
        //vm.storageQue=storageQue;
        vm.saveQueContent=saveQueContent;
        vm.saveAskContent=saveAskContent;
        vm.isFilterShow=false;
        vm.isAskShow=false;
        vm.isAsk=true;
        var storage = $window.sessionStorage;
        getQueAllContent();

        vm.grades = [{id: 0, gradeName: '一年级'}, {id: 1, gradeName: '二年级'},
            {id: 2, gradeName: '三年级'}, {id: 3, gradeName: '四年级'},
            {id: 4, gradeName: '五年级'}, {id: 5, gradeName: '预备班'},
            {id: 6, gradeName: '初一'}, {id: 7, gradeName: '初二'},
            {id: 8, gradeName: '初三'}, {id: 9, gradeName: '高一'},
            {id: 10, gradeName: '高二'}, {id: 11, gradeName: '高三'}
        ];
        vm.subjectList=[{id:0,subjectContent:['数学','语文','英语']},{id:1,subjectContent:['数学','语文','英语','物理','化学','生物','历史','政治','地理']}];
        vm.gradeSelected=vm.grades[0];
        vm.subSelected=vm.subjectList[0].subjectContent[0];
        vm.subShow=0;

        function selectedGrade(id) {
            vm.gradeSelected=vm.grades[id];
            if(id<=4){
                vm.subShow=0;
            }else if(id>4){
                vm.subShow=1;
            }
        }

        function selectedSubject(subContent) {
            vm.subSelected=subContent;
        }

        function getQueFilterContent() {
            vm.filterCondition={
                filterGrades:vm.gradeSelected.gradeName,
                filterSubject:vm.subSelected
            };
            vm.isFilterShow=false;
           /* queAnsMainDao.getFilterContent(vm.filterCondition,function (response) {
                vm.filterContent=response;
            });*/
            
        }

        //加载页面，获得所有问题内容
        function getQueAllContent() {
           /* queAnsMainDao.getAllContent(function (response) {
                vm.allContent=response;
            });*/

            $http.get('../json/question.json').success(function (response) {
                vm.allQueContent=response;
            });
        }

      /*  function storageQue() {
            storage.setItem('currentQuestion', vm.currentQuestionId);
        }*/

      //将点击后的问题详情保存至sessionstorage;
        function saveQueContent(data) {
            //queAnsMainDao.queContentSet(data);
           var str =angular.toJson(data);
            storage.setItem('currentQuestion', str);

        }

        //保存提问内容
        function saveAskContent() {
            vm.askContent.gradeTag= vm.gradeSelected.gradeName;
            queAnsMainDao.askContentSave(vm.askContent);
        }

    }

})();