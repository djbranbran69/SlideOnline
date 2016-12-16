angular.module('loginApp').controller('loginCtrl', loginCrtFnt);

loginCrtFnt.$inject = ['$scope', '$log', 'auth', '$window'];

function loginCrtFnt($scope, $log, auth, $window) {

    $scope.logAuth = function () {
        $log.info('user login', $scope.user.login);
        $log.info('user pwd', $scope.user.pwd);
    };

    $scope.logAuthObject = function (user) {
    	if(user){
    		var promise = auth.localAuthAsk(user.login, user.pwd);
            
            promise.then(
                function(data){
                    if(data){
                        if(data.validAuth){
                            if(data.role == 'admin')
                                $window.open("admin.html", "_self");
                            else if(data.role == 'watcher')
                                $window.open("watch.html", "_self");
                            else
                                $window.open("loginSuccess.html", "_self");

                        }
                    }
                },
                function(error){
                    $log.error(error);
                }
            );
    	}
    };
};