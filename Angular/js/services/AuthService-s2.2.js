angular.module('authService', []).service('auth', authFnc);

authFnc.$inject=['$http', '$q', '$log'];

function authFnc($http, $q, $log){
	var userMap={};
	userMap['jdoe']='jdoepwd';
	userMap['psmith']='psmithpwd';
	userMap['tp']='tp';


	var roleMap={};
	roleMap['jdoe']='admin';
	roleMap['psmith']='watcher';

	var fncContainer={
		localAuthAsk:localAuthAsk,
		authAsk:authAsk
	};

	function localAuthAsk(login, pwd){
		var deferred = $q.defer();
		setInterval(function(login, pwd){
			if(login && pwd){
				if(userMap[login] == pwd){
					deferred.resolve(
					{
						"validAuth": true, 
						"login": login,
						"role": roleMap[login]
					});
				}
				else{
					deferred.reject("Bad auth");
				}
			}
			else {
				deferred.reject("Fill user and password fields");
			}

			clearInterval(this);
		}, 3000, login, pwd);

		return deferred.promise;
	}

	function authAsk(login, pwd){
		var deferred = $q.defer();
			
		$http.post('/fakeauthwatcher',{'login':login,'pwd':pwd}).
			success(function(data, status, headers, config) {
				deferred.resolve(
				{
						"validAuth": data.validAuth, 
						"login": data.login,
						"role": data.role
				});
			}).error(function(data, status, headers, config) {
				deferred.reject(status);
			}
		);
		return deferred;
	}

	return fncContainer;
}