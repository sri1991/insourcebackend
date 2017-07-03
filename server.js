
var mongoClient=require('mongodb').MongoClient,
	assert=require('assert'),
	express= require('express');
	app=express(),
	engines=require('consolidate'),
	bodyParser=require('body-parser');
app.engine('html',engines.nunjucks);
app.set('view engine','html');
app.set('views',__dirname,'/views');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
//app.use(app.router);
app.get('/',function(req,res){		
  res.send('Welcome to insource tech backend');
});


app.post('/insource',function(req,res,next){
	mongoClient.connect('mongodb://Sri:password@ds059284.mongolab.com:59284/srinivasdb',function(err,db){/*mongodb://localhost:27017/myFavorites*/
		assert.equal(null,err);
		console.log('connected to DB');
		db.collection('insource').insert({'name':req.headers.name,'email':req.headers.email,'phone':req.headers.phone,'message':req.headers.message},function(err,result){
			assert.equal(null,err);
			console.log(result);
			res.send('success');
			db.collection('insource').find({}).toArray(function(err,docs){
				db.close();
			});			
		});
	})
});


app.use(function(req,res){
	res.sendStatus(404);
});
var server=app.listen(8000,function(){
		var port=server.address().port;
		console.log('Express listening port'+port);
});




