/**
 * @author xiafan
 */

(function () {
    'use strict';
    /* 以下代码在加载当前js文件后执行，这样可以获得当前js代码的位置 */
    var scripts = document.getElementsByTagName("script");
    scripts = scripts[scripts.length - 1].src;
    var rootPath = scripts.substring(0, scripts.lastIndexOf('/'));
    rootPath = rootPath.substring(0, rootPath.lastIndexOf('/'));

    // var utils = angular.module('ykylUtils', ['ngCookies', 'ngStorage']);
    var utils = angular.module('ykylUtils', []);

    utils.constant("ROOT_PATH", rootPath);
    // utils.constant("SERVICE_API_ROOT", "http://192.168.1.130:8888/api/");
    utils.constant("SERVICE_API_ROOT", "http://192.168.1.132:8888/api/");
    // utils.constant("SERVICE_API_ROOT", "http://192.168.1.100:8888/api/");
    utils.constant("WEBSOCKET_API_ROOT", "ws://192.168.1.132:8888/webSocketServer");
    // utils.constant("WEBSOCKET_API_ROOT", "ws://192.168.1.100:8888/websocket");

    utils.config(['$httpProvider', config]);
    function config($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.headers.common = { 'Access-Control-Allow-Origin' : '*' };
    }


})();