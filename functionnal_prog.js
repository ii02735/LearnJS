//Functionnal programming

/**
  * Despite of the fact that JS provide some embedded methods like to filter arrays
  * sometime it is the best to write your owns (pure JS), for better compatibility
  */

function filterArray(arr,fn)
{
	var result = [];
	for(var i = 0; i<arr.length; i++)
	{
		if(fn(arr[i])) //callback argument working here
			result.push(arr[i]);
	}
	return result;
}

function find(arr,fn)
{
	for(var i = 0; i<arr.length; i++)
		if(fn(arr[i]))
			return arr[i];
}

var handleData = (function(){ //Don't forget IIFE in order to initialize values once
	var array = [];
	return { //Remember : closure using, we use functions in order to access to informations before return. Because of that feature, array is kept from us ("privatized")
			//Only functions below can work on that
		add: function(i){
			array.push(i);
		},
		addRandom: function(qty,min,max){
			for(var i = 0; i<qty; i++)
			{
				this.add(Math.ceil(Math.random() * max) + min);
			}
		},
		filter: function(fn)
		{
			array = filterArray(array,fn);
			/**
			  * Example of usage : handleData.filter(function(e){return e > 3}); will return the first element corresponding to the matching 
			  */
		},
		filterIndex: function(fn) //writing directly function work here
		{
			var result = [];
			for(var i = 0; i<array.length; i++)
				if(fn(array[i]))
					result.push(i); //retrieving index
			return result;
		},
		find: function(fn)
		{
			return find(array,fn);
		},
		print: function()
		{
			console.log(array);
		}
	}
}());

