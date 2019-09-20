const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const app = express();
const port =9003;

mongoose.connect('mongodb://nitish2019:nitish123@ds163630.mlab.com:63630/nodesamples');
mongoose.connection.once('open', ()=>{
    console.log("database connetion is succeessful")
});

// setup middleware for the graphql entry point
app.use('/graphql', graphqlHTTP({
    // contain the graphql schema 
    //schema : schema
    schema, //ES6 convention
    graphiql:true // we want to use this dummy application to fire the query and get the response

}))
app.listen(port, ()=>{
    console.log("server is listening at port "+port);
})
