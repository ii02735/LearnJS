var names = ["Paul","Sullivan","Sasha","Erwin","Marco"];

var connect = (function () //IIFE made in order to directly access to objects with variable instead of invoking the function each time
	//IIFE is a good way to write code safely, that is independant from other parts : variables names for example are safe from upper environments (like global)
{
	var connected = false;
	var userAttr = null;
	var address = null;
	var d;

	function initialize(user)
	{
		d = new Date();
		address = "127.0."+randomNumber(0,200)+"."+randomNumber(0,255);
		console.log('Connected to MySQL database as ' + user +  ' the ' + d.toLocaleDateString() + ' at ' + d.toLocaleTimeString())
		connected = true;
	};

	function randomNumber(min,max)
	{
		return Math.ceil(Math.random() * Math.floor(max)) + min;
	}

	function pseudoPing()
	{
		for(var i = 0; i<20; i++)
		{	
			(function(){
				setTimeout(function(){
					var time = new Date(); //in order to refresh time at each IIFE
					console.info("[200 OK "+i+"] "+ time.toLocaleTimeString() + " at " + address + " after " + randomNumber(50,500) + " ms");
					console.log("wait for " + 500 + " ms ");
				},500*i); 
				/* we must pass i because it the only date that will be updated  (loop + IIFE -> auto invoke to update code function*)
				 * else it would be executed one time because the closure call is in RETURN --> *the IIFE make the code updated STILL after RETURN
				 * * remember that functions are OBJECTS, hence their CODE are ATTRIBUTES !
				 */
			})();
			
		}
	}
	return {
		status: 'offline',
		user: null,
		address: '0.0.0.0',
		makeQuery: function()
		{
			if(this.status == 'connected')
				console.log('SELECT * FROM table');
			else
				console.warn('[ERROR] Connection to database not working');
		},
		init: function(user){
			if(!this.user){ 
				//surrounding initalize by another function else it would be executed by the IIFE
				initialize(user); //because of closure, only functions in return are capable to use elements in upper function
				//not the user, hence, initialize is protected from the user. 
				//And because initialize function is inside of another function, it is safe. Only the engine is capable to execute it properly !
				this.status = (connected === true) ? 'connected' : 'offline';
				this.user = user;
				this.address = address;
			}else{
				console.warn("[VIOLATION] Database instance already executed");
			}
		},

		ping: function(){
			pseudoPing(); //delegation inside anonymous function in order to avoid its execution since we are inside an IIFE
		},

		logout: function(){
			console.info("[DISCONNECTION] Disconnecting " + this.user + " from " + this.address);
			this.status = "offline";
			this.user = null;
			this.address = '0.0.0.0';
		},

		shuffle: function(min,max){
			return randomNumber(min,max);
		}

	}
})();

var index = connect.shuffle(0,names.length - 1)
connect.init(names[index]);