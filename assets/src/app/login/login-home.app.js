/**
 * Created by Lcj on 2016/10/18.
 */
(function () {
    'use strict';
    var ykylLoginHome = angular.module('ykylLoginHome',['ykylUtils','ngRoute']);

    ykylLoginHome.config(config);
    config.$inject = ['$routeProvider'];
    function  config($routeProvider) {
        $routeProvider
            .when('/', {
                redirectTo: '/user'
            }).when('/user', {
                templateUrl: 'user-login.view.html',
                controller: 'UserLoginCtrl',
                controllerAs: 'userLoginCtrl'
            }).when('/sign', {
                templateUrl: 'user-sign.view.html',
                controller: 'UserSignCtrl',
                controllerAs: 'userSignCtrl'
            }).when('/userInfo', {
                controller: 'UserSignInfoCtrl',
                controllerAs: 'userSignInfoCtrl',
                templateUrl: 'user-sign-info.view.html'
            }).when('/school', {
                controller: 'UserSchoolInfoCtrl',
                controllerAs: 'userSchoolInfoCtrl',
                templateUrl: 'user-info-school.view.html'
            }).when('/selfInfo', {
                templateUrl: '../../../app/self_info/selfInfo-home.view.html',
                controller: 'SelfInfoCtrl',
                controllerAs: 'selfInfoCtrl'

            }).when('/index',{
                templateUrl:'index.html'
            });
    }

})();