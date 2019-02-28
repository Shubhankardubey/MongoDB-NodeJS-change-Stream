const express = require('express')
const app = express();
const bodyParser = require('body-parser');

let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";
  

app.use(bodyParser.urlencoded({
    extended: true
 }));
 app.use(bodyParser.json());

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World witht Express'));

app.get('/testDB', (req, resp) => 
MongoClient.connect(url, {useNewUrlParser: true} , (err, db) => {
    if(err) {throw err;}
    let dbo = db.db('testDB');
    dbo.collection('regions').find().toArray(((err, res)=>{
        if(err) {throw err;}
        res.forEach((single)=>{ 
            let newObj = {}
            newObj.name = single.RegionID;
            newObj.description = single.RegionDescription;
            let db1 = db.db('testDB1');
            db1.collection('shubh').insert(newObj, ((err, res)=>{
                if(err) {throw err;}
                console.log('done')
            }))
        })
    }))
})
);
// Launch app to listen to specified port
app.listen(process.env.PORT || 8098, function () {
    console.log('Server connected to Database at Port 8098')
});

