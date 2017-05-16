/**
 * Created by yu on 2016/10/18.
 */

(function () {
    'use strict';
    var ykylTmApp = angular.module('ykylTmApp', [
        'ykylUtils', 'ngRoute', 'isteven-multi-select', 'ui.bootstrap'
    ]);
    ykylTmApp.config(config);
    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider.when('/', {
            redirectTo: '/tm-ques-manage'
        }).when('/tm-ques-manage', {
            templateUrl: 'tm-question-manage.view.html',
            controller: 'tmQuesManageCtrl',
            controllerAs: 'tmquesman'
        }).when('/tm-ques-submit', {
            templateUrl: 'tm-question-submit.view.html',
            controller: 'tmQuesSubmitCtrl',
            controllerAs: 'tmquesubmit'
        }).when('/tm-tag-submit', {
            templateUrl: 'tm-tag-submit.view.html',
            controller: 'tmTagSubmitCtrl',
            controllerAs: 'tmtagsubmit'
        });
    }
    ykylTmApp.run(['$route', angular.noop]);

})();

