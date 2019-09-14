function functions(){
	var arr = [];
	for(var i = 0; i<5; i++)
	{
	
		arr.push(function(){
			 //functions are pushed --> those are NOT executed, 
			//they are just have the same CODE, because they are not executed,
			//the value of i is "i" , the real value will be when the return is hit
			console.log(i);
		});
	}
	return arr; //return multiple functions
	//Because functions are returned, these latters have the right
	//to use informations upper the return

	//When return is hit, all informations regarding its function should be
	//terminated. But when functions are returned, they STILL CAN USE THOSE
	//INFORMATIONS --> it is the CLOSURE PHENOMENON !!!
}

var f = functions();
//WILL RETURN THE FINAL VALUE OF i --> the value when "return" is executed
f[0]();
f[1]();
f[2]();
f[3]();
f[4]();

//output the function CODE will prove that i is not interpreted since the function is not INVOKED

//Remember, a function is AN OBJECT, and its "attributes are" :

/*
 * the NAME
 * the CODE --> it is stored and it is EXECUTED when INVOKED () !!!
 * other properties (that are attached outside as common attributes for normal objects)
 */

//Two ways to execute the code BEFORE INVOCATION (if we want to save iteration's values and not the final) :
//With let (new JS version and performances not so well if a lot of iteration)
/*
 * if "let" variable scope is declared
 * scope will be different from var
 * let is only visible in the lexical scope, hence in for
 * each time scope will be different because lexical changes
 * and if scope is different, it means that another MEMORY SPACE IS CREATED
 */

 //With IIFE : automatic execution, DON'T FORGET TO DECLARE A PARAMETER TO PASS BY 
 //the returning function will save this parameter (CLOSURE ! --> it'll look on its father and not in the entire loop !)
 //after the AUTOMATIC EXECUTION OF ITS FATHER
 //so not the FINAL value, but the DIFFERENT VALUES because there are AUTOMATIC EXECUTIONS FOR EACH ITERATION

function countingLetters(s){

	//Because we return a group functions, closure applies, hence
	//resources in countingLetters() are usables but ONLY in these FUNCTIONS
 	var names = ["Paul","Sullivan","Sasha","Erwin","Marco"];
    var arrNamesFunctions = [];
 	for(name of names)
 	{
 		/*
 		arrNamesFunctions.push(function(){
 			console.log(name + " length = " + name.length)
 		})
        wrong here, only final name value is saved because code is not interpreted before saving to array
 		*/

 		//we must execute the code once in order to save changes made by the loop
 		//we must store the changed value in the IIFE, by parameter (more frequent) or variable
 		arrNamesFunctions.push((function(n){
 			return function(s){
 				if(s) //add some parameters to functions...
 					console.log(s + " added for " + n);
 				console.log(n + " length = " + (n.length + s));
 			}//function code will be updated (n interpreted) because IIFE executes automatically the method's context code
 		})(name));
 	}
 	return arrNamesFunctions;
}

var l = countingLetters();
var sup = [1,2,3,4,5];
for(var i = 0; i<sup.length;i++)
	l[i](sup[i]);

//Factory example for showing closure advantages (variable reusing for sub function)
function factoryStudent(discipline)
{
	return function(/*don't need to fill again discipline as a parameter thanks to closure*/name, firstname)
	{
		switch(discipline) // discipline is still visible after return because of closure feature
		{
			case 'IT':
				return {
					name: name,
					firstname: firstname,
					study: discipline,
					action: function(){
						console.log('Using computer')
					}
				};
			case 'Medical':
				return {
					name: name,
					firstname: firstname,
					study: discipline,
					action: function(){
						console.log('Studying medical books')
					}
				};
			default:
				return {
					name: name,
					firstname: firstname,
					study: 'Unknown',
					action: function(){
						console.warn('Still waiting for registering results');
					}
				}
		}
	}
}

var ITFactory = factoryStudent('IT');
var MedFactory = factoryStudent('Medical');
var NotRegisteredFactory = factoryStudent('Unknown');

//Closures are useful here : it prevents to fill the same parameters for the returning function
//ITPupils('john','doe') instead of ITPupils('IT','john','doe')

//Other example of object declaring with closures

function Student(name,firstname) //don't need to use IIFE because we declaring a function that can be injected letter (to create multiple objects)
{
	var self = {
		name: name,
		firstname: firstname
	}
	return { //again with closures, only function can manipulate upper arguments
			 //closures make variables PRIVATE easy to create
		getFullName: function(){
			console.log("Fullname : " + self.name + " " + self.firstname);
		},
		setters: function(name,firstname)
		{
			self.name = name;
			self.firstname = firstname;
		}
	}
}

var student1 = Student('yadallee','bilaal');

//However, we cannont check student1 instance (it doesn't have an instance in fact)
//And it is reputed to have slightly better performances with PROTOTYPE