var express = require('express'),
    url = require('url'),
    moment = require('moment');
//moment().format();
var app = express();
app.set('port', (process.env.PORT || 8080))
app.use('/',express.static('info'));

app.get('/*', function (req, res) {
  var dateString = url.parse(req.url,true);
  var dateStringSlice = dateString.pathname.slice(1);
  var result = {};
  if(dateString.pathname!=='/') {
     var m1 = moment(decodeURI(dateStringSlice));
     var m2 = moment(Number(dateStringSlice));
     if(m1.isValid() || m2.isValid()){
         if(m1.isValid()){
             result.unix = Number(m1.format('X'));
             result.natural = m1.format('MMMM')+' '+m1.format('DD')+', '+m1.format('YYYY');
         }
         else{
             result.unix = Number(m2.format('X'));
             result.natural = m2.format('MMMM')+' '+m2.format('DD')+', '+m2.format('YYYY');
         }
         
     }else
     {
        result.unix = null;
        result.natural = null; 
     }
   res.send(result);
  }
});



app.listen(app.get('port'));
