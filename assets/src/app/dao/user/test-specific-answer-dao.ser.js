/**
 * Created by yu on 2016/10/28.
 */

(function () {
    "use strict";
    var utils = angular.module('ykylUtils');

    utils.service('TestSpecAnsDao', ['YkylConnection', function (conn) {
        var vm = this;
        var BASE_URL = "test/answer/specific/";

        vm.getAnswer = getAnswer;

        function getAnswer(id, callback) {
            conn.get(BASE_URL + "get-ans", {'id': id}, callback);
        }

    }]);

})();