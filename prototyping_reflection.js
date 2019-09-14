/**
  * All created objects got an embedded attribute called "prototype"
  * It is in fact an attribute that REFERS to an object ancestor (that object that have properties inherited)
  * 
  * It is so some kind of GENERALIZATION, we go deep inside of the embedded properties that builds an array, an object... 
  *  
  * Everything is an OBJECT (or a primitive)
  * That attribute got specific for the object that we are working for 
  * (built functions)
  */

  //An array is in fact an object

var arr = [];

arr.__proto__ //will have some methods regarding arrays (like push(),indexOf())

arr.__proto__.__proto__ //will have some methods regarding OBJECTS (an array is also in fact an object)

//Remember that a function is also an object

var f = function(){};

f.__proto__ //will got properties regarding an OBJECT (functions got some methods inherited from it)

//It is totally not recommanded to assign things to prototype if we need to do some inheritence because of performances issues : NEVER USE IT !

//Example of inheritance with proto
var original = {
	firstname: 'default',
	lastname: 'default',
	getFullName: function(){
		return this.firstname + " " + this.lastname;
	}
}

var person = {
	firstname: 'Shiro'
}

person.__proto__ = original; //all properties that doesn't have person and original does, will be included with their respective values (lastname, getFullName)

//Reflection : JS can provide to objects possibilty to look on their own properties, and methods

if(person.hasOwnProperty('firstname')) //Check if object has specific property
	console.warn(person.firstname); //will work
//However it won't work with inherited fields : those are not explicty owned by person, but by original instead