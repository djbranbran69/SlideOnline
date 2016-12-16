var contentType={}
contentType.IMG_URL="IMG_URL";
contentType.IMG_B64="IMG_B64";

angular.module('factoryServices', []).factory('factory', factoryFnc);

function factoryFnc(){
	var factory = {
		generateUUID: generateUUID,
		contentCreation: contentCreation,
		slidCreation: slidCreation,
		presentationCreation: presentationCreation,
		mapToArray: mapToArray
	};

	function generateUUID(){
		var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, 
			function(c) {
				var r = (d + Math.random()*16)%16 | 0;
				d = Math.floor(d/16);
				return (c=='x' ? r : (r&0x3|0x8)).toString(16);
		});
		return uuid;
	};

	function contentCreation(title, type, src){

	};

	function slidCreation(title, txt){
		var slid = {}
		slid.title = title;
		slid.txt = txt;
		slid.content = {};
		slid.content.title = "content";

		var rand = Math.floor((Math.random()*4))
		if(rand == 0){
			slid.content.src= '';
		}
		else if(rand == 1){
			slid.content.src = 'http://www.prepa-cpe.fr/IMG/jpg/0-NOS_ATOUTS-RE0909_1294.jpg'
		}
		else if(rand == 2){
			slid.content.src = 'http://www.jeuxetcompagnie.fr/wp-content/uploads/2013/04/jeu-de-cartes.jpg'
		}
		else if(rand == 3){
			slid.content.src = 'http://braindamaged.fr/wp-content/uploads/2014/02/scarlett-johansson-c%C3%A9sar-2014.jpeg'
		}
		

		return slid;
	};

	function presentationCreation(title, description){
		var obj = {}
		obj.title = title;
		obj.description = description;

		return obj;
	}

	function mapToArray(map){
		contentArray = [];
		for(key in map){
			contentArray.push(map[key]);
		}
		return contentArray;
	}

	return factory;
}