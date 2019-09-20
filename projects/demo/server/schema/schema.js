const graphql = require('graphql');
const Books = require('../models/book');
const Authors = require('../models/author');


const {
    GraphQLObjectType,
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLList
} = graphql; //ES6: dereferencing, get properties from graphql
const _ = require('lodash');

/* commenting out dummy data : time to plug in Mongoose
const books = [
    {name:'To kill a Mockingbird', genre:'Classic', id:'1', authorId:'1'},
    {name:'Go Set a Watchman', genre:'Classic', id:'2', authorId:'1'},
    {name:'The Hollow Hills', genre:'Legend', id:'3', authorId:'2'},
    {name:'The Martian', genre:'Sci-Fi', id:'4', authorId:'3'},
    {name:'The Crystal Cave', genre:'Legend', id:'5', authorId:'3'},
    {name:'The Last Enchantment', genre:'Legend', id:'6', authorId:'2'},
]

const authors = [
    {name:'Harper Lee', country:'USA', id:'1'},
    {name:'Mary Stewart', country:'UK', id:'2'},
    {name:'Andy Weir', country:'USA', id:'3'}
   
]
*/

/*
This schema will hold three important steps 
 1. type definition of different objects 
 2. relationship definition between these objects
 3. RootQuery definition : These will acts as a entry point to the schema 

*/

/**
 * { query pattern : 
 *  book(id="2"){
 *      name
 *      genre
 *      author {
 *          name
 *      }
 *   }
 * }
 */
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields : ()=>({ // function declaration is necessary to perform Hoisting so that AuthorType should not give    referenceError. 
        id : {type: GraphQLID},
        name : {type: GraphQLString},
        genre : {type: GraphQLString},
        author : {
            type:AuthorType,
            resolve(parent, args){
                console.log(parent)
                //return _.find(authors,{id:parent.authorId})
                return Authors.findById(parent.authorId);
            }
        }
    })
});

/**
 * { query pattern : 
 *  author(id="2"){
 *      name
 *      country
 *      id
 *      books {
 *          name
 *      }
 *   }
 * }
 */
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields : ()=>({
        id : {type: GraphQLID},
        name : {type: GraphQLString},
        country : {type: GraphQLString},
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                //return _.filter(books,{authorId:parent.id})
                return Books.find({authorId:parent.id});
            }
        }
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
                //return _.find(books,{id:args.id})
                return Books.findById(args.id);
            }
        }, 
        author:{
            type: AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                //return _.find(authors,{id:args.id})
                return Authors.findById(args.id);
            }
        },
        books :{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                //return books;
                return Books.find({}); // empty criteria would returns all records
            }
        },
        authors :{
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
               // return authors;
               return Authors.find({});
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor:{
            type: AuthorType,
            args:{
                name:{type: GraphQLString},
                country:{type: GraphQLString}
            },
            resolve(parent, args){
                let authorObj = new Authors({
                    name:args.name,
                    country:args.country
                });
                return authorObj.save();

            }
        },
        addBook:{
            type: BookType,
            args:{
                name:{type: GraphQLString},
                genre:{type: GraphQLString},
                authorId:{type:GraphQLID}
            },
            resolve(parent, args){
                let bookObj = new Books({
                    name:args.name,
                    genre:args.genre,
                    authorId:args.authorId
                });
                return bookObj.save();

            }
        },
    }
})



module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
})
