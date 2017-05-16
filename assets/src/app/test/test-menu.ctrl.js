/**
 * Created by yu on 2016/10/18.
 */

(function () {
    'use strict';

    var ykylTestApp = angular.module('ykylTestApp');

    ykylTestApp.controller('testMenuCtrl', ['TestMenuDao', 'TestPageDao', '$location', testMenuCtrl]);

    function testMenuCtrl(testMenuDao, testPageDao, $location) {
        var vm = this;

        vm.moduleTitle = undefined;
        vm.maxSubjectListSize = undefined;
        vm.subjectList = undefined;
        vm.subjectTitle = undefined;
        vm.subjectContent = undefined;
        // 当前科目id
        vm.subjectId = undefined;

        vm.getSubjectContent = getSubjectContent;
        vm.jumpTestPage = jumpTestPage;
        vm.jumpResetedTestPage = jumpResetedTestPage;

        loadMetaData();

        function loadMetaData() {
            vm.moduleTitle = '练 习';
            vm.subjectContent = '';
            testMenuDao.getSubjectList(function (response) {
                vm.subjectList = response;
                vm.subjectId = vm.subjectList[0].id;
                getSubjectContent(vm.subjectId);
            });
        }

        function getSubjectContent(id) {
            vm.subjectId = id;
            testMenuDao.getSubjectContent(id, function (response) {
                vm.subjectTitle = response.sbTitle;
                vm.subjectContent = response.content;
            });
        }

        function jumpTestPage(id, flag) {
            $location.path("/test-page").search({id: id, type: flag});
        }

        function jumpResetedTestPage(id) {
            testPageDao.resetOneTest(id, function (response) {
            });
        }
    }

})();


