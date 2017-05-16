/**
 * @author xiafan
 */

(function () {
    'use strict';
    var utils = angular.module('ykylUtils');

    /* 操作url路径的一些服务 */
    utils.service('PathUtils', ['ROOT_PATH', 'SERVICE_API_ROOT', 'WEBSOCKET_API_ROOT', PathUtils]);
    function PathUtils(ROOT_PATH, SERVICE_API_ROOT, WEBSOCKET_API_ROOT) {
        var vm = this;

        vm.getRootPath = getRootPath;
        vm.getWebSocketUrl = getWebSocketUrl;
        vm.getParentPath = getParentPath;
        vm.qualifiedPath = qualifiedPath;
        vm.removeParams = removeParams;
        vm.getPathFromUrl = getPathFromUrl;
        vm.qualifiedAPIPath = qualifiedAPIPath;

        function getRootPath() {
            return ROOT_PATH;
        }

        function getWebSocketUrl() {
            return WEBSOCKET_API_ROOT;
        }

        function getParentPath(path) {
            return path.substring(0, path.lastIndexOf('/'));
        }

        function qualifiedPath(path) {
            return ROOT_PATH + path;
        }

        function removeParams(path) {
            if (path.lastIndexOf('?') > 0)
                return path.substring(0, curPath.lastIndexOf('?'));
            return path;
        }

        function getPathFromUrl(url) {
            url = url.substring(ROOT_PATH.length, url.length);
            return this.removeParams(url);
        }

        function qualifiedAPIPath(path) {
            return SERVICE_API_ROOT + path;
        }
    }

    // /* 页面之间传递session数据的服务 */
    // utils.service('SessionByCookie', ['$cookieStore', SessionByCookie]);
    // function SessionByCookie($cookieStore) {
    //     var vm = this;
    //
    //     vm.setItem = setItem;
    //     vm.getItem = getItem;
    //     vm.remove = remove;
    //
    //     function setItem(key, value) {
    //         $cookieStore.put(key, value);
    //     }
    //
    //     function getItem(key) {
    //         return $cookieStore.get(key);
    //     }
    //
    //     function remove(key) {
    //         $cookieStore.remove(key);
    //     }
    // }



    // /**导出数据服务**/
    // utils.service('FileExport', FileExport);
    // function FileExport() {
    //     this.export = function (data, type, filename) {
    //         var blob = new Blob([data], {type: type});
    //         saveAs(blob, filename);
    //     }
    // }

    // utils.service('YkylCitizenIDValidation', YkylCitizenIDValidation);
    // function YkylCitizenIDValidation() {
    //     var vm = this;
    //
    //     var weight = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];    //十七位数字本体码权重
    //     var checkSum = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];    //mod11,对应校验码字符值
    //
    //     this.validate = validate;
    //
    //     function validate(idNum) {
    //         if (idNum == null)
    //             return false;
    //         if (idNum.length && idNum.length == 18) {
    //             var sum = 0;
    //             var mode = 0;
    //             for (var i = 0; i < 17; i++) {
    //                 sum = sum + idNum.charAt(i) * weight[i];
    //             }
    //             mode = sum % 11;
    //             return checkSum[mode] == idNum.charAt(17);
    //         } else
    //             return false;
    //     }
    // }

     // utils.factory('SessionByLStorage', [ '$sessionStorage',
     //     function($sessionStorage) {
     //         this.setItem = function(key, value) {
     //             $sessionStorage.setItem(key, value);
     //         }
     //         this.getItem = function(key) {
     //             return $sessionStorage.getItem(key);
     //         }
     //         return this;
     // } ]);

})();
