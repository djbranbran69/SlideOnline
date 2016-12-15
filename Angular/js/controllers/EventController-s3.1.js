angular.module('adminApp').controller('eventCtrl', eventCrtFnt);

eventCrtFnt.$inject = ['$log', '$scope', 'factory'];

function eventCrtFnt($log, $scope, factory) {
	$scope.currentPresentation = factory.presentationCreation("test titre", 
		"test description");
	$scope.currentPresentation.slides = []

	$scope.newSlide = function(){
		$scope.currentPresentation.slides.push(factory.slidCreation("titre slid",
			"txt slid"));
	}

	$scope.selectCurrentSlid = function(slide){
		$scope.currentSlide=slide;

		$log.info("slide", slide);
	}

	$scope.isSlidContentEmpty = function(slid){
		if(slid.contentMap[1] == undefined){
			return true;
		}
		return false;
	}
};