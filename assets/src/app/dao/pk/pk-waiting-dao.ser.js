/**
 * Created by Yu on 2017/3/6.
 */

(function () {
    "use strict";
    var utils = angular.module('ykylUtils');

    utils.service('PkWaitingDao', ['YkylConnection', function (conn) {
        var vm = this;

        vm.getUserData = getUserData;

        function getUserData(callback) {
            // conn.get("PK/" + "getUserData", {'phone' : 110}, callback);
            conn.get("PK/" + "getCurrentUserPhone", null, callback);
        }

    }]);
})();