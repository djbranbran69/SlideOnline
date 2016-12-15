angular.module('authService', []).service('auth', authFnc);

function authFnc(){
	var userMap={};
	userMap['jdoe']='jdoepwd';
	userMap['psmith']='psmithpwd';
	userMap['tp']='tp';

	var fncContainer={
		checkUser: checkUser,
		userList: userList
	};

	function checkUser(userlogin, userpwd){
		if(userlogin && userpwd)
			return userMap[userlogin] == userpwd;
		else return false;
	};

	function userList(){
		return Object.keys(userMap);
	};

	return fncContainer;
}