const graphql = require('graphql');
const {GraphQLObjectType,
     GraphQLString, 
     GraphQLSchema,
    GraphQLID} = graphql; //ES6: dereferencing, get properties from graphql
const _ = require('lodash');

const books = [
    {name:'To kill a Mockingbird', genre:'Classic', id:'1'},
    {name:'Go Set a Watchman', genre:'Classic', id:'2'},
    {name:'The Hollow Hills', genre:'Legend', id:'3'},
    {name:'The Martian', genre:'Sci-Fi', id:'4'},
    {name:'The Crystal Cave', genre:'Legend', id:'5'}
]

const authors = [
    {name:'Harper Lee', country:'USA', id:'1'},
    {name:'Mary Stewart', country:'UK', id:'3'},
    {name:'Andy Weir', country:'USA', id:'4'}
   
]

/*
This schema will hold three important steps 
 1. type definition of different objects 
 2. relationship definition between these objects
 3. RootQuery definition : These will acts as a entry point to the schema 

*/
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields : ()=>({
        id : {type: GraphQLID},
        name : {type: GraphQLString},
        genre : {type: GraphQLString}
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields : ()=>({
        id : {type: GraphQLID},
        name : {type: GraphQLString},
        country : {type: GraphQLString}
    })
});

//define the rootQuery
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields : {
        /*define all the entries or queries that a client can perform. 
        client query would be 
        book(id=3){
            title
            genre
        }
        */
        book:{ // query to get the book detail based on bookId
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                // code to get data from the server , DB 
                return _.find(books,{id:args.id})
            }
        }, 
        author:{
            type: AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(authors,{id:args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})
