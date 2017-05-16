/**
 * Created by Lcj on 2016/12/19.
 */
(function () {
    'use strict';
     var ykylQueAnsCenter=angular.module('ykylQueAnsCenter');
    ykylQueAnsCenter.controller('AnsDetailCtrl',['$http','$window','queAnsMainDao',AnsDetailCtrl]);
    function AnsDetailCtrl($http,$window,queAnsMainDao) {
        var vm=this;
       vm.saveCommentContent=saveCommentContent;
        var storage = $window.sessionStorage;
        vm.queDetailStr=storage.getItem('currentQuestion');
        vm.queDetail=angular.fromJson(vm.queDetailStr);
        vm.commentContent='';
        function saveCommentContent() {
            queAnsMainDao.saveComment(vm.commentContent);
        }
    }
})();