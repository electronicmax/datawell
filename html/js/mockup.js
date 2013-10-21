angular
  .module('datawell', ['ui'])
  .controller('mockup', function($scope, mockupdata) {
  	var defaultPlans = {
  		feed: {	title: 'Feed',
  			icon: 'icon-feed' },
  		settings: {	title: 'Settings',
  			icon: 'icon-cog' },
  		healthrecord: {	title: 'Health record',
  			icon: 'icon-record' }
  	};
 	$scope.fakedata = mockupdata;
 	//$scope.people = mockupdata.people;
 	var allPlans = _.extend({}, defaultPlans, mockupdata.plans);
 	$scope.people = _.map(mockupdata.people, function (person) {
 		return _.extend({}, person, {
 			plans: _.map(person.plans, function (plan) {
 				return allPlans[plan];
 			})
 		});
 	});
 	$scope.selected = { person: $scope.people[0] };
 	console.log(allPlans)
 	window.$scope = $scope;
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

