angular
  .module('datawell', ['ui'])
  .controller('mockup', function($scope, mockupdata) {
  	var defaultPlans = {
  		feed: {	title: 'Feed',
  			icon: 'icon-reorder' },
  		settings: {	title: 'Settings',
  			icon: 'icon-cog' },
  		healthrecord: {	title: 'Health record',
  			icon: 'icon-user' }
  	};
 	$scope.fakedata = mockupdata;
 	//$scope.people = mockupdata.people;
 	$scope.people = _.map(mockupdata.people, function (person) {
 		return _.extend({}, person, {
 			plans: _.values(defaultPlans).concat(_.map(person.plans, function (plan) {
 				return mockupdata.plans[plan];
 			}))
 		});
 	});
 	$scope.selected = { person: $scope.people[0] };
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

