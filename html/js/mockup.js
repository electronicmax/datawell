angular
  .module('datawell', ['ui'])
  .controller('mockup', function($scope, mockupdata) {
 	$scope.fakedata = mockupdata;
  }).directive('reminder', function() {
	return {
		restrict:'E',
		scope:{model:'=model'},
  		templateUrl:'templates/reminder.html',
		controller:function($scope) {
			console.log("model ", $scope.model);
			return;
  		}
  	};
});

