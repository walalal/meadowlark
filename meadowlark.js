var express = require('express');

var app = express();

var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

app.set('port',process.env.PORT||3000);

var fortune = require('./lib/fortune.js');

app.use(function(req,res,next){
   res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
   next();
});

app.use(express.static(__dirname+'/public'));
app.get('/',function(req,res){
     res.render('home') 
});

app.use(express.static(__dirname+'/public'));
app.get('/about',function(req,res){
     res.render('about',{
           fortune:fortune.getFortune(),
           pageTestScript:'/qa/tests-about.js'
     });
});

app.get('/tours/hood-river',function(req,res){
        res.render('tours/hood-river');
})

app.get('/tours/request-group-rate',function(req,res){
        res.render('tours/request-group-rate');
});

app.use(express.static(__dirname+'/public'));
app.use(function(req,res){
     res.status(404);
     res.render('404');
});

app.use(express.static(__dirname+'/public'));
app.use(function(err,req,res,next){
     console.error(err.stack);
     res.status(500);
     res.render('500');
});

app.get('/hood',function(req,res){
     res.render('hood');
});

app.listen(app.get('port'),function(){
    console.log('Express startes on http://localhost:'+app.get('port')+';press Ctrl-C to terminate.');
})
