/**
 * Created by yu on 2016/12/3.
 */


(function () {
    "use strict";
    var utils = angular.module('ykylUtils');

    utils.service('PkMenuDao', ['YkylConnection', function (conn) {
        var vm = this;

        vm.getSubjectList = getSubjectList;

        function getSubjectList(callback) {
            conn.get("subject/" + "findAllSubjects", null, callback);
        }

    }]);

})();