const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();

const port =9000;

app.listen(port, ()=>{
    console.log("server is listening at port "+port);
})
