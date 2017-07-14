var http = require('http');
var express = require('express')
var path = require('path')
var fs = require('fs')
var bodyParser = require("body-parser")


var myresult='';

//method=baidu.ting.song.playAAC&songid=877578
//method=baidu.ting.search.catalogSug&query='+query

var getdata=function(query){
 
//var query = encodeURIComponent('刘德华');

var query = encodeURIComponent(query);
var result = '';
http.get('http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&callback=&from=webapp_music&method=baidu.ting.search.catalogSug&query='+query,function(res){
    res.setEncoding('utf8');
    console.log('STATUS: ' + res.statusCode);
  res.on('data', function (chunk) {
  	result+=chunk;
  });
  res.on('end',function(){
//此处一定要把myresult放在res.on('end')中 ，这样数据传输结束之后 才会把值传给myresult.
       myresult=result;
  });
});
 
};

var mysrc='';
var getmusic=function(id){
    var result='';
    http.get('http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&callback=&from=webapp_music&method=baidu.ting.song.playAAC&songid='+id,function(res){
    res.setEncoding('utf8');
    console.log('STATUS: ' + res.statusCode);
  res.on('data', function (chunk) {
    result+=chunk;
  });
  res.on('end',function(){
//此处一定要把myresult放在res.on('end')中 ，这样数据传输结束之后 才会把值传给myresult.
       mysrc=result;
  });
});
}


    var app = express();
    app.use(bodyParser.urlencoded({extended:true}))

    app.use(express.static(path.join(__dirname, 'public')));


    app.post('/test',function(req,res){
        console.log(req.body.query);
        getdata(req.body.query);

         var data=myresult;
         var t1=setInterval(function(){
           if(data!=myresult){
           	res.send(myresult);
           	clearInterval(t1);
           }
         },50);
     });
     
      app.post('/play',function(req,res){
        console.log(req.body.id);
        getmusic(req.body.id);

         var data=mysrc;
         var t1=setInterval(function(){
           if(data!=mysrc){
            res.send(mysrc);
            clearInterval(t1);
           }
         },50);
     });



    app.listen(3000);