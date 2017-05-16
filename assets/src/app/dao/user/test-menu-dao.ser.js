/**
 * Created by yu on 2016/10/17.
 */

(function () {
    "use strict";
    var utils = angular.module('ykylUtils');

    utils.service('TestMenuDao', ['YkylConnection', function (conn) {
        var vm = this;
        var BASE_URL = "test/menu/";

        vm.getSubjectList = getSubjectList;
        vm.getSubjectContent = getSubjectContent;


        function getSubjectList(callback) {
            conn.get(BASE_URL + "get-list", {}, callback);
        }

        function getSubjectContent(subject, callback) {
            conn.get(BASE_URL + "get-content", {'name': subject}, callback);
        }

    }]);

})();