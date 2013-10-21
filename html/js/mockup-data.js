angular
   .module('datawell')
   .factory('mockupdata', function() {
   		return {
   			people: [
    			{
	   			   name:"Max",
	   			   img:'imgs/foobar.png',
   			  },
		      {
      			   name:"James",
	   			   img:'imgs/foobar.png',
   			  }
   			],
   			today:[
   			   {
   			      type:'reminder',
   			      app :'heart',
   			      for_whom: "Max",
   			      message:'Schedule a heart checkup with Dr. Robinson'
   			   },
   			   {
   			      type:'reminder',
   			      app :'heart',
   			      for_whom: "Johnny",
   			      message:'Schedule an MMR vaccination for Johnny'
   			   }
   			]
   		};
   });