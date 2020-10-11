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


export { GET_BOOKS, GET_AUTHORS };