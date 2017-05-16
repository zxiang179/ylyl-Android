/**
 * Created by Lcj on 2016/12/13.
 */
(function () {
    'use strict';
    var utils = angular.module('ykylUtils');
    utils.service('queAnsMainDao',['YkylConnection','$http',queAnsMainDao]);
    function queAnsMainDao(conn,$http) {
        var vm=this;
        var BASE_URL='/queAns';
        vm.getFilterContent=getFilterContent;
        vm.getAllContent=getAllContent;
        vm.getAnsDetailContent=getAnsDetailContent;
        vm.updateSupportNum=updateSupportNum;
        vm.saveComment=saveComment;
        vm.askContentSave=askContentSave;

        //获得过滤后的内容
        function getFilterContent(filterCondition,callback) {
            conn.get(BASE_URL+'',{'filterGrades':filterCondition.filterGrades,'filterSubject':filterCondition.filterSubject},callback);
        }
        //获得所有的内容
        function getAllContent(callback) {
            conn.get(BASE_URL+'', '',callback);
        }

        //获得每个问题对应的评论
        function getAnsDetailContent(id,callback) {
            conn.get(BASE_URL+'', {'id':id},callback);
        }
        //更新问题的点赞数
        function updateSupportNum(num) {
            conn.get(BASE_URL+'', {'num':num},'');
        }

        //提交评论内容
        function saveComment(content) {
            conn.get(BASE_URL+'',{'comment':content},'');
        }
        //保存提出的问题
        function askContentSave(content) {
            conn.get(BASE_URL+'',{'gradeTag':content.gradeTag,'subTag':content.subTag,'question':content.question},'');
        }


    }

})();