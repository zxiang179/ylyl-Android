/**
 * Created by Lcj on 2016/10/22.
 */
(function () {
    "use strict";
    var utils = angular.module('ykylUtils');

    utils.service('userSignDao',['YkylConnection', function(conn) {
        var vm=this;
        var BASE_URL ='user';

        //vm.checkUserPhone=checkUserPhone;
        vm.sendUserSignMsg=sendUserSignMsg;

       /* function checkUserPhone(phone,callback) {
            conn.post(BASE_URL+'checkUser',{"phone":phone},callback)
        }*/
        function sendUserSignMsg(user,callback) {
            conn.get(BASE_URL+'/newRegister',{"phone":user.phoneNum,"password":user.password},callback);


        }

    }]);

})();