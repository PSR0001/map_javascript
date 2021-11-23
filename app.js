const express = require('express');
// const fs = require('http');
const Database = require('nedb')//i am using nedb instade of mongodb--okay
const app = express();
const port = 3000;
app.listen(port, () => { console.log(`my server listening at port ${port}`); });

app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));
// const alldata = [];

// creating a data in locally so lets do it using Datastore Fucytion
const database = new Database('Database.db');
database.loadDatabase();
// Example 
// database.insert({name: 'Partha', status: 'Good Boy'})
// creating a global variable
let dataCome; 
app.post('/api', (req, res) => {
    console.log('Server got a request!');
    // console.log(req.body);
     dataCome = req.body;
    // alldata.push(dataCome);
    // res.json(alldata)
    // console.log(alldata)

    // i am here using Date.now() to track my data at date time
    const timeDate = Date.now();
    dataCome.timeDate = timeDate;
    database.insert(dataCome);//use this to avoid req.json obj--its much easy to use

    res.json(dataCome);
});

app.get('/getData', (req,res)=>{
    // res.json(dataCome);
   database.find({}, function (err, docs) {
       if(err){
           console.log('Error occurs')
           return;
       }
    res.json(docs);
   });
})

// ==================
    // const apiData = JSON.stringify(req.body);
    // ok so from that i just send the data to the server !! cool
    // store into a file.txt
    // fs.appendFile('file.txt', `${apiData},`, (err) => {
    //     console.log('Done Successfully!');
    // })
    // // read the file using readfile function
    // fs.readFile('file.txt','utf8', (err, data) => {
    //     console.log(data);
    // })
    // console.log(js);
    // res.json({
    //     ststus: 'success!',
    //     latitude: req.body.latis,
    //     llongitude: req.body.long
    // })

// app.get('/api',(request,response)=>{
//   database.find({},(err,data)=>{
//       if(err){
//           response.end();
//           return;
//       }
//       response.json(data);
//   })
// })


