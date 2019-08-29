var express = require('express');
var app = express();

// bodyParser is used to parse the payload of the incoming POST requests
//body-parser extract the entire body portion of an 
//incoming request stream and exposes it on req.body
var bodyParser = require('body-parser');

//Setup the view engine
//Express renders ejs template
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//Setup the static assets in the current directories 
app.use(express.static('image'));
app.use(express.static('css'));

app.get('/', function (req, res) {
    res.render('index.html');
})

app.get('/newTask', function (req, res) {
    res.render('newTask.html');
})

//The array of the task list
let db = [];

app.get('/listTask', function (req, res) {
    // the content of the page should be generated dynamically. 
    // a copy of the array (db) will be send to the rendering engine. 
    res.render('listTask.html', { taskDb: db })
})

//This is to allow Express use and understand the urlEncoded format
app.use(bodyParser.urlencoded({
    extended: false
}))

//When the user click the submit button on the form, it will send a 
//POST request to /newTask and the server will then response
//by rendering listTask.html..
app.post('/newTask', function (req, res) {
    let rec = {
        taskname: req.body.taskname,
        taskdue: req.body.taskdue,
        taskdesc: req.body.taskdesc,
    }
    db.push(rec);
    // the content of the page should be generated dynamically. 
    // a copy of the array (db) will be send to the rendering engine.
    res.render('listTask.html', { taskDb: db });
})

app.listen(8080);
