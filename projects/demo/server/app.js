const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();
const port =9002;


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
