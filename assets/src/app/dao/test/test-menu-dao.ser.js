/**
 * Created by yu on 2016/10/17.
 */

(function () {
    "use strict";
    var utils = angular.module('ykylUtils');

    utils.service('TestMenuDao', ['YkylConnection', function (conn) {
        var vm = this;
        var BASE_URL = "subject/";

        vm.getSubjectList = getSubjectList;
        vm.getSubjectContent = getSubjectContent;


        function getSubjectList(callback) {
            conn.get(BASE_URL + "findAllSubjects",null ,callback);
        }


        function getSubjectContent(sid, callback) {
            conn.get(BASE_URL + "findSubjectInfoById", {'sid': sid}, callback);
        }

    }]);

})();