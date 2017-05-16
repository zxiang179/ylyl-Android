/**
 * Created by Lcj on 2016/11/7.
 */
(function () {
    'use strict';
    var  ykylSelfInfo=angular.module('ykylSelfInfo',['ykylUtils','ngRoute','ykylLoginHome']);
    ykylSelfInfo.config(config);
    config.$inject = ['$routeProvider'];
    function  config($routeProvider) {
        $routeProvider
            .when('/', {
                redirectTo: '/selfInfo'
            }).when('/selfInfo', {
            templateUrl: 'selfInfo.view.html',
            controller: 'SelfInfoCtrl',
            controllerAs: 'selfInfoCtrl'
        }).when('/infoNameEdit', {
            templateUrl: 'infoNameEdit.view.html',
            controller: 'InfoNameCtrl',
            controllerAs: 'infoNameCtrl'
        }).when('/infoGradeEdit', {
            templateUrl: 'infoGradeEdit.view.html',
            controller: 'InfoGradeCtrl',
            controllerAs: 'infoGradeCtrl'
        }).when('/infoGenderEdit', {
            templateUrl: 'infoGenderEdit.view.html',
            controller: 'InfoGenderCtrl',
            controllerAs: 'infoGenderCtrl'
        }).when('/school', {
            controller: 'UserSchoolInfoCtrl',
            controllerAs: 'userSchoolInfoCtrl',
            templateUrl: '../login/user-info-school.view.html'
        }).when('/infoPassEdit', {
            controller: 'InfoPasswordCtrl',
            controllerAs: 'infoPasswordCtrl',
            templateUrl: 'infoPassEdit.view.html'
        });
    }


})();