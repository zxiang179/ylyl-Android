/**
 * Created by Yu on 2017/3/7.
 */

(function () {
    "use strict";
    var utils = angular.module('ykylUtils');

    utils.service('PkPageDao', ['YkylConnection', function (conn) {
        var vm = this;

        vm.getPkInfo = getPkInfo;
        vm.getPkQuestions = getPkQuestions;
        // vm.getOppoData = getOppoData;
        // vm.getUserData = getUserData;
        vm.sendQuestionAnswer = sendQuestionAnswer;

        function getPkInfo(callback) {
            conn.get("PK/" + "PKData", null, callback);
        }

        // function getUserData(callback) {
        //     conn.get("PK/" + "getUserData", {'phone' : 110}, callback);
        //     // conn.get("PK/" + "getUserData", {'phone' : 120}, callback);
        // }

        function getPkQuestions(rid, callback) {
            conn.get("PK/" + "PKQuestions", {'pkRoomId': rid}, callback);
        }

        // http://192.168.1.132:8888/api/answer/savePKUserReplyAnswer?answer=""&qid=""
        function sendQuestionAnswer(qid, ans, callback) {
            conn.get("answer/" + "recordPKJudgement", {'qid': qid, 'answer': ans}, callback);
        }
    }]);
})();
