
const randomstring = require('randomstring');
const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());
const port = process.env.port || 8080;
app.set('view engine', 'ejs');

const fileESPtempHum = __dirname + '/esp32data.json';
const fileESPduty = __dirname + '/esp32duty.json';

app.get('/',(req, res) => {
  res.render('index');
});

app.get('/test/:temp/:hum/:duty', (req, res) => {
  var getEspData =
    {
      "temp": req.params.temp,
      "hum": req.params.hum,
      "duty": req.params.duty,
      "lastEntry": new Date(),
      "hash": randomstring.generate(10)
    }

    fs.readFile(fileESPtempHum, (err, data)=>{
       if(err) return res.send({error:err});

       let entries = JSON.parse(data);

       entries.push(getEspData);

       fs.writeFile(fileESPtempHum, JSON.stringify(entries), 'utf-8', (err)=>{
         if (err) return res.send({error:err})
         return res.send({message:'entry has been saved'});
       });
    });
});

app.get('/getdata', (req, res) => {
  fs.readFile(fileESPtempHum, "utf-8", (err, data) => {
    if(err)
      res.send([{error: err}]);

    res.json(data);
  });
});

app.post('/newDuty/:newDuty', (req, res) => {
  var getNewDuty =
    {
      "newDuty": req.params.newDuty
    }
  fs.writeFile(fileESPduty, JSON.stringify(getNewDuty), (err, data) => {
    if(err)
    {
      return res.send({error : err});
    }
    return res.send("uploaded!");
  });
});

app.get('/getduty', (req, res) => {
  fs.readFile(fileESPduty, "utf-8", (err, data) => {
    if(err)
      res.send([{error: err}]);
    res.end(data);
  });
});

app.listen(port);
