/**
 * Created by yu on 2016/10/17.
 */

(function () {
    "use strict";
    var utils = angular.module('ykylUtils');

    utils.service('TestAnswerDao', ['YkylConnection', function (conn) {
        var vm = this;
        var BASE_URL = "test/answer/";

        vm.getAnswerList = getAnswerList;

        function getAnswerList(callback) {
            conn.get(BASE_URL + "get-ans", callback);
        }

    }]);

})();