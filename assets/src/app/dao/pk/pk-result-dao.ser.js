/**
 * Created by Yu on 2017/3/7.
 */

(function () {
    "use strict";
    var utils = angular.module('ykylUtils');

    utils.service('PkResultDao', ['YkylConnection', function (conn) {
        var vm = this;

        vm.sendSubmitMess = sendSubmitMess;

        // http://localhost:8888/api/PK/submitResult?pkRoomId=1
        function sendSubmitMess(callback) {
            conn.get("PK/" + "submitResult", null, callback);
        }

    }]);
})();
