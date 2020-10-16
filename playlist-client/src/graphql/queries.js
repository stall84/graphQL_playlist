import { gql } from '@apollo/client';


// GET_BOOKS QUERY
const GET_BOOKS = gql`
   query GetBooks {
        books {
            name
            id
        }
    }
`;

// GET_AUTHORS QUERY
const GET_AUTHORS = gql`
    query GetAuthors {
        authors {
            name
            age
            id
        }
    }
`;
// QUERY BELOW WILL RETURN SINGLE BOOK WITH CASCADING INFO ON THE AUTHROS BOOKS
// GET SINGLE BOOK DETAILS
const GET_BOOK = gql`
    query GetBook($id: ID) {
        book(id: $id) {
            id
            name
            genre
            author{
                id
                name
                age
                books {
                    name
                    id
                }
            }
        }
    }
`;

export { GET_BOOKS, GET_AUTHORS, GET_BOOK };