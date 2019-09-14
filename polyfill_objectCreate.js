if(!Object.create)
{
	Object.create = function(object)
	{
		if(arguments.length > 1)
			throw new Error("Object.create can only accept one argument");
		function ProtoObject(){}
		ProtoObject.prototype = object; //we set the prototype (function constuctor object) as the object informations
		return new ProtoObject();
	}
}
else
{
	console.info("Object.create already exists : don't need to execute polyfill...");
}