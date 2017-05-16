/**
 * Created by yu on 2016/10/17.
 */

(function () {
    "use strict";
    var utils = angular.module('ykylUtils');

    utils.service('TestPageDao', ['YkylConnection', function (conn) {
        var vm = this;
        // var BASE_URL = "knowledgePoint/";

        vm.getTestInfo = getTestInfo;
        vm.resetOneTest = resetOneTest;
        vm.getQuestionListForward = getQuestionListForward;
        vm.getQuestionListBackward = getQuestionListBackward;

        function getTestInfo(id, type, callback) {
            conn.get("knowledgePoint/" + "findOneKnowledgePoint", {'id': id, 'type': type}, callback);
        }

        function resetOneTest(kid, callback) {
            conn.get("knowledgePoint/" + "resetOneHist", {'kid': kid}, callback);
        }

        function getQuestionListForward(flag, qid, type, callback) {
            conn.get("question/" + "findForwardQuestions", {'firstFlag':flag, 'qid': qid, 'type': type}, callback);
        }

        function getQuestionListBackward(flag, qid, type, callback) {
            conn.get("question/" + "findBackwardQuestions", {'firstFlag':flag, 'qid': qid, 'type': type}, callback);
        }

    }]);

})();