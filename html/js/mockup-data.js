angular
   .module('datawell')
   .factory('mockupdata', function() {
   		return {
   			today:[
   			   {
   			      type:'reminder',
   			      app :'heart',
   			      who: "Max",
   			      message:'Schedule a heart checkup with Dr. Robinson'
   			   }
   			]
   		};
   });