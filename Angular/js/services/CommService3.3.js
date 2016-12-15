angular.module('commServices', []).factory('comm',commFnc);
commFnc.$inject=['$http','$q'];

function commFnc($http,$q ){
    var comm = {
         loadImages:       loadImages,
         loadPres:          loadPres,
         savePres:      savePres
         
    };
   
   function loadImages(presName, presId){
		var deferred = $q.defer();
		

		$http.get('/resources_list').success(
			function(data, status, headers, config){
				deferred.resolve(data);
			}).error(
			function(data, status, headers, config){
				deferred.reject(status);
			});

		return deferred.promise;
   };
   
   function loadPres(presName, presId){
		var deferred = $q.defer();
		
		$http.get('/loadPres').success(
			function(data, status, headers, config){
				deferred.resolve(data);
			}).error(
			function(data, status, headers, config){
				deferred.reject(status);
			});

		return deferred.promise;
   };

   function savePres(){
      var deferred = $q.defer();
      
      var req = {
         method: 'POST',
         url: 'savePres',
         headers:{
            'Content-Type':'json'
         },
         data:{}
      };


      $http.post('/savePres').success(
         function(data, status, headers, config){
            deferred.resolve(data);
         }).error(
         function(data, status, headers, config){
            deferred.reject(status);
         });

      return deferred.promise;
   };

   //Order for watcher clients
   comm.io={};
   comm.io.socketConnection=function(scope, uuid){
   		var socket = io.connect();

   		comm.io.uuid = uuid;
   		socket.on('connection', function(){
   			socket.emit('data comm',{'id':comm.io.uuid});
   		});

   		socket.on('newPres', function(socket){

   		});

   		socket.on('slidEvent', function(socket){

   		});

   		return socket;
   }

   comm.io.emitPrev=function(socket){
   		socket.emit('slidEvent', {'CMD':'PREV'});
   }
   
   comm.io.emitNext=function(socket){
   		socket.emit('slidEvent', {'CMD':'NEXT'});
   }

   comm.io.emitStart=function(socket, presUUID){
   		socket.emit('slidEvent', {'CMD':'START','PRES ID':presUUID});
   }

   comm.io.emitPause=function(socket){
   		socket.emit('slidEvent', {'CMD':'PAUSE'});
   }

   comm.io.emitBegin=function(socket){
   		socket.emit('slidEvent', {'CMD':'BEGIN'});
   }

   comm.io.emitEnd=function(socket){
   		socket.emit('slidEvent', {'CMD':'END'});
   }

   return comm;
};
    