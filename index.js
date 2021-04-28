const express = require('express')
const app = express()
const port = 5050
const cors = require('cors');
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9pkjs.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

client.connect(err => {
  const serviceCollection = client.db("MsnProject").collection("services");

  app.post('/addProduct', (req, res) =>{
      //console.log(req.body);
    serviceCollection.insertMany(req.body)
    .then(result => {
        res.send(result.insertedCount)
    })
  })

  app.get('/search/:location', (req, res) =>{
    const location = req.params.location;
    console.log(location);
    serviceCollection.find({location: location})
    .toArray((err, result) =>{
        res.send(result);
    })
  })
  app.get('/details/:idHotel', (req, res) =>{
    const idHotel = req.params.idHotel;
    console.log(idHotel);
    serviceCollection.find({idHotel: idHotel})
    .toArray((err, result) =>{
        res.send(result);
        console.log(result)
    })
  })


 app.get('/getPlaces', (req, res) =>{
    serviceCollection.find()
    .toArray((err, results) =>{
        res.send(results);
    })
 })


});


// app.post('/addProduct', (req, res) =>{
//     // const service = req.body;
//      console.log(req.body);
//    //   serviceCollection.insertMany(service)
//    //   .then(result =>{
//    //     res.send(result.insertedCount)
//    //   })
//  })



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)