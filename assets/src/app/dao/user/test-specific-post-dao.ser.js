/**
 * Created by yu on 2016/10/28.
 */

(function () {
    "use strict";
    var utils = angular.module('ykylUtils');

    utils.service('TestSpecPostDao', ['YkylConnection', function (conn) {
        var vm = this;
        var BASE_URL = "test/answer/specific/";

        vm.postQuestion = postQuestion;

        function postQuestion(json, callback) {
            conn.get(BASE_URL + "get-ans", {'json': json}, callback);
        }
    }]);

})();