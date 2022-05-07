const express = require('express');

const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express()

const cors = require('cors');
const { query } = require('express');
require('dotenv').config()
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

//warehous

// JBBAYMahYFusTt6M



const uri = "mongodb+srv://DB_USER:DB_PASS@cluster0.3j664.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log('mongodb running')
  client.close();
});





app.get('/' , (req,res)=>{
    res.send('running warehous-server ');

})



app.listen(port ,()=>{
    console.log('listening to port' , port);
} )