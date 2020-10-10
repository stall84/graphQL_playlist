const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema,
        GraphQLInt,
        GraphQLID, 
        GraphQLList,
        GraphQLNonNull 
        } = graphql;


// Mock Data

/*----------------------------- CUSTOM TYPES ------------------------------*/
// Define a new 'Book' graphQL type
const BookType = new GraphQLObjectType({                // Wrapping the fields properties 
    name: "Book",                                       // in a function to deal with multiple types in  
    fields: () => ({                                    // our schema and avoiding reference errors
       id: { type: GraphQLID },
       name: { type: GraphQLString },
       genre: { type: GraphQLString },
       author: { 
           type: AuthorType,
           resolve(parent, args) {
               return Author.findById(parent.authorID);          // Queries our Author table and matches by the authorID of the book being passed in
               
           }
        }                             
    })                                          
});

// Define a new 'Author' graphQL type
const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        id: { type: GraphQLID },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
               return Book.find({ authorID: parent.id});
            }
        }
    })
})
/*----------------------------- /CUSTOM TYPES ------------------------------*/


/*----------------------------- ROOT QUERIES ------------------------------*/

const RootQuery = new GraphQLObjectType({               // Maps out how a user interacts with the
    name: "RootQueryType",                              // 'Graph' when they initially interface with it
    fields: {
        books: {                // Set up a root-query for all books
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({})                    // Return all books from book table by passing an empty object to find method
            }
        },
        authors: {              // Root query for all authors
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find({});
            }
        },
        book: {                 // Root query for single book & relations
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {                     // resolve(r) function specifies how to get the data
                                                       // client is requesting. Returning that to the client
               return Book.findById(args.id);
            }
        },
        author: {               // Root query for single author with relations
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Author.findById(args.id);
            }
        }
    }
})

/*----------------------------- /ROOT QUERIES ------------------------------*/

/*----------------------------- MUTATIONS ----------------------------------*/

const Mutation = new GraphQLObjectType({
    name: 'Mutation',                                           // Create a new object type of mutation. set name
    fields: {
        addAuthor: {                                            // Name the 'method' you want to use describing the action/changes 
            type: AuthorType,                                   // Adding an Author we use our already defined Author Type
            args: {                                             // Args will be that data passed in by user/client
                name: { type: new GraphQLNonNull(GraphQLString) },              
                age: { type: new GraphQLNonNull(GraphQLInt) },
            },                                                  // Resolve function taking parent and args objects
            resolve(parent, args) {                             
                let author = new Author({                       // instantiate a new local author object from the 
                    name: args.name,                            // mongoose model class we defined in models/
                    age: args.age
                })
                return author.save();                           // after local object of class(model) Author created.
            }                                                   // Mongoose's database methods available. .save will save new 
        },                                                      // object instance to database. Add return statement to 
        addBook: {                                              // return saved data as a response after mutation sent/made      
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorID: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorID: args.authorID
                })
                return book.save();
            }
        }                                                 
    }                                                          
})

/*------------------------------ /MUTATIONS --------------------------------*/
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});