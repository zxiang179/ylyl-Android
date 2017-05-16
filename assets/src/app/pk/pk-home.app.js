/**
 * Created by yu on 2016/12/3.
 */

(function () {
    'use strict';
    var ykylPkApp = angular.module('ykylPkApp', [
        'ykylUtils', 'ngRoute', 'angular-loading-bar', 'ngAnimate', 'lazyload', 'ngWebSocket', 'ui.bootstrap'
    ]);

    ykylPkApp.config(config);
    config.$inject = ['$routeProvider', '$rootScopeProvider'];
    function config($routeProvider) {
        $routeProvider.when('/', {
            redirectTo: '/pk-menu'
        }).when('/pk-menu', {
            templateUrl: 'pk-menu.view.html',
            controller: 'pkMenuCtrl',
            controllerAs: 'pkmenu'
        }).when('/pk-waiting/:id', {
            templateUrl: 'pk-waiting.view.html',
            controller: 'pkWaitingCtrl',
            controllerAs: 'pkwaiting'
        }).when('/pk-page/:courseId/:roomId', {
            templateUrl: 'pk-page.view.html',
            controller: 'pkPageCtrl',
            controllerAs: 'pkpage'
        });
    }

    ykylPkApp.run(['$rootScope', '$route', '$window',
        function ($rootScope, $route, $window) {
            $rootScope.$on('$routeChangeSuccess',
                function (event, toState, toParams, fromState, fromParams) {

                // 对 pk-page.view.html 的缓存监视
                if (toParams != undefined) {
                    if ($route.current.loadedTemplateUrl === 'pk-page.view.html') {
                        $window.sessionStorage.removeItem("currentQuestionBuffNum");
                        $window.sessionStorage.removeItem("pkTime");
                    }
                }
            });
    }]);

})();