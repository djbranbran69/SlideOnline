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
		return userMap[userloginl] == userpwd;
	};

	function userList(){
		return Object.keys(userMap);
	};

	return fncContainer;
}