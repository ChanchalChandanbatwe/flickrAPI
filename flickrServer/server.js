var express = require('express'),
app = express(),
cors = require('cors'),
request = require("request");
var Flickr = require("flickrapi"),
flickrOptions = {
    api_key: "8db9a325de15eb098d48f5d7bd7cedee",
    secret: "152bf1c65522885e",
    url: "https://api.flickr.com/services/feeds/photos_public.gne"
    // user_id: "182529446@N03"
  //   token: "580-763-747"
  };
// Flickr object init
var flickrObj;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json()); // support json encoded bodies
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
  }));
app.use(bodyParser.urlencoded({	extended: true })); // support encoded bodies
app.use(express.static(__dirname + "/ui"));


app.get('/api', function (req, res) {
  // console.log('req.query ', req.query)
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  let qStr='';
  if (req.query.string!='') {
    qStr = req.query.string;
  }
  let options = {
    tags: qStr,
    text: "public",
    page: req.query.page
  };
    flickrObj.photos.search(options, function(err, result) {
        if(err) { throw new Error(err); }
         //console.log('result ', result)
        res.json(result);
      });
      
});


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
  
   Flickr.tokenOnly(flickrOptions, function(error, flickr) {
    flickrObj = flickr;
    
  });
   
})