angular.module('loginApp').controller('loginCtrl', loginCrtFnt);

loginCrtFnt.$inject = ['$scope', '$log', 'auth', '$window'];

function loginCrtFnt($scope, $log, auth, $window) {

    $scope.logAuth = function () {
        $log.info('user login', $scope.user.login);
        $log.info('user pwd', $scope.user.pwd);
    };

    $scope.logAuthObject = function (user) {
    	if(user){
    		if(auth.checkUser(user.login, user.pwd)){
    			$window.open("loginSuccess.html", "_self");
    		}
    		else
    			$log.error('Bad credentials');
    	}

        $log.info('list user', auth.userList())
    };
};