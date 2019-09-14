/**
  * BIND, CALL, APPLY
  * Methods included in functions objects
  * Also applicable on IIFE
  */

 //--> Functions reusing for objects : we can set the "this" object in order to refer to an object (can be useful for an universal object name)
 
 //These are examples, but don't forget to use closures in order to keep global infos secured inside functions !!!!!

 var student = {
 	firstname: "John",
 	name: "Doe"
 }
 

 function getStudentIdentity()
 {
 	console.log("Student identity : " + this.firstname + " " + this.name); //this would refer to the invoking environnement, else the global one : it would throw an error
 }

 function jobsWebService(job1,job2,job3,job4)
 {
 	console.log("Welcome "+this.firstname+" "+this.name+" ! This is the list of jobs available on our website :");
 	console.warn(job1+", "+job2+", "+job3+", "+job4);
 	console.log("--------------EXIT OF JOB APPLICATION-------------");
 }

 //We can inject the "this" value to refer to an object
 //By calling directly the function associated with the student object

 getStudentIdentity.call(student,"first");

//Or if we can to keep it in an object, we can make a copy of the function first

var john = getStudentIdentity.bind(student);

john();

//If we can't pass arguments separately but only in an ARRAY format : APPLY (works like call)

jobsWebService.apply(student,["IT engineer","Doctor","Gardener","Web application developer"]);

//Example of call() or apply() usage --> function borrowing : use of a object's function on OTHER objects

var original = { firstname: "Anonymous", name: "Unknown", 
	printGetter: function(){ 
	   console.log("Original Getter invoked : " + this.firstname+" "+this.name)
	}
};

//Raw data
var students = [ 
	{
		firstname: "Sullivan",
		name: "McAllister"
	},
	{
		firstname: "Sherry",
		name: "Fumiko"
	},
	{
		firstname: "Tom",
		name: "Jackwell"
	}
];

for(student of students)
{
	original.printGetter.call(student); //all objects can use original variable's method because these latters got the same attributes
}

//Example for bind() --> function currying : build new functions from others WITH PRESET PARAMETERS, some kind of factory stuff
//Can be good for mathemetical situations for example

function multiply(a,b)
{
	return a*b;
}

var exampleCurrying = (function(){

	var initial = 100;

	var 
		multiplyByTwo = multiply.bind(this,2), //this refers to global environnment because we set the function there
		multiplyByThree = multiply.bind(this,3); //the second paramteter is in fact the FIRST parameter of multiply()
	//Thanks to IIFE, we initialize these functions once
	return [
		function(){
			initial = multiplyByTwo(initial);
			console.warn("Multiply by two : " + initial);
		},
		function(){
			initial = multiplyByThree(initial);
			console.warn("Multiply by three : " + initial);
		}
	]
}());


//we can avoid using .bind each time when we want to preset a parameter

var multiplyByGeneric = function(first){
	return function(first,second){ //we returning a new function that have a preset argument
		return multiply(first,second);
	}.bind(this,first);
};

//We are now building new functions from multiply (like factory) without .bind
var multiplyByTwo = multiplyByGeneric(2);
var multiplyByThree = multiplyByGeneric(3);