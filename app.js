var express = require('express')
var fs = require('fs')
var app = express()
app.use('/libs', express.static(__dirname + '/libs'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));

app.get('/', function(req, res){
    fs.readFile('index.html', function(error, data){
        res.writeHead(200, { 'Content-Type' : 'text/html' });
        res.end(data)
    });
});

app.listen(8888, function(){
    console.log("server port:8888")
});


/*
var app = express()
app.use(express.static('libs'))
app.use(express.static('js'))
app.use(express.static('css'))
app.get('/', function(req, res){
    res.render('index.html')
})

app.listen(8888, function(){
    console.log('start!')
})
*/
