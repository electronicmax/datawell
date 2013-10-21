angular
   .module('datawell')
   .factory('mockupdata', function() {
   		return {
   			people: [
    			{
	   			   name:"David",
	   			   img:'images/family/david.jpg',
   			  },
		      {
      			   name:"Elizabeth",
	   			   img:'images/family/elizabeth.jpg',
   			  },
		      {
      			   name:"Michael",
	   			   img:'images/family/michael.jpg',
   			  },
		      {
      			   name:"Susan",
	   			   img:'images/family/susan.jpg'
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
