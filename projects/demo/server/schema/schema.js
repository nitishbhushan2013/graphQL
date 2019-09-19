const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql; //ES6: dereferencing, get properties from graphql


/*
This schema will hold three important steps 
 1. type definition of different objects 
 2. relationship definition between these objects
 3. RootQuery definition : These will acts as a entry point to the schema 

*/
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields : ()=>({
        id : {type: GraphQLString},
        name : {type: GraphQLString},
        genre : {type: GraphQLString}
    })
});

//define the rootQuery
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields : {
        /*define all the entries or queries that a client can perform. 
        client query would be 
        book{
            title
        }
        */
        book:{
            type:BookType,
            args:{id:{type:GraphQLString}},
            resolve(parent,args){
                // code to get data from the server
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})
