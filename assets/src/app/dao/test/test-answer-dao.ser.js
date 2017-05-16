/**
 * Created by yu on 2016/10/17.
 */

(function () {
    "use strict";
    var utils = angular.module('ykylUtils');

    utils.service('TestAnswerDao', ['YkylConnection', function (conn) {
        var vm = this;
        var BASE_URL = "answer/";

        vm.postAnswer = postAnswer;
        vm.getAnswerList = getAnswerList;

        function postAnswer(json, callback) {
            conn.get(BASE_URL + "replyFakeJudgement", {'submitResult': json}, callback);
        }

        function getAnswerList(callback) {
            conn.get(BASE_URL + "replyJudgement", null, callback);
        }
    }]);

})();