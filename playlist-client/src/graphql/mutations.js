import { gql } from '@apollo/client';

const ADD_BOOK = gql`
    mutation AddBook($name: String!, $genre: String!, $authorID: ID!) {
        addBook( name: $name, genre: $genre, authorID: $authorID ) {
        name
        genre
    }
    }`;






export { ADD_BOOK };