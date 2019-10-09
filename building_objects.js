//We can also build objects with another way, with the NEW keyword

//We need a function that will operates LIKE a class (called the function CONSTRUCTOR)

/**
 * Warning : there is no really classes in JS, 
 * this is a marketing argument to make Java developers attracted at the time when JS was built
 */

 function Person(firstname,name)
 {
 	this.firstname = firstname;
 	this.name = name;
 	/**
 	  * this.getFullName = function(){ return this.firstname + " " + this.name };
      * NEVER DO THAT ! DON'T ADD METHODS INSIDE FUNCTION CONSTRUCTOR*
 	  **/
 }


 var testObject = new Person("John","Doe");
 console.log(testObject);
 /**
   * Don't be misled : "this" keyword DOESN'T REFER TO THE GLOBAL ENVIRONMENT but to A BRAND NEW OBJECT !
   * This is thanks to the "new" operator :
   *
   *  1) It creates an EMTPY object : var testObject = {} 
   *  2) It invokes the method "Person" : its scope will be in the object
   *  3) The result will be :
   *  testObject = {
   *		firstname: "John",
   *        name: "Doe" 
   *  } 
   *  and the Person INSTANCE will be applied to it : it is not a REGULAR OBJECT ANYMORE but a TYPED ONE !
   */

  /**
    * warning : .prototype and __proto__ are not the same !!!
    * __proto__ is to access to the inherited properties by calling an object ancestor of A REGULAR OBJECT and should never be used !
    * .prototype is to access to the inherited properties by calling an object ancestor of AN OBJECT USING THE function CONSTRUCTOR (so it uses the NEW OPERATOR) 
    * 
    * So every constructor functions have access to their prototype
    * We can use that attribute if we want to modify properties of the function constructor's ANCESTOR
    *    
    */


 Person.prototype.getFullName = function(){
	return this.firstname + " " + this.name;
}
 //testObject will still have firstname and name as attribute members, but its PROTOTYPE will be modified (in fact the constructor )
//It is decent to use that feature : we can modify the constructor's prototype even after we've defined it before (function Person())

//Every Person typed objects will have access to that method, it is a good advantage of using the prototype attribute

/**
  * * It is strongly not recommended to add new methods INSIDE the function CONSTRUCTOR : it is still a function OBJECT, however it takes MEMORY SPACE when new functions are ADDED
  * So every OBJECTS WILL HAVE THEIR OWN getFullName method
  * If it is added to the prototype, they will call an UNIQUE getFullName (= memory saved, because there is only ONE prototype for the constructor)
  */

//It is possible to add new methods to built-in constructors (constructors that are already existing)

String.prototype.isGreatherThan = function(length){ return this.length > length }; // All string will now be able to call that method 
																				   // (String is now extended : strings objectsthey inherit that method)

//Why it is DANGEROUS to use built-in constructors (especially for primitives : Number, Boolean...) despite of the fact they can extend some JS basis functionnalites (like String)

var a = new Number(2); //is NOT a primitive, ergo (a === 2) will be FALSE, the first is Object typed, and the second one, is a PRIMITIVE
//Always, for simplicity, use PRIMITIVES if you can


/** 
  * For arrays, or with some objects working with constructors, don't use for IN as you would working for objects.
  * They are still objects, but using for IN displays all the prototype properties of the Array function constructor
  * Hence :
  */

Array.prototype.test = "hello !";

var array = [1,2,3,4];

for(var prop in array)
{
	console.log(prop + ":" + array[prop]); //will show index : element. HOWEVER, it will also show test : "hello", this is not what we want to display 
	//So this kind of loop is to be avoided !
}

//use instead classic for, or for OF for working with arrays

for(var element of array)
{
	console.log(element);
}

//You can also defining prototype values with simple objects (object literal syntax), thanks to Object.create (ECMAScript 5 : modern browsers from 2009)
//It is like defining objects WITH A MORE STANDARD WAY, instead of creating a function constructor

//BEWARE : the instance will be OBJECT typed !

var specialProto = {
	name: "unknown",
	firstname: "unknown",
	status: "not subscribed",
	identity: function()
	{
		console.log("name : " + this.name + "\nfirstname :" + this.firstname + "\nstatus : " + this.status)
	},
	department: function(){},
	activity: function(){}
}

var instanceObject = Object.create(specialProto); //It is like a constructor, but less verbose

//instanceObject is an EMPTY object, but with a PROTOTYPE : so it comes with values already defined, it is called PURE PROTOTYPAL INHERITANCE
//we can in fact OVERRIDE these values, like inheritance : 

instanceObject.name = "John"; //will now be specific to the instance

specialProto.confirmSubscribe = function(){ //"prototype" object is now edited : a function has been added (it is like modifying instanceObject's prototype)
	if(this.status === "not subscribed"){ 
		console.warn(this.name + " " + this.firstname + " is not subscribed")
	}else{
		console.log(this.name + " " + this.firstname + " is subscribed")
	}
}

//example of inheritance case with pure prototypal inheritance : we want to create IT students, but with specialProto's skeleton, so like a factory

var ITStudent = Object.create(specialProto); //we define a new "protoype" Object from another one = prototypal inheritance !
ITStudent.status = "Subscribed";
ITStudent.department = function(){ return "IT Department"; } //OVERRIDE of prototype (specialProto) function, it will be specific

//specialProto is now EXTENDED to ANOTHER OBJECT

var ITStudent1 = Object.create(ITStudent);
ITStudent1.name = "Hagakure"; 
ITStudent1.firstname = "Shiro";

var ITStudent2 = Object.create(ITStudent);
ITStudent2.name = "McAllister";
ITStudent2.firstname = "Patrick";

//We can change these instances prototype

ITStudent. //because it is in fact a prototype, instances of it will use this method, instead of reproducing it in their (same way as changing prototype separately)
	activity = function(){ console.log(this.name + " " + this.firstname + " is coding...")}; //Prototype regarding ITStudent has been changed
	


//If we must change the ROOT prototype, we must access to specialProto

//If the browser DOESN'T have Object.create available because it is not updated, we must write its behavior : it is called POLYFILL (see polyfill_objectCreate.js)
//we can mimic BEHAVIOURS, but there is no way to create NEW COMPILER SYNTAX (like ES6's arrow syntax => )

//ES6 (or ES 2016) provides a way in JS to create classes like in other programming languages, but it doesn't work the same way as Java for example does (above all encapsulation)
/**
  * But it is more appreciable to keep using tools that JS provides us from a long time (ES5 especially), 
  * like pure prototyping inheritence, constructor functions, prototyping usage for built-in...
  */
