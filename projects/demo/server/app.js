const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const port =9002;


// setup middleware for the graphql entry point
app.use('/graphql', graphqlHTTP({
    // contain the graphql schema 
}))
app.listen(port, ()=>{
    console.log("server is listening at port "+port);
})
