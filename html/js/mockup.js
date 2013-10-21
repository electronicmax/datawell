angular
  .module('datawell', ['ui'])
  .controller('mockup', function($scope, mockupdata) {
  	var defaultApps = [
  		{	title: 'Feed',
  			icon: 'icon-feed' },
  		{	title: 'Settings',
  			icon: 'icon-cog' },
  		{	title: 'Health record',
  			icon: 'icon-record' }
  	];
 	$scope.fakedata = mockupdata;
 	$scope.people = mockupdata.people;
 	$scope.apps = [].concat(defaultApps, mockupdata.apps)
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

