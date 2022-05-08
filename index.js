const express = require('express');

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3j664.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {


    try {

        await client.connect();
        const productsCollection = client.db('warehous').collection('products');
        const addItemCollection = client.db('warehous').collection('myItem');


        //get api for all products
        app.get('/products', async (req, res) => {

            const query = {};
            const cursor = productsCollection.find(query);
            const products = await cursor.toArray();

            res.send(products);


        })

        //get api for single products by id
        app.get('/products/:id' , async(req,res)=>{
            const id = req.params.id;
            const query={_id: ObjectId(id)};
            const product = await productsCollection.findOne(query);
            res.send(product);
        })
        

        // put api 
        app.put('/products/:id', async(req, res) =>{
            const id = req.params.id;
            const updateUser = req.body;
           // console.log(updateUser)
           
            const filter = {_id: ObjectId(id)};
           const option = {upsert: true};
            const updateDoc ={
                $set:{
                    quantity: updateUser.quantity,
                }
            } 

            const result = await productsCollection.updateOne(filter,updateDoc, option);

            res.send(result);
        })

        // delete api
        app.delete('/products/:id' , async(req , res)=>{

            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await productsCollection.deleteOne(query)
            res.send(result);
        })
        
        // post api

        app.post('/addItem', async(req , res)=>{
            const myItem = req.body;
            console.log(myItem);
            const result = await addItemCollection.insertOne(myItem);
            res.send(result);
        }) 


    } finally {

    }
}


run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('running warehous-server ');

})



app.listen(port, () => {
    console.log('listening to port', port);
})