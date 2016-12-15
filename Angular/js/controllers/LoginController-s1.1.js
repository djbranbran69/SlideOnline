angular.module('loginApp').controller('loginCtrl', loginCrtFnt);

loginCrtFnt.$inject = ['$scope', '$log', 'auth'];

function loginCrtFnt($scope, $log, auth) {

    $scope.logAuth = function () {
        $log.info('user login', $scope.user.login);
        $log.info('user pwd', $scope.user.pwd);
    };

    $scope.logAuthObject = function (user) {
    	auth.checkUser(user.login, user.pwd);
    };
};