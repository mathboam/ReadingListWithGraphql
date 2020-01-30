const express = require('express')
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

// allow cross origin request 
app.use(cors());

require('dotenv').config({
    path:'./variables.env'
})




// connecting to mlab database
const dbport = process.env.DATABASE;
// console.log(dbport);

mongoose.connect(dbport, {useUnifiedTopology: true,useNewUrlParser: true} ,()=>{
    console.log(`db connected`);
})


app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}));
































const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
})