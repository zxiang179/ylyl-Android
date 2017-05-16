/**
 * Created by xiafan on 16-9-9.
 */

(function () {
    "use strict";
    var utils = angular.module('ykylUtils');

    utils.provider('YkylConnection', ConnectionProvider);

    /**
     * @description 服务器连接的类
     */
    function ConnectionProvider() {
        var vm = this;

        vm.errorHandler = errorHandler;

        vm.$get = ['$http', 'PathUtils', ConnectionFactory];
        vm.setErrorHandler = function (errorHandler) {
            vm.errorHandler = errorHandler;
        };

        function ConnectionFactory($http, PathUtils) {
            var conn = {};

            conn.post = post;
            conn.get = get;
            conn.delete = deleteImpl;
            conn.patch = patch;
            conn.put = put;

            return conn;

            function invoke(method, args) {
                var url = args[0];
                var params = args[1];
                var callback = args[2];
                var httpCfg = {
                    url: PathUtils.qualifiedAPIPath(url),
                    method: method,
                    params: params
                };

                if (args.length > 3) {
                    var additionalCfg = args[3];
                    for (var fieldName in additionalCfg) {
                        httpCfg[fieldName] = additionalCfg[fieldName];
                    }
                }

                $http(httpCfg).success(function (response) {
                    callback(response);
                }).error(vm.errorHandler);
            }

            function post(url, params, callback) {
                invoke("post", arguments);
            }

            function get(url, params, callback) {
                invoke("get", arguments);
            }

            function put(url, params, callback) {
                invoke("put", arguments);
            }

            function deleteImpl(url, params, callback) {
                invoke("delete", arguments);
            }

            function patch(url, params, callback) {
                invoke("patch", arguments);
            }
        }
    }

    /*default error handle class for the <code>EcnuConnection</code>*/
    function errorHandler(error) {
        console.log(error);
    }

})();