const express = require('express');
const router = require('./routes');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const port = 3000;
dotenv.config();

mongoose.connect(process.env.MONGO_URI="mongodb://localhost:27017/user_management"
).then( () => {
    console.log("connected to mongo db");
    
}).catch( () => {
    console.log("db conection failed");
    
})

app.use(express.json())
app.use("/v1", router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

