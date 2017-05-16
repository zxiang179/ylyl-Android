/**
 * Created by yu on 2016/10/17.
 */

(function () {
    "use strict";
    var utils = angular.module('ykylUtils');

    utils.service('TestPageDao', ['YkylConnection', function (conn) {
        var vm = this;
        var BASE_URL = "test/page/";

        vm.getTestInfo = getTestInfo;
        vm.getQuestionList = getQuestionList;
        vm.postAnswerList = postAnswerList;

        function getTestInfo(id, callback) {
            conn.get(BASE_URL + "get-info", {'name': id}, callback);
        }

        function getQuestionList(callback) {
            conn.get(BASE_URL + "get-ques", callback);
        }

        function postAnswerList(json, callback) {
            conn.post(BASE_URL + "post-ans", {'json': json}, callback);
        }

    }]);

})();