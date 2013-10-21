angular
  .module('datawell', ['ui'])
  .controller('mockup', function($scope, mockupdata) {
 	$scope.fakedata = mockupdata;
 	$scope.people = mockupdata.people;
  }).directive('reminder', function() {
	return {
		restrict:'E',
		scope:{model:'=model'},
  		templateUrl:'templates/reminder.html',
		controller:function($scope) {
			console.log("model ", $scope.model);
			console.log('model.type === reminder', $scope.model.type == 'reminder');
			return;
  		}
  	};
}).directive('person', function() { 
	return {
		restrict:'E',
		scope:{model:'=model'},
  		templateUrl:'templates/person.html',
		controller:function($scope) {
			return;
  		}
  	};
});

