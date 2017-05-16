/**
 * Created by yu on 2016/10/18.
 */

(function () {
    'use strict';
    var ykylTestApp = angular.module('ykylTestApp', [
        'ykylUtils', 'ngRoute', 'ng-echarts', 'angular-loading-bar', 'ngAnimate'
    ]);

    ykylTestApp.config(config);
    config.$inject = ['$routeProvider', '$rootScopeProvider'];
    function config($routeProvider) {
        $routeProvider.when('/', {
            redirectTo: '/test-menu'
        }).when('/test-menu', {
            templateUrl: 'test-menu.view.html',
            controller: 'testMenuCtrl',
            controllerAs: 'testmenu'
        }).when('/test-page', {
            templateUrl: 'test-page.view.html',
            controller: 'testPageCtrl',
            controllerAs: 'testpage'
        }).when('/test-answer', {
            templateUrl: 'test-answer.view.html',
            controller: 'testAnswerCtrl',
            controllerAs: 'testanswer'
        }).when('/test-specific-answer/:id', {
            templateUrl: 'test-specific-answer.view.html',
            controller: 'testSpecAnsCtrl',
            controllerAs: 'testspecans'
        });
    }

    ykylTestApp.run(['$rootScope', '$route', '$window',
        function ($rootScope, $route, $window) {
            $rootScope.$on('$routeChangeSuccess',
                function (event, toState, toParams, fromState, fromParams) {

                // 对 test-page.view.html 的缓存监视
                if (toParams != undefined) {
                    if ($route.current.loadedTemplateUrl === 'test-page.view.html') {
                        $window.sessionStorage.removeItem("currentQuestionId");
                        $window.sessionStorage.removeItem("resAnswer");
                        $window.sessionStorage.removeItem("testTime");
                        $window.sessionStorage.removeItem("sendFlag");
                        $window.sessionStorage.removeItem("firstQuestionId");
                        $window.sessionStorage.removeItem("lastQuestionId");
                    }
                }

            });
    }]);

})();