/**
 * Created by Lcj on 2016/12/10.
 */
(function () {
    'use strict';
    var  ykylQueAnsCenter=angular.module('ykylQueAnsCenter',['ykylUtils','ngRoute']);
    ykylQueAnsCenter.config(config);
    config.$inject = ['$routeProvider'];
    function  config($routeProvider) {
        $routeProvider
            .when('/',{
                redirectTo:'/queAnsMain'
                }).when('/queAnsMain',{
                    templateUrl:'queAnsMain.view.html',
                    controller:'QueAnsCtrl',
                    controllerAs:'queAnsCtrl'
                }).when('/queAnsDetail',{
                    templateUrl:'queAnsDetail.view.html',
                    controller:'QueAnsDetailCtrl',
                    controllerAs:'queAnsDetailCtrl'
                }).when('/ansDetail',{
                    templateUrl:'AnswerDetail.view.html',
                    controller:'AnsDetailCtrl',
                    controllerAs:'ansDetailCtrl'
        });

    }
})();