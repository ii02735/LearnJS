//each time when JS engine is invoked, a GLOBAL environnment is created : it creates its own set of variables and functions before interpreting the developer's code
//When reading is coming, variables are set in memory BEFORE their values and functions are also set in memory. If a variable is invoked before its DECLARATION, its value 
//will be UNDEFINED

//A function is considered as an environnment, because it can contains its own set of variables (var must be preceded)

//operators ARE functions, infix functions per se

// + needs two numbers, like a function : +(a,b)
// strict equality is strongly recommended for basic conditionnal purposes : it checks the type equality before values
2 === 2 //will return true
2 === "2" //will return false
/*
 * Functions ARE OBJECTS
 * Therefore, it is possible to attach some properties on these :
 */

 function greet()
 {
 	console.log("hi ! ");
 }

 greet.name = "john";

 greet(); console.log(greet.name); //will display hi ! john

 //More explicit way is to set the method into a variable first

 var method = function(){
 	console.log("hi ! ");
 }

 method.name = "john";

 // An expression is considered to be lines of code that return a value
 	
 var a = 2; //will return 2 hence it is an expression
 
 if() //won't return nothing so it is not an expression but a STATEMENT

function newAttribute(a)
{
	a.addNew = "hello new attribute !";//attribute will be added to object
}

var object = {
	construct: function()
	{
		this.x = 10;
	},
	show: function()
	{
		console.log(this); //this will refer to the called entity, hence object
	}
};

//if this was used outside an object, or IN a function that IS NOT in an object, it would refer to the global environment

function hello(name1,name2,name3)
{
	name1 = name1 || null; //default value is null if none is defined 
	name2 = name2 || null;
	name3 = name3 || null;
	console.log(name1 + " " + name2 + " " + name3);
}

//be careful on semicolons when they ARE not used

return
{
	firstname: "hello"
} //won't work : return after carriage return means a semicolon for JS engine
//However for other keywords that are expecting something else than a semicolon first, this is not a problem

//right way :

return {
	firstname: "hello"
}

var
	a,
	b,
	c; //is perfectly valid

//IMPORTANT TO MAKE CODE UNDERSTANDABLE
//comments are possible through declarations

var object = {
	//firstname
	firstname: "sullivan",
	//lastname which is mandatory
	lastname: "tom",
	//some random method ("first class function")
	//don't forget that a function is also an object
	//so it is possible to add some attributes to a function since
	//these are objects but here we will just make some references to the object attributes
	callback: function(){
		//this : references to object because we are inside of one of them
		console.log(this.firstname+" "+this.lastname);
	}

}

var object = function()
{
	var test = "hello";
	console.log("hello world");
}

object.x = 2;
object.y = 10;

var advancedObject = {
	x: 2,
	y: 4,
	callback: function()
	{
		console.log(this)
	},
	setters: function(x,y)
	{
		this.x = x;
		this.y = y;
		console.log(arguments)
	}
}


var firstObject = { x: 100, y: 40}
var firstPrimitive = "hello";


// anonymous immediate execute function is a good measure to keep code safe behind
// root execution contexts (father method or global execution)
(function(){
	//don't forget that variables inside another execution context is not visible outside
	firstObject.y = -3242; //will work because it comes outside
	var firstPrimitive = "here is containerized"; //not visible outside because it is a function
	console.log("hello world")
}())

firstPrimitive = "bye"; //corresponds to the execution context where it is invoked, so no in functions / IIFE
//IIFE are good measures to write codes that mean to be directly executed
//like writing in the global execution context, but protecting their codes
//because of sensible data, or not colliding with library / framework data

console.log(firstObject);
/*
console.warn(anonymousIIFE); //will result an error
console.warn(test); //will result an error 
*/


function speak(lang)
{
	lang = lang || 'en'; //by default it is english
	switch(lang)
	{
		case 'fr':
		console.log("Bonjour");
		break;
		case 'en':
		console.log("Hello");
		break;
		case 'es':
		console.log("Hola");
		break;
	}
}

//Overloading is not technically possible in JS, but it is possible to emulate it by delegation (hence the argument won't be mandatory)
//You can also make a default value if you want

function speakFr()
{
	speak('fr');
}

function speakEn()
{
	speak('en'); //or speak() because it is the default value
}

function speakEs()
{
	speak('es');
}