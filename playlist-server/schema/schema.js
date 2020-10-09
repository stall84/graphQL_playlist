const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema,
        GraphQLInt,
        GraphQLID, 
        GraphQLList 
        } = graphql;


// Mock Data
var booksArr = [
    { name: 'Return of the Aliens', genre: 'Modern', id: '1', authorID: '3' },
    { name: 'Titans on Titan: Contaminating Saturn\'ns moon', genre: 'Science-Tech', id: '2', authorID: '2' },
    { name: 'Caligraphy for Others', genre: 'Art-Design', id: '3', authorID: '5' },
    { name: 'That\'s NOT a Hamster!', genre: 'Life-Hobbies', id: '4', authorID: '4' },
    { name: 'The Hero of Ages', genre: 'Fantasy', id: '5', authorID: '2' },
    { name: 'The Colour of Magic', genre: 'Fantasy', id: '6', authorID: '1' },
    { name: 'The Light Fantastic', genre: 'Sci-Fi', id: '7', authorID: '3'  }
]

var authorsArr = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' },
    { name: 'Richard Gere', age: 58, id: '4' },
    { name: 'Johnny Rotten', age: 63, id: '5' }
]

/*--------- CUSTOM TYPES -----------*/
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
               return _.find(authorsArr, { id: parent.authorID });
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
                return _.filter(booksArr, { authorID: parent.id });
            }
        }
    })
})
/*----------------------------------*/
const RootQuery = new GraphQLObjectType({               // Maps out how a user interacts with the
    name: "RootQueryType",                              // 'Graph' when they initially interface with it
    fields: {
        books: {                // Set up a root-query for all books
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return booksArr
            }
        },
        authors: {              // Root query for all authors
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authorsArr
            }
        },
        book: {                 // Root query for single book & relations
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {                     // resolve(r) function specifies how to get the data
                                                       // client is requesting. Returning that to the client
               return _.find( booksArr, { id: args.id } );
            }
        },
        author: {               // Root query for single author with relations
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find( authorsArr, { id: args.id } );
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});