var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();

// set the default views folder
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

// register the session with it's secret ID
app.use(session({secret: 'uitisawesome'}));

// register the bodyParser middleware for processing forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',function(req,res){

	// Check if an e-mail address is set in the session.
	// If it is, we will redirect to the admin page.
	if(req.session.email) {
	    res.redirect('/admin');
	}
	else {
	    res.render('index.html');
	}
});


app.post('/login',function(req,res){

	// Very basic. Set the session e-mail to whatever the user has added.
	req.session.email = req.body.email;
	req.session.password = req.body.pass;
	res.end('done');
});

app.get('/admin',function(req,res){
  
	if(req.session.email) {
		res.write('<h1>Hello '+req.session.email+'</h1>');
		res.write('<a href="/logout">Logout</a>');
		res.end();
	} else {
		res.write('<h1>Please login first.</h1>');
		res.write('<a href="/">Login</a>');
		res.end();
	}
});

app.get('/logout',function(req,res){
	
	// if the user logs out, destroy all of their individual session
	// information
	req.session.destroy(function(err) {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/');
		}
	});

});

app.listen(8000,function(){
	console.log("App Started on port 8000");
});